const {
  db,
  syncAndSeed,
  models: { Artist, Venue, Performance },
} = require('./db/index');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/venues', async (req, res, next) => {
  try {
    res.sendStatus(201).send(
      await Venue.create({
        name: `${Math.random()}`,
        location: `${Math.random()}`,
      })
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/venues', async (req, res, next) => {
  try {
    const venues = await Venue.findAll();
    res.send(venues);
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/performances', async (req, res, next) => {
  try {
    const artists = await Artist.findAll({ include: [{ model: Performance }] });
    res.send(artists);
  } catch (error) {
    console.log(error);
  }
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

init();
