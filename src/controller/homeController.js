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

module.exports = {
  handleHelloWorld,
  handleAboutPage,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
};
