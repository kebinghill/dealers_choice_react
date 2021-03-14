const pg = require('pg');
const { DataTypes, Model, UUID, UUIDV4, Sequelize } = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_react_db'
);

class Artist extends Model {}
Artist.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: UUIDV4,
    },
    first_name: DataTypes.STRING(30),
    last_name: DataTypes.STRING(40),
    image_Url: DataTypes.STRING(20),
  },
  { sequelize: db, modelName: 'artist' }
);

class Venue extends Model {}
Venue.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: UUIDV4,
    },
    name: DataTypes.STRING(30),
    location: DataTypes.STRING(100),
  },
  { sequelize: db, modelName: 'venue' }
);

class Performance extends Model {}
Performance.init(
  {
    date: {
      type: DataTypes.STRING(30),
    },
  },
  { sequelize: db, modelName: 'performance' }
);

Performance.belongsTo(Artist);
Performance.belongsTo(Venue);
Artist.hasMany(Performance);
Venue.hasMany(Performance);

const syncAndSeed = async (req, res, next) => {
  try {
    await db.sync({ force: true });

    const [jimi, jim, janis, amy] = await Promise.all([
      Artist.create({
        first_name: 'Jimi',
        last_name: 'Hendrix',
        image_Url: 'jimi.png',
      }),
      Artist.create({
        first_name: 'Jim',
        last_name: 'Morrison',
        image_Url: 'jim.png',
      }),
      Artist.create({
        first_name: 'Janis',
        last_name: 'Joplin',
        image_Url: 'joplin.png',
      }),
      Artist.create({
        first_name: 'Amy',
        last_name: 'Winehouse',
        image_Url: 'amy.png',
      }),
    ]);

    const [capitol, hawley, turkey, marquee] = await Promise.all([
      Venue.create({
        name: 'The Capitol Theatre',
        location: 'Port Chester, New York',
      }),
      Venue.create({
        name: 'The Hawley Arms',
        location: 'Camden, London',
      }),
      Venue.create({
        name: 'The Turkey Joint West',
        location: 'Santa Monica, California',
      }),
      Venue.create({
        name: 'Marquee Club',
        location: 'City of Westminster, London',
      }),
    ]);

    const performances = await Promise.all([
      Performance.create({
        artistId: jimi.id,
        venueId: capitol.id,
        date: 'April 26th, 1967',
      }),
      Performance.create({
        artistId: jim.id,
        venueId: turkey.id,
        date: 'July 3rd, 1967',
      }),
      Performance.create({
        artistId: janis.id,
        venueId: marquee.id,
        date: 'June 24th, 1967',
      }),
      Performance.create({
        artistId: amy.id,
        venueId: hawley.id,
        date: 'October 16th, 2010',
      }),
    ]);
  } catch (error) {
    next();
  }
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    Artist,
    Venue,
    Performance,
  },
};
