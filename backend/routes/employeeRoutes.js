import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} from "../controllers/employeeController.js";
import { protect, protectAdmin } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createEmployeeSchema } from "../validators/employeeValidators.js";

const employeesRouter = Router();

employeesRouter.get("/", protect, protectAdmin, getEmployee);
employeesRouter.post(
  "/",
  protect,
  protectAdmin,
  validate(createEmployeeSchema),
  createEmployee,
);
employeesRouter.put("/:id", protect, protectAdmin, updateEmployee);
employeesRouter.delete("/:id", protect, protectAdmin, deleteEmployee);

export default employeesRouter;
