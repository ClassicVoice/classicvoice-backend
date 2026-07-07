const express = require("express");
const cors = require("cors");
const gTTS = require("gtts");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text is required"
      });
    }

    const filePath = path.join(__dirname, "speech.mp3");

    const speech = new gTTS(text, "en");

    speech.save(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Failed to generate speech"
        });
      }

      res.sendFile(filePath, () => {
        fs.unlink(filePath, () => {});
      });
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate speech"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
