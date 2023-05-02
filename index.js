const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");
const { auth } = require("./middleware/auth.middleware");
const { postRouter } = require("./routes/Posts.routes");
const cors=require("cors")

//  app.get("/", (req,res)=>{
//     res.status(200).send("Home Page")
//  })
const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)

 app.listen(8080, async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
        console.log("Cannot connect to the DB")
    }
    console.log("server is running 8080")
 })