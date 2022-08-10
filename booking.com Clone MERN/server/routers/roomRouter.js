import express from "express";
import { createRoom, deleteRoom, updateRoom ,getById ,getAll,updateRoomAvailability} from "../controllers/roomController.js";
import veriftyAdmin from "../middleware/adminAuth.js";

const router=express.Router()

router.post("/:hotelId",createRoom)

router.put("/:id",veriftyAdmin,updateRoom)
router.delete("/:id/:hotelId",veriftyAdmin,deleteRoom)
router.get("/find/:id",getById)
router.get("/",getAll)
router.put("/availability/:id",updateRoomAvailability)

export default router