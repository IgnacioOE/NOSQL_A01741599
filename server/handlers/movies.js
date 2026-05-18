const { ObjectId } = require('mongodb');

function normalizeGenres(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input.map(g => String(g).trim()).filter(Boolean);
  return String(input).split(',').map(g => g.trim()).filter(Boolean);
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
}

function registerMovieRoutes(app, db) {
  const moviesCollection = db.collection('movies');

  app.get('/api/movies', async (req, res) => {
    const searchQuery = req.query.search || '';
    const genreQuery = req.query.genre || '';
    const filter = {};

    if (searchQuery) {
      filter.title = { $regex: searchQuery, $options: 'i' };
    }

    if (genreQuery) {
      const regex = new RegExp(`^${escapeRegex(genreQuery)}$`, 'i');
      filter.genres = { $elemMatch: { $regex: regex } };
    }

    const movies = await moviesCollection.find(filter).toArray();
    res.json(movies);
  });

  app.post('/api/movies', async (req, res) => {
    const movie = req.body;
    const lastMovie = await moviesCollection.findOne({}, { sort: { movie_id: -1 } });
    movie.movie_id = lastMovie ? lastMovie.movie_id + 1 : 100;
    movie.year = parseInt(movie.year, 10);
    movie.list_price = parseFloat(movie.list_price);
    movie.genres = normalizeGenres(movie.genres);

    const result = await moviesCollection.insertOne(movie);
    res.json(result);
  });

  app.put('/api/movies/:id', async (req, res) => {
    const id = req.params.id;
    const updatedMovie = req.body;
    delete updatedMovie._id;

    if (updatedMovie.movie_id) updatedMovie.movie_id = parseInt(updatedMovie.movie_id, 10);
    if (updatedMovie.year) updatedMovie.year = parseInt(updatedMovie.year, 10);
    if (updatedMovie.list_price) updatedMovie.list_price = parseFloat(updatedMovie.list_price);
    updatedMovie.genres = normalizeGenres(updatedMovie.genres);

    const result = await moviesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedMovie }
    );
    res.json(result);
  });

  app.delete('/api/movies/:id', async (req, res) => {
    const id = req.params.id;
    const result = await moviesCollection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  });
}

module.exports = registerMovieRoutes;
