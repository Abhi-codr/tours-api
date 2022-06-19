require("dotenv").config()
const express = require("express")
const app = express();
require("colors")
const morgan = require("morgan");
const connectDb = require("./config/db");
const PORT = process.env.PORT || 3000;
const tourRoutes = require("./routes/tourRoutes")
const userRoutes = require("./routes/userRoutes")
connectDb()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.use("/api/v1/tours", tourRoutes)
app.use("/api/v1/users", userRoutes)

app.use("*", (req, res) => {
    res.status(404).json({ status: "failure", message: "not found" })
})

app.listen(PORT, () => {
    console.log(`SERVER RUNNING AT PORT ${PORT} `.cyan.inverse.bold)
})