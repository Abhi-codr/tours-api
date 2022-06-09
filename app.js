const express = require("express")
const app = express();

const PORT = 3000;
const tourRoutes = require("./routes/tourRoutes")

app.use(express.json())

app.use("/api/v1/tours", tourRoutes)

app.listen(PORT, () => {
    console.log("SERVER RUNNING AT PORT " + PORT)
})