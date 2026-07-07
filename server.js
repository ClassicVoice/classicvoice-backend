const express = require("express");
const cors = require("cors");
const axios = require("axios");

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

    const response = await axios({
      method: "POST",
      url: "https://api.elevenlabs.io/v1/text-to-speech/Q1QcmfZPmFDVUWmzASdy",
      responseType: "arraybuffer",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
      },
      data: {
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.8,
          style: 0.7,
          use_speaker_boost: true
        }
      }
    });

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(response.data);

  } catch (error) {
    console.error(error.response?.data?.toString() || error.message);

    res.status(500).json({
      error: "Failed to generate speech"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
