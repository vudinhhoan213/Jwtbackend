import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const salt = bcrypt.genSaltSync(10);

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "jwt",
});
const hashUserPassWord = (password) => {
  let hashPassWord = bcrypt.hashSync(password, salt);
  return hashPassWord;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassWord(password);

  const [results, fields] = await connection.query(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, hashPass, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    },
  );
};

const getUserList = async () => {
  let users = [];
  try {
    const [results] = await connection.query("SELECT * FROM users");
    users = results;
    return users;
  } catch (err) {
    return users;
  }
};

module.exports = {
  createNewUser,
  getUserList,
};
