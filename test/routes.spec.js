//Install jest supertest with npm i -D jest supertest (Use -D to get it into devDependencies on package.json)
//Supertest will enable us to test http requests
//Add the "test" method at the scripts of package.json using: "test": "jest --verbose --detectOpenHandles"
//You can remove the "--detectOpenHandles" if you don't want to be announced when jest find a posible open handle on the testing code

//Requiere supertest
const request = require("supertest");
//Require the db and the models that we will test
const { db, Character, Genre, Media } = require("../db");
//Connect the server by require the index.js
const server = require("../index.js");

describe("Models testing", () => {
  //First we call the beforeAll method to clean the DB before testing adding a force sync
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  //I wont' comment every test because it has it's own description in it's string
  //I'll create a describe for every model and a new sub-describe for grouping methods in each model

  describe("Characters routes - /characters", () => {
    describe("Method POST", () => {});
    describe("Method GET", () => {});
    describe("Method PUT", () => {});
    describe("Method REMOVE", () => {});
  });

  describe("Medias routes - /medias", () => {
    describe("Method POST", () => {});
    describe("Method GET", () => {});
    describe("Method PUT", () => {});
    describe("Method REMOVE", () => {});
  });

  describe("Genres routes - /genres", () => {
    describe("Method POST", () => {});
    describe("Method GET", () => {});
    describe("Method PUT", () => {});
    describe("Method REMOVE", () => {});
  });

  //Close de DB and force sync to clear it
  afterAll(async () => {
    await db.sync({ force: true });
    db.close();
  });
});
