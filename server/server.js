const express = require("express");
const corsMiddleware = require("./middlewares/cors");
const newsRoutes = require("./routes/newsRoutes");
const { connectDB } = require("./config/db");
require("dotenv").config();

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use("/", newsRoutes);

connectDB();

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
