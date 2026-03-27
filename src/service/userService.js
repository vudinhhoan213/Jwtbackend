import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import db from "../models/index";

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
    await db.User.create({
      usename: username,
      email: email,
      password: hashPass,
    });
  } catch (err) {
    console.log("Bạn bị lỗi", err);
  }
};

const getUserList = async () => {
  let user = [];
  try {
    const [results] = await connection.query("SELECT * FROM user");
    user = results;
    return user;
  } catch (err) {
    return user;
  }
};

const deleteUser = async (id) => {
  try {
    const [results, fields] = await connection.execute(
      "DELETE FROM user WHERE id= ?",
      [id],
    );
  } catch (err) {
    console.log("Bạn bị lỗi", err);
  }
};

const getUserById = async (id) => {
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM user WHERE id=?",
      [id],
    );
    console.log(">>>check results: ", results);
    return results;
  } catch (err) {
    return err;
  }
};

const updateUserInfor = async (email, username, id) => {
  try {
    const [results, fields] = await connection.execute(
      "update user set email = ?, username = ? WHERE id=?",
      [email, username, id],
    );
    console.log(">>>check results: ", results);
    return results;
  } catch (err) {
    return err;
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
