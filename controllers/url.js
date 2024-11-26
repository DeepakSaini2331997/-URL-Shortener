const shortid = require("shortid");
const URL = require("../models/url")


async function handleShortUrl(req,res){
    //console.log(req.body," bbbbbbbbbbbbb")
    const url = req.body.longUrl
    if(url){
       const shortId = shortid.generate()
       await URL.create({
        shortId:shortId,
        redirectUrl:url,
        visitHistory:[]
       })
       //console.log(`localhost:8001/${shortId}`)
       res.render("index.ejs",{shortUrl:`${process.env.ENDPOINT}:${process.env.PORT}/api/${shortId}`})
    }else{
        return res.status(400).json({msg:"send the url"})
    }
}

async function redirectLongUrl(req,res){
    const shortId = req.params.shortId
    if(shortId){
        const longUrl = await URL.findOne({shortId:shortId})
        if(longUrl){
            res.redirect(longUrl.redirectUrl)
        }else{
            res.status(404).json({msg:`${shortId} Not Found`})
        }
    }else{
        res.status(404).json({msg:"Not Found"})
    }
}

module.exports = {
    handleShortUrl,redirectLongUrl
}