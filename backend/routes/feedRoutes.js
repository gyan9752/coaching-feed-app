import { Router } from "express";

import { getFeeds, createFeed } from "../controller/feedController.js";

const router = Router();

router.get("/", getFeeds);

router.post("/", createFeed);

export default router;