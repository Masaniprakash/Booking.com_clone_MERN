import express from "express";
import {  updateUser,deleteUser,getById, getAll } from "../controllers/userController.js";
import veriftyAdmin from "../middleware/adminAuth.js";
// import verifyToken from "../middleware/verifyToken.js";
import veriftyUser from "../middleware/userAuth.js";
const router=express.Router()


// router.get("/checkauth",verifyToken,(req,res)=>{
//     res.send(req.user)
// })

// router.get("/veriftyuser/:id",veriftyUser,(req,res)=>{
//     res.send(req.user)
// })
// router.get("/veriftyadmin/:id",veriftyAdmin,(req,res)=>{
//     res.send("your admin")
// })


router.put("/:id",veriftyUser,updateUser)
router.delete("/:id",veriftyUser,deleteUser)
router.get("/find/:id",veriftyUser,getById)
router.get("/",veriftyAdmin,getAll)

export default router