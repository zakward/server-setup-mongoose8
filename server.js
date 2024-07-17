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

//routes
app.use("/auth", require("./routes/authRouter"))

app.use((err, req, res, next) => {
    console.log(err); // Log the error for debugging
    if (err.name === "UnauthorizedError") {
        res.status(err.status); // Set the response status to 401 Unauthorized
    }
    return res.send({ errMsg: err.message }); // Send a JSON response with the error message
});


app.listen(process.env.PORT, () => console.log(`Server Connected on port ${process.env.PORT}`))