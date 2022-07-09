//Install jest supertest with npm i -D jest supertest (Use -D to get it into devDependencies on package.json)
//Supertest will enable us to test http requests
//Add the "test" method at the scripts of package.json using: "test": "jest --verbose --detectOpenHandles"
//You can remove the "--detectOpenHandles" if you don't want to be announced when jest find a posible open handle on the testing code

//Requiere supertest
const request = require("supertest");
//Connect the server by require the index.js
const app = require("../server.js");
//Require the db and the models that we will test
const { db, Character, Genre, Media } = require("../db");

describe("Routes Testing - Method GET", () => {
  //First we call the beforeAll method to clean the DB before testing adding a force sync
  //Second we will create all the elements inside the table to use the method
  beforeAll(async () => {
    await db.sync({ force: true });
    //Create the objets for the test characters
    const characterOne = {
      image: "./img1.jpg",
      name: "Char1",
      age: 10,
      weight: 10,
      history: "C1 history",
    };
    const characterTwo = {
      image: "./img2.jpg",
      name: "Char2",
      age: 10,
      weight: 10,
      history: "C2 history",
    };
    const characterThree = {
      image: "./img3.jpg",
      name: "Char3",
      age: 12,
      weight: 12,
      history: "C3 history",
    };
    const characterFour = {
      image: "./img4.jpg",
      name: "Char4",
      age: 10,
      weight: 10,
      history: "C4 history",
    };
    //Create the characters on database
    const [charDB1, charDB2, charDB3, charDB4] = await Promise.all([
      Character.create(characterOne),
      Character.create(characterTwo),
      Character.create(characterThree),
      Character.create(characterFour),
    ]);

    //Create media objets
    const mediaOne = {
      image: "./img1.jpeg",
      title: "Media1",
      creation_date: "1999-01-01",
      rate: 5,
      mediaType: "Movie",
    };
    const mediaTwo = {
      image: "./img2.jpeg",
      title: "Media2",
      creation_date: "1999-01-01",
      rate: 3,
      mediaType: "Serie",
    };
    const mediaThree = {
      image: "./img3.jpeg",
      title: "Media3",
      creation_date: "1999-01-01",
      rate: 3,
      mediaType: "Movie",
    };
    const mediaFour = {
      image: "./img4.jpeg",
      title: "Media4",
      creation_date: "1999-01-01",
      rate: 4,
      mediaType: "Serie",
    };
    //Create the media on database
    const [mediaDB1, mediaDB2, mediaDB3, mediaDB4] = await Promise.all([
      Media.create(mediaOne),
      Media.create(mediaTwo),
      Media.create(mediaThree),
      Media.create(mediaFour),
    ]);
    //Connect characters and media
    console.log(charDB1);

    //Create genre objects
    const genreOne = { image: "./img1.jpeg", name: "Genre1" };
    const genreTwo = { image: "./img2.jpeg", name: "Genre2" };

    //Create connections in da
    await Promise.all([
      charDB1.setMedia(mediaDB1, mediaDB2),
      charDB2.setMedia(mediaDB2, mediaDB3),
      charDB3.setMedia(mediaDB3, mediaDB4),
      charDB4.setMedia(mediaDB1, mediaDB4),
      mediaDB1.createGenre(genreOne),
      mediaDB2.createGenre(genreTwo),
      mediaDB3.setGenre(genreOne),
      mediaDB4.setGenre(genreTwo),
    ]);
  });

  //I wont' comment every test because it has it's own description in it's string
  //I'll create a describe for every model and a new sub-describe for grouping methods in each model
  xdescribe("Characters routes - /characters", () => {
    let characterOne;

    it("should return images and names at /characters", async () => {
      const res = await request(app).get("/characters");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        { image: "./img1.jpg", name: "Char1" },
        { image: "./img2.jpg", name: "Char2" },
        { image: "./img3.jpg", name: "Char3" },
        { image: "./img4.jpg", name: "Char4" },
      ]);
    });

    it("should return a character detail is send by query at /characters?name=name", async () => {
      const res = await request(app).get("/characters?name=Char1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([expect.objectContaining(characterOne)]);
    });

    it("should filter characters by age if send by query at /characters?age=age", async () => {
      const res = await request(app).get("/characters?age=10");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        { image: "./img1.jpg", name: "Char1" },
        { image: "./img2.jpg", name: "Char2" },
        { image: "./img4.jpg", name: "Char4" },
      ]);
    });

    it("should filter characters by media if send by query at /characters?media=media", async () => {
      const res = await request(app).get("/characters?media=Media1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        { image: "./img1.jpg", name: "Char1" },
        { image: "./img4.jpg", name: "Char4" },
      ]);
    });
  });

  xdescribe("Medias routes - /media", () => {
    it("should return just image, title and creation date values", async () => {
      const res = await request(app).get("/media");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        {
          image: "./img1.jpeg",
          title: "Media1",
          creation_date: "1999-01-01",
        },
        {
          image: "./img2.jpeg",
          title: "Media2",
          creation_date: "1999-01-01",
        },
        {
          image: "./img3.jpeg",
          title: "Media3",
          creation_date: "1999-01-01",
        },
        {
          image: "./img4.jpeg",
          title: "Media4",
          creation_date: "1999-01-01",
        },
      ]);
    });

    it("should return a media filtered if send by query at /media?name=name", async () => {
      const res = await request(app).get("/media?name=Media1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([expect.objectContaining(mediaOne)]);
    });

    it("should return a media filtered if send by query at /media?genre=idGenre", async () => {
      const res = await request(app).get("/media?genre=1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        {
          image: "./img1.jpeg",
          title: "Media1",
          creation_date: "1999-01-01",
        },
        {
          image: "./img3.jpeg",
          title: "Media3",
          creation_date: "1999-01-01",
        },
      ]);
    });

    it("should return a media ordered by name if send by query at /media?order= DESC | ASC", async () => {
      const res = await request(app).get("/media?order=DESC");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        {
          image: "./img4.jpeg",
          title: "Media4",
          creation_date: "1999-01-01",
        },
        {
          image: "./img3.jpeg",
          title: "Media3",
          creation_date: "1999-01-01",
        },
        {
          image: "./img2.jpeg",
          title: "Media2",
          creation_date: "1999-01-01",
        },
        {
          image: "./img1.jpeg",
          title: "Media1",
          creation_date: "1999-01-01",
        },
      ]);
    });
  });

  //Close de DB and force sync to clear it
  afterAll(async () => {
    await db.sync({ force: true });
    db.close();
  });
});
