import express from "express";
import { createHotel, updateHotel,deleteHotel,getById, getAll ,countByCity,countByType,getHotelRooms} from "../controllers/hotelController.js";
import veriftyAdmin from "../middleware/adminAuth.js";
const router=express.Router()

router.post("/",veriftyAdmin,createHotel)
router.put("/:id",veriftyAdmin,updateHotel)
router.delete("/:id",veriftyAdmin,deleteHotel)
router.get("/find/:id",getById)
router.get("/",getAll)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/getHotelRooms/:id",getHotelRooms)


export default router