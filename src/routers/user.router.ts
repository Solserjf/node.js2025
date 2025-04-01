import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middleware/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", commonMiddleware.isValidate("id"), userController.getById);
router.post(
    "/",
    commonMiddleware.validateBody(UserValidator.create),
    userController.create,
);
router.put(
    "/:id",
    commonMiddleware.isValidate("id"),
    commonMiddleware.validateBody(UserValidator.update),
    userController.updateById,
);
router.delete(
    "/:id",
    commonMiddleware.isValidate("id"),
    userController.deleteById,
);

export const UserRouter = router;
