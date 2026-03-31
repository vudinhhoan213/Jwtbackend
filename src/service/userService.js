import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import db from "../models/index";
import { Model, where } from "sequelize";
import { raw } from "body-parser";

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
      username: username,
      email: email,
      password: hashPass,
    });
  } catch (err) {
    console.log("Bạn bị lỗi", err);
  }
};

const getUserList = async () => {
  // test relationship
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "username", "email"],
    include: { model: db.Group, attributes: ["name", "description"] },
    raw: true,
    nest: true,
  });
  //test role
  // let roles = await db.Group.findOne({
  //   where: { id: 1 },
  //   include: { model: db.Role },
  //   raw: true,
  //   nest: true,
  // });
  let roles = await db.Role.findAll({
    attributes: ["url", "description"],
    include: {
      model: db.Group,
      where: { id: 1 },
      attributes: ["name", "description"],
    },
    raw: true,
    nest: true,
  });

  console.log(">>> check newUser", newUser);
  console.log(">>> check newRole", roles);

  let users = [];
  users = await db.User.findAll();
  return users;

  // try {
  //   const [results] = await connection.query("SELECT * FROM user");
  //   user = results;
  //   return user;
  // } catch (err) {
  //   return user;
  // }
};

const deleteUser = async (userId) => {
  await db.User.destroy({
    where: { id: userId },
  });
  // try {
  //   const [results, fields] = await connection.execute(
  //     "DELETE FROM user WHERE id= ?",
  //     [id],
  //   );
  // } catch (err) {
  //   console.log("Bạn bị lỗi", err);
  // }
};

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });

  return (user = user.get({ plain: true }));
  // try {
  //   const [results, fields] = await connection.query(
  //     "SELECT * FROM user WHERE id=?",
  //     [id],
  //   );
  //   console.log(">>>check results: ", results);
  //   return results;
  // } catch (err) {
  //   return err;
  // }
};

const updateUserInfor = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: id,
      },
    },
  );
  // try {
  //   const [results, fields] = await connection.execute(
  //     "update user set email = ?, username = ? WHERE id=?",
  //     [email, username, id],
  //   );
  //   console.log(">>>check results: ", results);
  //   return results;
  // } catch (err) {
  //   return err;
  // }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
