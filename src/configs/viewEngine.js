import express from "express";

/**
 * Cấu hình view engine cho ứng dụng Express.
 * @param {*} app - Ứng dụng Express cần cấu hình view engine.
 */
const configViewEngine = (app) => {
  app.use(express.static("./src/public")); // Cấu hình thư mục chứa các file tĩnh (CSS, JS, hình ảnh)
  app.set("view engine", "ejs"); // Cấu hình view engine là EJS
  app.set("views", "./src/views"); // Cấu hình thư mục chứa các file view (EJS)
};

export default configViewEngine;
