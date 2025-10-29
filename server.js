import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const cfg = {
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_KEY: process.env.SUPABASE_KEY || "",
  PAGARME_API_KEY: process.env.PAGARME_API_KEY || "",
  PAGARME_ENCRYPTION_KEY: process.env.PAGARME_ENCRYPTION_KEY || ""
};

app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/config', (req, res) => res.json(cfg));

// Endpoints de exemplo (mock) só para ver funcionando
const donations = [];
app.get('/v1/donations', (req, res) => res.json(donations));
app.post('/v1/donations', (req, res) => {
  const d = { id: String(Date.now()), status: 'pending', ...req.body };
  donations.push(d);
  res.status(201).json(d);
});

app.listen(PORT, () => {
  console.log(`DoaFácil API running on port ${PORT}`);
});
