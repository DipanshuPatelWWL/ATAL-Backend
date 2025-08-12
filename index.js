const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/categoryRoutes');
const faq = require('./routes/faqRoutes')
const app = express();
require("dotenv").config();
const database = require("./config/config")

// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
//versel url frontend
const allowedOrigins = ['https://atal-homepage.vercel.app', 'https://atal-dashboard-fontend.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // only if you're using cookies or sessions,
};
app.use(cors(corsOptions));
//database connect
database.connect();

app.use(express.json());
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});
app.use(express.urlencoded({ extended: true }))
app.use('/category/', router);
app.use('/api', faq);

app.listen(4000, () => {
  console.log("server start on Port : 4000");
})