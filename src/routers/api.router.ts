import { Router } from "express";

import { UserRouter } from "./user.router";

const router = Router();

router.use("/users", UserRouter);

export const ApiRouter = router;
