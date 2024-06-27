import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import User from "./models/User.js";
import Transaction from "./models/Transactions.js";

dotenv.config(); 

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Endpoint to check server status
app.get("/", (req, res) => {
  res.send("Express App Running!");
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let check = await User.findOne({ email: email });
    if (check) {
      return res.status(400).json({ success: false, error: "User already exists." });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    let transaction = {};
    for (let i = 0; i < 50; i++) {
      transaction[i] = {
        "Date": "",
        "Ops": "",
        "Currency": "",
        "Amount": "",
      };
    }

    const user = new User({
      name: username,
      email: email,
      password: passwordHash,
      transactionData: transaction,
    });

    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const passCompare = await bcrypt.compare(password, user.password);
      if (passCompare) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
      } else {
        res.json({ success: false, error: "Incorrect Credentials." });
      }
    } else {
      res.json({ success: false, error: "Incorrect E-mail." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const fetchUser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Please log in." });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please log in." });
  }
};

app.post('/transactions', fetchUser, async (req, res) => {
    try {
      const transaction = new Transaction({
        ...req.body,
        user: req.user.id,
      });
      await transaction.save();
      res.status(201).send(transaction);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Get all transactions for the logged-in user
  app.get('/transactions', fetchUser, async (req, res) => {
    try {
      const transactions = await Transaction.find({ user: req.user.id });
      res.send(transactions);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

// Server Start
app.listen(PORT, (err) => {
    if (!err) {
        console.log("Server Running on port " + PORT);
    } else {
        console.log("Error: " + err);
    }
});
