const express = require("express")
const {connectMongoose} = require("./connect")
const router = require("./routes/url")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")

dotenv.config();
const app = express();
const port =process.env.PORT||8002
const url = process.env.MONGOOSEURL

connectMongoose(url).then(()=>{
    console.log('Database Connect Successfully')
}).catch((error)=>{
    console.log('Not Connect',error)
})

app.use(bodyParser.urlencoded({ extended:false}))
app.use("/api",router)

// app.get('/',(req,res)=>{
//     res.render('index.ejs')
// })

app.listen(port,()=>{
    console.log('Connect Successfuly on localhost:',port)
})