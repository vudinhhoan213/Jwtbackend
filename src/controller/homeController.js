import mysql from "mysql2/promise";

// Create the connection to database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleAboutPage = (req, res) => {
  return res.send("I'm Hoan");
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  const [results, fields] = await connection.query(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, password, username],
  );
  function(err, results, fields)

  return res.send("handleCreateNewUser success");
};

module.exports = {
  handleHelloWorld,
  handleAboutPage,
  handleUserPage,
  handleCreateNewUser,
};
