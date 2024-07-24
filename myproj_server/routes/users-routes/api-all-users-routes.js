const express = require("express");
const apiUsersRoutes = require("./api-users-routes");
const apiAuthRoutes = require("./api-users-auth-routes");
const imagesUsersRoutes = require("./images-users-routes");
const PostUsersRoutes = require("./api-users-post-routes");

const combinedUsersRouter = express.Router();
combinedUsersRouter.use(PostUsersRoutes);
combinedUsersRouter.use(apiUsersRoutes);
combinedUsersRouter.use(apiAuthRoutes);
combinedUsersRouter.use(imagesUsersRoutes);

module.exports = combinedUsersRouter