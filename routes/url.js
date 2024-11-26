const express = require("express")
const {handleShortUrl,redirectLongUrl} = require("../controllers/url")
const router = express.Router()

router.post('/',handleShortUrl)
router.get("/:shortId",redirectLongUrl)
router.get("/",(req,res)=>{
    res.render("index.ejs",{shortUrl:null})
})

module.exports = router