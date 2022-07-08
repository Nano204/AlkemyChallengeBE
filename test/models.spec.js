//Install jest with npm i jest
//Add the "test" method at the scripts of package.json using: "test": "jest --verbose --detectOpenHandles"
//You can remove the "--detectOpenHandles" if you don't want to be announced when jest find a posible open handle on the testing code

//Require the db and the models that we will test
const { db, Character, Genre, Media } = require("../db");

describe("Models testing", () => {
  //First we call the beforeAll method to clean the DB before testing adding a force sync
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  //I wont' comment every test because it has it's own description in it's string
  describe("Characters model", () => {
    it("should create the Character if everything is send correctly", async () => {
      expect.assertions(5);
      const characterOne = await Character.create({
        image: "./img/Mickey_Mouse.jpeg",
        name: "Mickey Mouse",
        age: 93,
        weight: 13,
        history:
          "This is the main character of Disney, he is the biggest inspiration of Walt.",
      });
      expect(characterOne.toJSON()).toHaveProperty(
        "image",
        "./img/Mickey_Mouse.jpeg"
      );
      expect(characterOne.toJSON()).toHaveProperty("name", "Mickey Mouse");
      expect(characterOne.toJSON()).toHaveProperty("age", 93);
      expect(characterOne.toJSON()).toHaveProperty("weight", 13);
      expect(characterOne.toJSON()).toHaveProperty(
        "history",
        "This is the main character of Disney, he is the biggest inspiration of Walt."
      );
    });

    it("should not create the Character if name is not send", async () => {
      expect.assertions(1);
      try {
        await Character.create({
          image: "./img/Mickey_Mouse.jpeg",
          age: 93,
          weight: 13,
          history:
            "This is the main character of Disney, he is the biggest inspiration of Walt.",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it("should not create the Character if image is not unique", async () => {
      expect.assertions(1);
      try {
        await Character.create({
          image: "Mickey_Mouse.jpeg",
          name: "Mickey Mouse",
          age: 93,
          weight: 13,
          history:
            "This is the main character of Disney, he is the biggest inspiration of Walt.",
        });
        await Character.create({
          image: "Mickey_Mouse.jpeg",
          name: "Donald Duck",
          age: 86,
          weight: 16,
          history:
            "Donald is characterized as a pompous, showboating duck wearing a sailor suit, cap and a bow tie.",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it("should not create the Character if name is not unique", async () => {
      expect.assertions(1);
      try {
        await Character.create({
          image: "Mickey_Mouse.jpeg",
          name: "Mickey Mouse",
          age: 93,
          weight: 13,
          history:
            "This is the main character of Disney, he is the biggest inspiration of Walt.",
        });
        await Character.create({
          image: "Donald_Duck.jpeg",
          name: "Mickey Mouse",
          age: 86,
          weight: 16,
          history:
            "Donald is characterized as a pompous, showboating duck wearing a sailor suit, cap and a bow tie.",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it("should not create the Character if history is not unique", async () => {
      expect.assertions(1);
      try {
        await Character.create({
          image: "Mickey_Mouse.jpeg",
          name: "Mickey Mouse",
          age: 93,
          weight: 13,
          history:
            "This is the main character of Disney, he is the biggest inspiration of Walt.",
        });
        await Character.create({
          image: "Donald_Duck.jpeg",
          name: "Donald Duck",
          age: 86,
          weight: 16,
          history:
            "This is the main character of Disney, he is the biggest inspiration of Walt.",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });

  describe("Medias model", () => {
    it("should create the Media if everything is send correctly", async () => {
      expect.assertions(5);
      const mediaOne = await Media.create({
        image: "./img/Mickey_Mouse_TheOrigins.jpeg",
        title: "Mickey Mouse: The Origins",
        creation_date: "2019-03-21",
        rate: 5,
        mediaType: "Movie",
      });
      expect(mediaOne.toJSON()).toHaveProperty(
        "image",
        "./img/Mickey_Mouse_TheOrigins.jpeg"
      );
      expect(mediaOne.toJSON()).toHaveProperty(
        "title",
        "Mickey Mouse: The Origins"
      );
      //To validate the date we must convert the date object to string and remove the hours indicators using .toISOString().split("T")[0]
      expect(mediaOne.toJSON()).toHaveProperty("creation_date", "2019-03-21");
      expect(mediaOne.toJSON()).toHaveProperty("rate", 5);
      expect(mediaOne.toJSON()).toHaveProperty("mediaType", "Movie");
    });

    it("should not create the Media if title is not send", async () => {
      expect.assertions(1);
      try {
        await Media.create({
          image: "./img/Mickey_Mouse_TheOrigins.jpeg",
          creation_date: "2019-03-21",
          rate: 5,
          mediaType: "Movie",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it("should not create the Media if mediaType is not send", async () => {
      expect.assertions(1);
      try {
        await Media.create({
          image: "./img/Mickey_Mouse_TheOrigins.jpeg",
          title: "Mickey Mouse: The Origins",
          creation_date: "2019-03-21",
          rate: 5,
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it("should not create the Media if image is not unique", async () => {
      expect.assertions(1);
      try {
        await Media.create({
          image: "./img/AChristmasStory.jpeg",
          title: "Mickey Mouse: The Origins",
          creation_date: "2019-03-21",
          rate: 5,
          mediaType: "Movie",
        });
        await Media.create({
          image: "./img/AChristmasStory.jpeg",
          title: "A Christmas Story",
          creation_date: "2010-12-01",
          rate: 4,
          mediaType: "Movie",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it("should not create the Media if title is not unique", async () => {
      expect.assertions(1);
      try {
        await Media.create({
          image: "./img/Mickey_Mouse_TheOrigins.jpeg",
          title: "Mickey Mouse: The Origins",
          creation_date: "2019-03-21",
          rate: 5,
          mediaType: "Movie",
        });
        await Media.create({
          image: "./img/AChristmasStory.jpeg",
          title: "A Christmas Story",
          creation_date: "2010-12-01",
          rate: 4,
          mediaType: "Movie",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it("should not create the Media if rate is not in range (1-5)", async () => {
      expect.assertions(2);
      try {
        await Media.create({
          image: "./img/AChristmasStory.jpeg",
          title: "A Christmas Story",
          creation_date: "2010-12-01",
          rate: 6,
          mediaType: "Movie",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
      try {
        await Media.create({
          image: "./img/AChristmasStory.jpeg",
          title: "A Christmas Story",
          creation_date: "2010-12-01",
          rate: 0,
          mediaType: "Movie",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it("should not create the Media if mediaType is different to Serie or Movie", async () => {
      expect.assertions(1);
      try {
        await Media.create({
          image: "./img/AChristmasStory.jpeg",
          title: "A Christmas Story",
          creation_date: "2010-12-01",
          rate: 6,
          mediaType: "Short film",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });

  describe("Genres model", () => {
    it("should create the Genre if everything is send correctly", async () => {
      expect.assertions(2);
      const genreOne = await Genre.create({
        image: "./img/Comedy.jpeg",
        name: "Comedy",
      });
      expect(genreOne.toJSON()).toHaveProperty("image", "./img/Comedy.jpeg");
      expect(genreOne.toJSON()).toHaveProperty("name", "Comedy");
    });

    it("should not create the Genre if name is not send", async () => {
      expect.assertions(1);
      try {
        await Genre.create({
          image: "./img/Comedy.jpeg",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it("should not create the Genre if image is not unique", async () => {
      expect.assertions(1);
      try {
        await Genre.create({
          image: "./img/Comedy.jpeg",
          name: "Comedy",
        });
        await Genre.create({
          image: "./img/Comedy.jpeg",
          name: "Action",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it("should not create the Genre if name is not unique", async () => {
      expect.assertions(1);
      try {
        await Genre.create({
          image: "./img/Comedy.jpeg",
          name: "Comedy",
        });
        await Genre.create({
          image: "./img/Action.jpeg",
          name: "Comedy",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });

  //Close de DB and force sync to clear it
  afterAll(async () => {
    await db.sync({ force: true });
    db.close();
  });
});
