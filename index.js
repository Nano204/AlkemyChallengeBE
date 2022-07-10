//Requiere the server as the app
const app = require("./server");
//Require db
const { db } = require("./db");
//Define port for localhosting
const PORT = 3000;

//Connect sever
//For testing before creating database use the next line
// server.listen(PORT);
//Use the next lines when the db is already created
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  db.sync({ force: true });
});

//I tried to join index and server but it throws an error because asycronic force sync in the DB. Server must be requiere as unmounted for the tests.
