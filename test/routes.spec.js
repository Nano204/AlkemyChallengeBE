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
    describe("Method POST", () => {
      it("should return an error if at least one of the mandatory parameters is not send", async () => {
        const res = await request(server).post("/character");
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe(
          "Character information does not fit the basic requeriments"
        );
      });

      it("should return error if the character creation fails because of a data type", async () => {
        const res = await request(server).post("/character").send({
          image: "./img/Mickey_Mouse.jpeg",
          name: "Mickey Mouse",
          age: "NOVENTA",
          weight: 13,
          history:
            "This is the main character of Disney, he is the biggest inspiration of Walt.",
        });
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe("One element does not meet requiered type");
      });

      it("should return character object if the character was succesfully created", async () => {
        const res = await request(server).post("/character").send({
          image: "./img/Mickey_Mouse.jpeg",
          name: "Mickey Mouse",
          age: 93,
          weight: 13,
          history:
            "This is the main character of Disney, he is the biggest inspiration of Walt.",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
          image: "./img/Mickey_Mouse.jpeg",
          name: "Mickey Mouse",
          age: 93,
          weight: 13,
          history:
            "This is the main character of Disney, he is the biggest inspiration of Walt.",
        });
      });
    });
    describe("Method GET", () => {});
    describe("Method PUT", () => {});
    describe("Method REMOVE", () => {});
  });

  describe("Medias routes - /medias", () => {
    describe("Method POST", () => {
      it("should return an error if at least one of the mandatory parameters is not send", async () => {
        const res = await request(server).post("/medias");
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe(
          "Media information does not fit the basic requeriments"
        );
      });

      it("should return error if the media creation fails because of a data type", async () => {
        const res = await request(server).post("/medias").send({
          image: "./img/Mickey_Mouse_TheOrigins.jpeg",
          title: "Mickey Mouse: The Origins",
          creation_date: "2019-03-21",
          rate: 8,
          mediaType: "Movie",
        });
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe("One element does not meet requiered type");
      });

      it("should return character object if the media was succesfully created", async () => {
        const res = await request(server).post("/medias").send({
          image: "./img/Mickey_Mouse_TheOrigins.jpeg",
          title: "Mickey Mouse: The Origins",
          creation_date: "2019-03-21",
          rate: 5,
          mediaType: "Movie",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
          image: "./img/Mickey_Mouse_TheOrigins.jpeg",
          title: "Mickey Mouse: The Origins",
          creation_date: "2019-03-21",
          rate: 5,
          mediaType: "Movie",
        });
      });
    });
    describe("Method GET", () => {});
    describe("Method PUT", () => {});
    describe("Method REMOVE", () => {});
  });

  describe("Genres routes - /genres", () => {
    describe("Method POST", () => {
      it("should return an error if at least one of the mandatory parameters is not send", async () => {
        const res = await request(server).post("/genres");
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe(
          "Genre information does not fit the basic requeriments"
        );
      });

      it("should return error if the genre creation fails because of a data type", async () => {
        const res = await request(server).post("/genres").send({
          image: "./img/Comedy.jpeg",
          name: "Comedy",
        });
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe("One element does not meet requiered type");
      });

      it("should return genre object if the character was succesfully created", async () => {
        const res = await request(server).post("/genres").send({
          image: "./img/Comedy.jpeg",
          name: "Comedy",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
          image: "./img/Comedy.jpeg",
          name: "Comedy",
        });
      });
    });
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
