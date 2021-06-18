const express = require("express")
const env = require('dotenv');
const mongoose = require("mongoose");

const app = express();




//routes
env.config();
const userRouter = require("./routes/index")
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.anekc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.connection.once("open", () => {
    console.log("database connected")
})
app.use(express.json());
// mongodb+srv://root:<password>@cluster0.anekc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


app.get('/', (req,res) => {
    res.send("<h1>hello</h1>")
})

app.use('/api', userRouter)
app.listen(process.env.PORT, () =>{
    console.log(`server is running on port: ${process.env.PORT}`)
})