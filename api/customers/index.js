const { ObjectId } = require('mongodb');
const { connectDB } = require('../../server/db');

module.exports = async function handler(req, res) {
  const db = await connectDB();
  const customers = db.collection('customers');

  try {
    if (req.method === 'GET') {
      const searchQuery = (req.query && req.query.search) || (req.url && new URL(req.url, 'http://localhost').searchParams.get('search')) || '';
      const filter = {};
      if (searchQuery) {
        filter.$or = [
          { first_name: { $regex: searchQuery, $options: 'i' } },
          { last_name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } }
        ];
      }
      const docs = await customers.find(filter).toArray();
      return res.status(200).json(docs);
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const lastCust = await customers.findOne({}, { sort: { cust_id: -1 } });
      body.cust_id = lastCust ? lastCust.cust_id + 1 : 1;
      const result = await customers.insertOne(body);
      return res.status(201).json({ insertedId: result.insertedId });
    }

    res.setHeader('Allow', 'GET,POST');
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
