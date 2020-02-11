import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controlles/UserController";
import SessionController from "./app/controlles/SessionControlle";
import fileController from "./app/controlles/fileController";
import ProvidersController from "./app/controlles/ProvidersController";
import AppointmentController from "./app/controlles/AppointmentController";
import ScheduleController from "./app/controlles/ScheduleController";
import NotificationController from "./app/controlles/NotificationController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.put("/users", UserController.update);

routes.post("/appointments", AppointmentController.store);
routes.get("/appointments", AppointmentController.index);
routes.delete("/appointments/:id", AppointmentController.delete);

routes.post("/files", upload.single("file"), fileController.store);

routes.get("/providers", ProvidersController.index);

routes.get("/schedules", ScheduleController.index);

routes.get("/notifications", NotificationController.index);
routes.put("/notifications/:id", NotificationController.update);

export default routes;
