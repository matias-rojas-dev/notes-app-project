const express = require("express")
const {readdirSync} = require("fs")
const cors = require("cors")
const connectDB = require("./database/db")
require("dotenv").config()

const app = express()

// connect db
connectDB();

//middlewares
app.use(express.json({limit: "10mb"}))
app.use(cors())

//routes
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)))

// port
const port = process.env.PORT || 8003

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})