const { ObjectId } = require('mongodb');
const { connectDB } = require('../../server/db');

function normalizeGenres(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input.map(g => String(g).trim()).filter(Boolean);
  return String(input).split(',').map(g => g.trim()).filter(Boolean);
}

module.exports = async function handler(req, res) {
  const db = await connectDB();
  const movies = db.collection('movies');
  const { id } = req.query || {};

  try {
    if (!id) return res.status(400).json({ error: 'Missing id' });

    if (req.method === 'PUT') {
      const body = req.body || {};
      delete body._id;
      if (body.movie_id) body.movie_id = parseInt(body.movie_id, 10);
      if (body.year) body.year = parseInt(body.year, 10);
      if (body.list_price) body.list_price = parseFloat(body.list_price);
      body.genres = normalizeGenres(body.genres);

      const result = await movies.updateOne({ _id: new ObjectId(id) }, { $set: body });
      return res.status(200).json(result);
    }

    if (req.method === 'DELETE') {
      const result = await movies.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json(result);
    }

    if (req.method === 'GET') {
      const doc = await movies.findOne({ _id: new ObjectId(id) });
      return res.status(200).json(doc);
    }

    res.setHeader('Allow', 'GET,PUT,DELETE');
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
