const { ObjectId } = require('mongodb');
const { connectDB } = require('../../server/db');

module.exports = async function handler(req, res) {
  const db = await connectDB();
  const customers = db.collection('customers');
  const { id } = req.query || {};

  try {
    if (!id) return res.status(400).json({ error: 'Missing id' });

    if (req.method === 'PUT') {
      const body = req.body || {};
      delete body._id;
      if (body.cust_id) body.cust_id = parseInt(body.cust_id, 10);
      const result = await customers.updateOne({ _id: new ObjectId(id) }, { $set: body });
      return res.status(200).json(result);
    }

    if (req.method === 'DELETE') {
      const result = await customers.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json(result);
    }

    if (req.method === 'GET') {
      const doc = await customers.findOne({ _id: new ObjectId(id) });
      return res.status(200).json(doc);
    }

    res.setHeader('Allow', 'GET,PUT,DELETE');
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
