import express from "express";

/**
 * Cấu hình view engine cho ứng dụng Express.
 * @param {*} app - Ứng dụng Express cần cấu hình view engine.
 */
const configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

export default configViewEngine;
