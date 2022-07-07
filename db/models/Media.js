//Require DataTypes for JS models
const { DataTypes } = require("sequelize");

//Build models based on db tables you need
//Use sequelize as parameter so the model will use as argument the db you want to connect to sequalize
module.exports = (sequelize) => {
  //Set the name of the model
  sequelize.define("Character", {
    //Start to build the objects of the model
    image: {
      type: DataTypes.STRING,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATEONLY,
    },
    rate: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    mediaType: {
      type: DataTypes.ENUM("Serie", "Movie"),
      defaultValue: "Movie",
      allowNull: false,
    },
  });
};
