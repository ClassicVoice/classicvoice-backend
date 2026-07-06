const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/tts", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch("https://api.fish.audio/v1/tts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.FISH_AUDIO_API_KEY}`,
        "Content-Type": "application/json",
        "model": "s2-pro"
      },
      body: JSON.stringify({
        text: text,
        reference_id: "b77aa35e77a244249672c68266c8d019",
        temperature: 0.7,
        top_p: 0.7,
        prosody: {
          speed: 1,
          volume: 0,
          normalize_loudness: true
        },
        chunk_length: 300,
        normalize: true,
        format: "mp3",
        sample_rate: 44100,
        mp3_bitrate: 128,
        latency: "normal",
        max_new_tokens: 1024,
        repetition_penalty: 1.2,
        min_chunk_length: 50,
        condition_on_previous_chunks: true,
        early_stop_threshold: 1
      })
    });

    const audio = await response.arrayBuffer();

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(Buffer.from(audio));

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to generate speech"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
