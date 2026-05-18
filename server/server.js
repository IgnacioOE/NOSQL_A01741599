// const express = require('express');
// const path = require('path');
// const { connectDB } = require('./db');
// const registerMovieRoutes = require('./handlers/movies');
// const registerCustomerRoutes = require('./handlers/customers');

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, '../client')));

// async function main() {
//   try {
//     const db = await connectDB();
//     console.log('? Conectado a MongoDB');

//     registerMovieRoutes(app, db);
//     registerCustomerRoutes(app, db);

//     app.listen(port, () => {
//       console.log(`? Servidor web corriendo en http://localhost:${port}`);
//     });
//   } catch (e) {
//     console.error('? Error al conectar:', e);
//   }
// }

// main();
