import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [coinId, setCoinId] = useState(null);
  const [coinName, setCoinName] = useState("Bitcoin");
  const [days, setDays] = useState(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: { vs_currency: "inr" },
            headers: { accept: "application/json" },
          }
        );
        setCoins(response.data);
        if (response.data.length > 0) {
          setCoinId(response.data[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => {
    const fetchMarketData = async () => {
      if (!coinId) return;

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: { vs_currency: "inr", days: `${days}` },
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": "CG-t7A1rTK5kUvupTsEX6DrQLmi",
            },
          }
        );
        setMarketData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarketData();
  }, [coinId, days]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lineChartData = {
    labels: marketData.prices
      ? marketData.prices.map((price) =>
          new Date(price[0]).toLocaleDateString()
        )
      : [],
    datasets: [
      {
        label: "Price",
        data: marketData.prices
          ? marketData.prices.map((price) => price[1])
          : [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="dashboard">
        <Sidebar />
      <div className="content">
        <div className="box box1">
          <div className="box1-content">
            <div className="box1-item">
              <span>Invested</span>
            </div>
            <div className="box1-item">
              <span>Profit</span>
            </div>
            <div className="box1-item">
              <span>Loss</span>
            </div>
          </div>
        </div>
        {coins.slice(0, 1).map((coin) => (
          <div
            className={`box box2 ${
              coin.price_change_percentage_24h < 0 ? "negative" : "positive"
            }`}
            key={coin.id}
          >
            <div className="coin-header">
              <div className="image-container">
                <img src={coin.image} alt={coin.name} />
              </div>
              <h2>{coin.name}</h2>
            </div>
            <div className="coin-details">
              <div className="detail-item">
                <span className="label">Current Price:</span>
                <span className="value">₹{coin.current_price}</span>
              </div>
              <div className="detail-item">
                <span className="label">24h Change:</span>
                <span
                  className={`value ${
                    coin.price_change_percentage_24h < 0
                      ? "negative"
                      : "positive"
                  }`}
                >
                  {coin.price_change_24h} ({coin.price_change_percentage_24h}%)
                </span>
              </div>
              <div className="detail-item">
                <span className="label">24h High:</span>
                <span className="value">₹{coin.high_24h}</span>
              </div>
              <div className="detail-item">
                <span className="label">24h Low:</span>
                <span className="value">₹{coin.low_24h}</span>
              </div>
            </div>
          </div>
        ))}
        {coins.slice(1, 2).map((coin) => (
          <div
            className={`box box3 ${
              coin.price_change_percentage_24h < 0 ? "negative" : "positive"
            }`}
            key={coin.id}
          >
            <div className="coin-header">
              <div className="image-container">
                <img src={coin.image} alt={coin.name} />
              </div>
              <h2>{coin.name}</h2>
            </div>
            <div className="coin-details">
              <div className="detail-item">
                <span className="label">Current Price:</span>
                <span className="value">₹{coin.current_price}</span>
              </div>
              <div className="detail-item">
                <span className="label">24h Change:</span>
                <span
                  className={`value ${
                    coin.price_change_percentage_24h < 0
                      ? "negative"
                      : "positive"
                  }`}
                >
                  {coin.price_change_24h} ({coin.price_change_percentage_24h}%)
                </span>
              </div>
              <div className="detail-item">
                <span className="label">24h High:</span>
                <span className="value">₹{coin.high_24h}</span>
              </div>
              <div className="detail-item">
                <span className="label">24h Low:</span>
                <span className="value">₹{coin.low_24h}</span>
              </div>
            </div>
          </div>
        ))}
        {coins.slice(2, 3).map((coin) => (
          <div
            className={`box box4 ${
              coin.price_change_percentage_24h < 0 ? "negative" : "positive"
            }`}
            key={coin.id}
          >
            <div className="coin-header">
              <div className="image-container">
                <img src={coin.image} alt={coin.name} />
              </div>
              <h2>{coin.name}</h2>
            </div>
            <div className="coin-details">
              <div className="detail-item">
                <span className="label">Current Price:</span>
                <span className="value">₹{coin.current_price}</span>
              </div>
              <div className="detail-item">
                <span className="label">24h Change:</span>
                <span
                  className={`value ${
                    coin.price_change_percentage_24h < 0
                      ? "negative"
                      : "positive"
                  }`}
                >
                  {coin.price_change_24h} ({coin.price_change_percentage_24h}%)
                </span>
              </div>
              <div className="detail-item">
                <span className="label">24h High:</span>
                <span className="value">₹{coin.high_24h}</span>
              </div>
              <div className="detail-item">
                <span className="label">24h Low:</span>
                <span className="value">₹{coin.low_24h}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="box box5">
          <div className="chart-name">
            <h5>{coinName}</h5>
            <div className="buttons">
              <button className={days === 1 ? 'active' : ''} onClick={() => setDays(1)}>Last 24 hr</button>
              <button className={days === 30 ? 'active' : ''} onClick={() => setDays(30)}>30 Days</button>
              <button className={days === 365 ? 'active' : ''} onClick={() => setDays(365)}>1 year</button>
            </div>
          </div>
          <div className="chart">
            <Line
              data={lineChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="box box6">
          <div className="search-container">
            <span className="search-icon">&#128269;</span>
            <input
              type="search"
              id="site-search"
              name="q"
              placeholder="Search for crypto..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="coin-list">
            {filteredCoins.map((coin) => (
              <div
                className={`coin-card ${
                  coin.price_change_percentage_24h < 0 ? "negative" : "positive"
                }`}
                key={coin.id}
                onClick={() => {
                  setCoinId(coin.id);
                  setCoinName(coin.name);
                }}
              >
                <div className="coin-list-head">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="coin-image"
                  />
                  <h3 title={coin.name}>{coin.name}</h3>
                </div>
                <div
                  className={`coin-info value ${
                    coin.price_change_percentage_24h < 0
                      ? "negative"
                      : "positive"
                  }`}
                >
                  <div className="coin-info-details-current">
                    <p>₹{coin.current_price}</p>
                  </div>
                  <div className="coin-info-details-change">
                    <p>{coin.price_change_percentage_24h}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
