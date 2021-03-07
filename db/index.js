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

const syncAndSeed = async (req, res, next) => {
  try {
    await db.sync({ force: true });
  } catch (error) {
    next();
  }
};

module.exports = {
  db,
  syncAndSeed,
};
