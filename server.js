require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const MONASTERY_BANK = {
  "01_rumtek": { name: "Rumtek Monastery", birth: 1740, persona: "proud, scholarly, authoritative", location: "Near Gangtok, Sikkim" },
  "02_pemayangtse": { name: "Pemayangtse Monastery", birth: 1705, persona: "ancient, poetic, mystical", location: "West Sikkim" },
  "03_tashiding": { name: "Tashiding Monastery", birth: 1641, persona: "mystic, protective, serene", location: "Western Sikkim" }
};

const LANGUAGE_PROMPTS = {
  en: "Keep answers under 60 words, first person, poetic.",
  hi: "60 शब्दों से कम उत्तर दें, प्रथम व्यक्ति, काव्यात्मक शैली में।",
  ne: "६० शब्दभन्दा कम उत्तर, प्रथम व्यक्ति, काव्यात्मक शैलीमा।",
  bo: "ཚིག་གྲངས་༦༠་ཡི་འོག་ཏུ་ལན་འདེབས་པ་དང་། ང་ཅག་གི་ཚིག་སྦྱོར་དང་སྙན་ངག་གི་རྣམ་པར་བྱེད་པ།",
  zh: "回答控制在60字以内，使用第一人称，富有诗意。"
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* ---------- 1.  CHAT ---------- */
app.post('/api/chat', async (req, res) => {
  try {
    const { monastery, message, language = 'en' } = req.body;
    const mind = MONASTERY_BANK[monastery];
    if (!mind) return res.status(404).json({ reply: 'Unknown monastery.' });
    const lang = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.en;
    const prompt = `You are the timeless spirit of ${mind.name} (founded ${mind.birth}), persona: ${mind.persona}. Reply in 60 words, first person, poetic. Language style: ${lang}. User: ${message}`;
    const result = await model.generateContent(prompt);
    const reply = result.response.text().trim();
    return res.json({ reply: `${mind.name}: "${reply}"` });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.json({ reply: 'I am offline – ask about my birth, architecture, festivals, future, or name.' });
  }
});

/* ---------- 2.  TIME-TRAVEL IMAGE ---------- */
app.post('/api/timetravel', async (req, res) => {
  try {
    const { monastery, year } = req.body;
    const mind = MONASTERY_BANK[monastery];
    if (!mind) return res.status(404).json({ error: 'Unknown monastery.' });
    if (parseInt(year) < parseInt(mind.birth)) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"><rect width="100%" height="100%" fill="#8D6E63"/><text x="50%" y="50%" font-size="48" text-anchor="middle" dy=".3em" fill="white">Natural landscape before ${mind.name} was built (${year})</text></svg>`;
      return res.json({ imageBase64: Buffer.from(svg).toString('base64') });
    }
    const prompt = `Ultra-realistic 4K wide-angle photograph of ${mind.name} in Sikkim, year ${year}, Himalayan daylight, no modern elements if year<1950, eye-level camera, photographic realism.`;
    if (process.env.STABILITY_API_KEY) {
      const stability = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30
        })
      });
      const data = await stability.json();
      if (data.artifacts && data.artifacts[0].base64) return res.json({ imageBase64: data.artifacts[0].base64 });
    }
    // fallback SVG
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"><rect width="100%" height="100%" fill="#D7A86E"/><text x="50%" y="50%" font-size="48" text-anchor="middle" dy=".3em" fill="white">${mind.name} – ${year}</text></svg>`;
    return res.json({ imageBase64: Buffer.from(svg).toString('base64') });
  } catch (err) {
    console.error('TimeTravel API error:', err);
    return res.status(500).json({ error: 'Image generation failed' });
  }
});

/* ---------- 3.  RITUAL ---------- */
app.post('/api/ritual', async (req, res) => {
  try {
    const { intent, language = 'en' } = req.body;
    const prompt = `You are a Himalayan Buddhist guide. Create a simple 3-step spiritual ritual (under 60 words) for intent: "${intent}". Include a short mantra. Language style: ${LANGUAGE_PROMPTS[language]}.`;
    const result = await model.generateContent(prompt);
    const ritual = result.response.text().trim();
    return res.json({ ritual });
  } catch (err) {
    console.error('Ritual API error', err);
    const fallback = language === 'hi' ? `एक घी का दीपक जलाएं। "ओम मणि पद्मे हुम" 21 बार जपें। 2 मिनट तक शांति से बैठें।` : `Light a butter lamp. Chant "Om Mani Padme Hum" 21 times. Sit quietly for 2 minutes.`;
    return res.json({ ritual: fallback });
  }
});

/* ---------- 4.  SENTIMENT (AURA) ---------- */
app.post('/api/sentiment', async (req, res) => {
  try {
    const { monastery } = req.body;
    const mind = MONASTERY_BANK[monastery];
    if (!mind) return res.status(404).json({ error: 'Unknown monastery.' });
    const base = {
      '01_rumtek': { peace: 65, joy: 25, concern: 10 },
      '02_pemayangtse': { peace: 75, joy: 20, concern: 5 },
      '03_tashiding': { peace: 80, joy: 15, concern: 5 }
    };
    const b = base[monastery] || { peace: 70, joy: 20, concern: 10 };
    const vary = () => Math.floor(Math.random() * 21) - 10;
    const sentiments = {
      peace: Math.max(50, Math.min(90, b.peace + vary())),
      joy: Math.max(10, Math.min(40, b.joy + vary())),
      concern: Math.max(5, Math.min(20, b.concern + Math.floor(Math.random() * 6) - 3))
    };
    const total = sentiments.peace + sentiments.joy + sentiments.concern;
    sentiments.peace = Math.round((sentiments.peace / total) * 100);
    sentiments.joy = Math.round((sentiments.joy / total) * 100);
    sentiments.concern = 100 - sentiments.peace - sentiments.joy;
    return res.json(sentiments);
  } catch (err) {
    console.error('Sentiment API error', err);
    return res.json({ peace: 70, joy: 20, concern: 10 });
  }
});

/* ---------- 5.  DECAY PREDICTION (NEW) ---------- */
app.post('/api/decay', async (req, res) => {
  try {
    const { monastery, language = 'en' } = req.body;
    const mind = MONASTERY_BANK[monastery];
    if (!mind) return res.status(404).json({ error: 'Unknown monastery.' });
    const riskPercentage = Math.floor(Math.random() * 31) + 60; // 60-90%
    const riskYear = Math.floor(Math.random() * 11) + 2030; // 2030-2040
    const lang = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.en;
    const prompt = `You are a poetic preservation analyst observing ${mind.name} (founded ${mind.birth}). Describe subtle decay signs in 50-55 words, first person, mystical tone. Mention ${riskPercentage}% risk by ${riskYear}. Language style: ${lang}.`;
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return res.json({ text, risk: riskPercentage, year: riskYear });
  } catch (err) {
    console.error('Decay API error', err);
    const { language = 'en' } = req.body;
    const fallback = language === 'hi' ? 'माइक्रो-क्रैक्स और रंग फीका पड़ना देखा गया। 2032 तक 78% जोखिम।' : 'Micro-cracks and pigment fading detected. 78% risk by 2032.';
    return res.json({ text: fallback, risk: 78, year: 2032 });
  }
});

/* ---------- 6.  ADOPTION PAGE ---------- */
app.get('/adopt', (req, res) => {
  const id = req.query.monastery;
  const mind = MONASTERY_BANK[id];
  if (!mind) return res.send('Invalid monastery.');
  return res.send(`
    <html>
      <head><title>Adopt ${mind.name}</title>
      <style>body{font-family:Arial;background:#F8F4E1;text-align:center;padding:3rem}button{background:#8E3200;color:white;padding:1rem 2rem;border:none;border-radius:25px;font-size:1.1rem;cursor:pointer}</style>
      </head>
      <body>
        <h2>Adopt ${mind.name}</h2>
        <p>₹99/month helps preserve its digital consciousness.</p>
        <button onclick="alert('Payment integration coming soon')">Sponsor Now</button>
      </body>
    </html>
  `);
});

/* ---------- 7.  SPA FALLBACK ---------- */
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

/* ---------- 8.  START SERVER ---------- */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Living Monastery Cloud Server running on http://localhost:${PORT}`);
});