import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

/**
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  // path, handler
  router.get("/", homeController.handleHelloWorld);
  router.get("/about", homeController.handleAboutPage);
  router.get("/user", homeController.handerUserPage);

  return app.use("/", router);
};

export default initWebRoutes;
