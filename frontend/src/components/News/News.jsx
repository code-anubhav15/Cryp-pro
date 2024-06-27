import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css';
import Sidebar from '../Sidebar/Sidebar';
import news_image from '../../assets/crypto_image.webp';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const url = `https://newsdata.io/api/1/news?apikey=pub_455650f65a7eac2f2af0407c908d0004343c3&q=Cryptocurrency&category=business`;
    
    axios.get(url)
      .then(response => {
        setArticles(response.data.results);
      })
      .catch(error => {
        console.error("There was an error fetching the articles!", error);
      });
  }, []);

  return (
    <div className="news-section">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="news-content-container">
        <h2 className='news-heading'>Latest <span className="heading-design">Updates</span></h2>
        <div className="news-content">
          {articles.map((news, index) => (
            <div className="news-card" key={index}>
              <img src={news.image_url || news_image} alt={news.title} />
              <h3>{news.title}</h3>
              <p>{news.description ? news.description.substring(0, 400) : ''}{news.description && news.description.length > 200 ? '...' : ''}  <span><a href={news.link}>Read More</a></span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
