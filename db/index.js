//May install sequelize, pg y pg-hstore with npm i
//Require Sequelize and Op (Operators from Sequelize)
const { Sequelize, Op } = require("sequelize");
//Require models
const modelCharacter = require("./models/Character.js");
const modelMedia = require("./models/Media.js");
const modelGenre = require("./models/Genre.js");

//Using postgres
//A local db must be created with postgress. To install postgres on Linux use #sudo apt-get install postgresql
//To access postgres un #sudo -i -u postgres
//To access to sql pront use #psql
//From pront:   //To create a new databae use #CREATE DATABASE database_name;
// // // // // //To create a new user use #CREATE USER user_name WITH ENCRYPTED PASSWORD 'password';
// // // // // //To grant privilegies to the user use #GRANT ALL PRIVILEGES ON DATABASE database_name TO user_name;
// // // // // //To list users use #\du
// // // // // //To list databases use #\l
// // // // // //To list tables use #\t
const db = new Sequelize(
  "postgres://nano:dbpass@localhost:5432/alkemychallenge",
  {
    logging: false,
  }
);

//The models are funtions ORM that connect bd with sequilize
//Connect the models with the db
modelCharacter(db);
modelGenre(db);
modelMedia(db);

//Create realtions between models (to create relation between tables)
//db.models brings the property models from the sequilize object that was assign to the variable db before
const { Character, Media, Genre } = db.models;

Genre.hasMany(Media);
Media.belongsTo(Genre);
Character.belongsToMany(Media, { through: "Character_Media" });
Media.belongsToMany(Character, { through: "Character_Media" });

//Export the models, the database (db) and the operators (Op)
module.exports = {
  ...db.models,
  db,
  Op,
};
