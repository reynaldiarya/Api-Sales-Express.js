import { Request, Response, NextFunction, request } from "express";
import { CreateFoodInputs, EditVendorInputs, EditVendorServices, VendorLoginInput } from "../dto";
import { FindVendor } from './AdminController'
import { GenerateSign, ValidatePassword } from "../utility";
import { VendorPayLoad, EditFoodInputs } from "../dto";
import { Food, VendorDoc, FoodDoc } from "../models";

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VendorLoginInput> req.body;

    const vendorExist = await FindVendor('', email);

    if(vendorExist !== null){
        const m_vendor: VendorDoc = vendorExist as VendorDoc
        const validation = await ValidatePassword(password, m_vendor.password, m_vendor.salt);
        console.log(validation)
        if(validation){
            const payload: VendorPayLoad = {
                _id: m_vendor._id,
                name: m_vendor.name,
                foodTypes: m_vendor.foodType,
                email: email
            };

            const token = GenerateSign(payload);
            return res.json(token)
        }else{
            return res.json({"message": "Login Gagal!!"})
        }
    }else{
        return res.json({"message": "Login Gagal!!"})
    }


}

export const GetVendorProfile = async (req:Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if(user){
        const vendor = await FindVendor(user._id);
        // console.log(vendor)
        return res.json(vendor);

    }
    else{
        return res.json({"message":"Vendor not found"});
    }
}

export const UpdateVendorProfile = async (req:Request, res: Response, next: NextFunction) => {
    const {foodTypes, name, address, phone} = <EditVendorInputs> req.body;

    const user = req.user;

    if(user){
        const vendor = await FindVendor(user._id);

        if(vendor !== null && typeof vendor === 'object'){
            const m_vendor: VendorDoc = vendor as VendorDoc
            m_vendor.name = name;
            m_vendor.address = address;
            m_vendor.phone = phone;
            m_vendor.foodType = foodTypes;

            const retval = await m_vendor.save();
            return res.json(m_vendor)
        }else{
            return res.json(vendor);
        }
    }
    else{
        return res.json({"message":"vendor not found"});
    }
}

export const UpdateVendorService = async (req:Request, res: Response, next: NextFunction) => {
    const {serviceAvailable} = <EditVendorServices> req.body;

    const user = req.user;

    if(user){
        const vendor = await FindVendor(user._id);

        if(vendor !== null && typeof vendor === 'object'){
            const m_vendor: VendorDoc = vendor as VendorDoc
            m_vendor.serviceAvailable = serviceAvailable;

            const retval = await m_vendor.save();
            return res.json(m_vendor)
        }else{
            return res.json(vendor);
        }
    }
    else{
        return res.json({"message":"vendor not found"});
    }
}

export const GetFood = async (req:Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if(user){
        const vendor = await FindVendor(user._id);
        if(vendor !== null){
            const m_vendor: VendorDoc = vendor as VendorDoc
            const food = await Food.find({ vendorId: m_vendor._id});
            if(m_vendor.serviceAvailable == true){
                if(food !== null){
                    return res.json(food);
                }
                else{
                    return res.json({"message":"Food not found"});
                }
            }
            return res.json({"message":"Vendor Tidak Tersedia"});
        }
    }
    else{
        return res.json({"message":"Food not found"});
    }
}

export const AddFood = async (req: Request, res:Response, next:NextFunction) => {
    const user = req.user;

    if(user){
        const {name, description, category, foodType, readyTime, price} = <CreateFoodInputs> req.body;
        const vendor = await FindVendor(user._id);

        if(vendor !== null){
            const m_vendor: VendorDoc = vendor as VendorDoc;

            const files = req.files as [Express.Multer.File];

            const images = files.map((file: Express.Multer.File) => file.filename);

            console.log(files);
            console.log(images);

            const menu = await Food.create({
                vendorId: m_vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,
                rating: 0,
                images: images
            })

            m_vendor.foods.push(menu);
            const result = await m_vendor.save();

            return res.json(result);
        }else{
            return res.json(vendor);
        }
    }else{
        return res.json({"message":"vendor not found"});
    }
}

export const UpdateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

     if(user){
       const vendor = await FindVendor(user._id);

       if(vendor !== null){
            const m_vendor: VendorDoc = vendor as VendorDoc;
            const files = req.files as [Express.Multer.File];

            const images = files.map((file: Express.Multer.File) => file.filename);

            const data = await m_vendor.set({
                coverImage: images
            })

            const saveResult = await data.save();

            return res.json(saveResult);
       }

    }
    return res.json({'message': 'Unable to Update vendor profile '})

}

export const UpdateImageFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    const {foodId, hapus} = <EditFoodInputs> req.body;

    console.log(foodId)
    if(user){
        const food = await Food.findById(foodId);
        if(food != null){
            const m_food: FoodDoc = food as FoodDoc;
            const files = req.files as [Express.Multer.File];

            const images = files.map((file: Express.Multer.File) => file.filename);

            if(hapus == true){
                const data = await m_food.set({
                    images: images
                })
                const saveResult = await data.save();
            }else{
               m_food.images.push(...images);
               const saveResult = await m_food.save();
            }


            return res.json(m_food);
        //    }
        }

    }
    return res.json({'message': 'Unable to Update food '})

}
