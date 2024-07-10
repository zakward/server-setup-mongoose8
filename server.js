const mongoose = require("mongoose")
const express = require("express")
const morgan = require("morgan")
require("dotenv").config()

const app = express()

//middleware
app.use(express.json())
app.use(morgan("dev"))


const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
}

connectToDB()



app.listen(process.env.PORT, () => console.log(`Server Connected on port ${process.env.PORT}`))