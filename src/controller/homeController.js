import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleAboutPage = (req, res) => {
  return res.send("I'm Hoan");
};

const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList();

  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  userService.createNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserById(id);
  console.log(">>> check user: ", user);
  let userData = {};
  if (user && user.length > 0) {
    userData = user[0];
  }

  return res.render("user-update.ejs", { userData });
};

const handUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;

  await userService.updateUserInfor(email, username, id);
  console.log("check update", req.body);

  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleAboutPage,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handUpdateUser,
};
