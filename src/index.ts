import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`⚡️Server⚡️: App listening on port ${PORT}`);
});
