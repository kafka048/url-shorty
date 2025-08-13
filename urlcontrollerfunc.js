const URL = require("../MODELS/modelurl");
const nanoId = require("nano-id");


async function handleAndShortUrl(req, res) {
    const body = req.body;
    try {
        if (!body.url) return res.status(400).json({
            error: "url is required"
        });
        const shortId = nanoId(8);
        await URL.create({
            shortID: shortId,
            redirectUrl: body.url,
            visitHistory: []
        }) // Persists data in MongoDB

        return res.status(201).json({
            id: shortId
        })
    } catch (err) {
        console.error("error occurred", err);
        return res.status(500).json({
            error: "internal server error"
        })
    }
}

async function handleAndRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    try {
        const doc = await URL.findOne({ shortID: shortId });
        if (!doc) return res.status(404).json({ error: "no short id exists" });


        doc.visitHistory.push({            
            timestamp: Number(Date.now()),
            ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
            userAgent: req.headers["user-agent"]
        });

        await doc.save();
        res.status(200).redirect(doc.redirectUrl);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "internal server error" });
    }

    
}

async function handleAndDisplayAnalytics(req, res) {
    const shortId = req.params.shortId;
    try {
        const doc = await URL.findOne({ shortID : shortId });
        return res.json({
            clicks : doc.visitHistory.length,
            history: doc.visitHistory
        })


    } catch (err) {
        console.log("error :", err);
        res.status(500).json({ error: "internal server error " });
    }


}



module.exports = {
    handleAndShortUrl,
    handleAndRedirectUrl,
    handleAndDisplayAnalytics
}
