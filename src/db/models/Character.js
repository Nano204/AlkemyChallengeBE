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
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    weight: { type: DataTypes.INTEGER },
    history: { type: DataTypes.TEXT, unique: true },
  });
};
