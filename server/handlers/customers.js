const { ObjectId } = require('mongodb');

function registerCustomerRoutes(app, db) {
  const customersCollection = db.collection('customers');

  app.get('/api/customers', async (req, res) => {
    const searchQuery = req.query.search || '';
    let filter = {};

    if (searchQuery) {
      filter = {
        $or: [
          { first_name: { $regex: searchQuery, $options: 'i' } },
          { last_name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } }
        ]
      };
    }

    const customers = await customersCollection.find(filter).toArray();
    res.json(customers);
  });

  app.post('/api/customers', async (req, res) => {
    const customer = req.body;
    const lastCust = await customersCollection.findOne({}, { sort: { cust_id: -1 } });
    customer.cust_id = lastCust ? lastCust.cust_id + 1 : 1;

    const result = await customersCollection.insertOne(customer);
    res.json(result);
  });

  app.put('/api/customers/:id', async (req, res) => {
    const id = req.params.id;
    const updated = req.body;
    delete updated._id;

    if (updated.cust_id) updated.cust_id = parseInt(updated.cust_id, 10);

    const result = await customersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updated }
    );
    res.json(result);
  });

  app.delete('/api/customers/:id', async (req, res) => {
    const id = req.params.id;
    const result = await customersCollection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  });
}

module.exports = registerCustomerRoutes;
