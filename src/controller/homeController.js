const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleAboutPage = (req, res) => {
  return res.send("I'm Hoan");
};

const handerUserPage = (req, res) => {
  return res.render("user.ejs");
};

module.exports = {
  handleHelloWorld,
  handleAboutPage,
  handerUserPage,
};
