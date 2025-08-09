import { Router } from "express";
import { questionRouter } from "../Modules/Questions/Question.route";

const router = Router();
router.use("/question", questionRouter);

export default router;
