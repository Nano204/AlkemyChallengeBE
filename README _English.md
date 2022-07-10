# General Information

## Porpose

This project was created with two main intentions:

### 1. Participate in Alkemy's challenge

One of the purposes of this project is to participate in a challenge in order to be part of the Alkemy's acceleration processes for Jr. programmers and in the same way to measure my acquired knowledge in NodeJS Backend, as well as to acquire new knowledge helped by the requeriments of the project that expect some technology or functionality uses that I do not know before starting the project.

### 2. Create a guided code for other programmers who are interested in learning about Backend with NodeJs

The second purpose of this project is to build a generic code about how to set up a local server and connect it to a Postgress DB, so the code is fully commented to facilitate reading and indicate what each of the code blocks does.<br />
**All comments are written in English.**

## Reading order

 I present below what was the order of creation of each of the files to serve as a guide for reading the code and thus allow a threaded thought process that facilitates its understanding:

**1.** index.js + server.js <br />
**2.** src/db/index.js <br />
**3.** src/test/. (Use toggle at "isAutheticated" function in the "authentication" middleware)<br />
**4.** src/db/models/. <br />
**5.** src/middlewares (CRUD) - Documentation here: [Postman](https://documenter.getpostman.com/view/21829383/UzJPMapD)<br />
**6.** src/mw/authetication <br />

**Note:** My tests stopped working when I included the authentication because I still don't know how to include sending cookies from the jest to test the posts method and enable permanence of the logged user. To make the tests work I create a toggle at the isAuthenticated function.

# Alkemy Challenge Backend - NodeJS

## Objetive

Develop an API to explore the world of Disney, which will allow knowing and modifying the characters that make it up and understanding in which movies they participated. On the other hand, you will need to expose the information so that any frontend can consume it.

👉 It is not necessary to build the Frontend. <br />
👉 Routes must follow the REST pattern. <br />
👉 Use NodeJs and Express. <br />
👉 Use Sequelize library.

`¡It is not necessary to do everything!`

The more you complete, the higher your score, but you can submit the app to the stage you have it based on your current knowledge. Remember that the objective of the challenge is to understand your current level of knowledge.

## Technical requirements

1.  Database Modeling ✔️

2.  User Authentication ✔️

3.  List of Characters ✔️

4.  Character Creation, Editing, and Deletion (CRUD) ✔️

5.  Character Detail ✔️

6.  Character Search ✔️

7.  List of Movies ✔️

8.  Detail of Movie/Series with its characters ✔️

9.  Movie/Series Creation, Editing and Deleting✔️

10. Search for Movies or Series ✔️

11. Email sendings ✔️

12. **Extra:** Testing ⚠️

For more information you can visit `https://www.alkemy.org/`
