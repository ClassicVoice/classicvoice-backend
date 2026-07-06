const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Classic Voice AI Backend Running");
});

app.post("/generate", (req, res) => {

    const text = req.body.text;

    if (!text) {
        return res.json({
            error: "No text provided"
        });
    }

    res.json({
        message: "Ready for Fish Audio connection",
        text: text
    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});