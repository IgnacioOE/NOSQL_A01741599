const { ObjectId } = require('mongodb');
const { connectDB } = require('../../server/db');

function normalizeGenres(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input.map(g => String(g).trim()).filter(Boolean);
  return String(input).split(',').map(g => g.trim()).filter(Boolean);
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
}

module.exports = async function handler(req, res) {
  const db = await connectDB();
  const movies = db.collection('movies');

  try {
    if (req.method === 'GET') {
      const searchQuery = (req.query && req.query.search) || (req.url && new URL(req.url, 'http://localhost').searchParams.get('search')) || '';
      const genreQuery = (req.query && req.query.genre) || (req.url && new URL(req.url, 'http://localhost').searchParams.get('genre')) || '';
      const filter = {};

      if (searchQuery) filter.title = { $regex: searchQuery, $options: 'i' };
      if (genreQuery) {
        const regex = new RegExp(`^${escapeRegex(genreQuery)}$`, 'i');
        filter.genres = { $elemMatch: { $regex: regex } };
      }

      const docs = await movies.find(filter).toArray();
      return res.status(200).json(docs);
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const lastMovie = await movies.findOne({}, { sort: { movie_id: -1 } });
      body.movie_id = lastMovie ? lastMovie.movie_id + 1 : 100;
      if (body.year) body.year = parseInt(body.year, 10);
      if (body.list_price) body.list_price = parseFloat(body.list_price);
      body.genres = normalizeGenres(body.genres);

      const result = await movies.insertOne(body);
      return res.status(201).json({ insertedId: result.insertedId });
    }

    res.setHeader('Allow', 'GET,POST');
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
