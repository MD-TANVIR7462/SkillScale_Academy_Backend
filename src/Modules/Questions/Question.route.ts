
import { Router } from "express";
import { questionController } from "./Question.controller";

const router = Router();

router.post("/create-question", questionController.createQuestion);
router.get("/get-question", questionController.getQuestion);
router.get("/get-question/:id", questionController.getSingleQuestion);
router.patch("/update-question/:id", questionController.updateQuestion);
router.delete("/delete-question/:id", questionController.deleteQuestion);


export const customerRouter = router;