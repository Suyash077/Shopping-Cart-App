const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes/payments.routes");
const authRoute = require("./routes/authRoute");
const connectDB = require("./config/database");

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Database connection
connectDB.connect();

// Middleware
const corsOptions = {
    origin: "https://ecommzy.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);
app.use("/api/v1", authRoute);

app.get("/", (req, res) => {
    res.send('<h1>Welcome to ecomzy</h1>');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port number ${PORT}`);
});
