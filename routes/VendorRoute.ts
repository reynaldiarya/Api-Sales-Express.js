import express, { Request, Response, NextFunction } from "express";
import { GetVendorProfile, VendorLogin, UpdateVendorProfile, UpdateVendorService, GetFood, AddFood, UpdateVendorCoverImage, UpdateImageFood } from "../controllers";
import { Authenticate } from "../middlewares";
import multer from "multer";
import randomstring from "randomstring";

const router = express.Router();

const imgStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './images');
    },
    filename: function(req, file, cb){
        cb(null, randomstring.generate(7)+'_'+file.originalname);
    }
});

const gambar = multer({storage: imgStorage}).array('myimages', 10);

router.post('/login', VendorLogin)

router.use(Authenticate)
router.get('/profile', GetVendorProfile)
router.patch('/profile', UpdateVendorProfile)
router.patch('/service', UpdateVendorService)
router.get('/food', GetFood)
router.post('/food', gambar, AddFood)
router.patch('/food', gambar, UpdateVendorCoverImage)
router.post('/updateImageFoods', gambar, UpdateImageFood)
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: "Hallo, route vendor"
    });
})

export {router as VendorRoute};