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

  try {
    const [results, fields] = await connection.execute(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
      [email, hashPass, username],
    );
  } catch (err) {
    console.log("Bạn bị lỗi", err);
  }
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

const deleteUser = async (id) => {
  try {
    const [results, fields] = await connection.execute(
      "DELETE FROM users WHERE id= ?",
      [id],
    );
  } catch (err) {
    console.log("Bạn bị lỗi", err);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
};
