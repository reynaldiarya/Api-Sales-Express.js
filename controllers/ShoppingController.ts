import {Request, Response, NextFunction, request} from 'express';
import {Vendor} from '../models';
import { FoodDoc } from '../models';

export const GetFoodTersedia = async (req:Request, res:Response, nest: NextFunction) => {
    const idvendor = req.params.id;
    try{
        const result = await Vendor.find({_id : idvendor, serviceAvailable: true}).sort({'rating': 'descending'}).populate("foods");
        if(result.length > 0){
            return res.status(200).json(result);
        }
        else{
            return res.status(400).json({"message":"Not Found or Not Available"})
        }
    }
    catch(e: any){
        if(typeof e === "string"){
            console.log(e.toUpperCase());
        }else if (e instanceof Error){
            console.log(e.message);
        }
        return res.json({"message":"Not Found or Not Available"})
    }
}

export const GetBestWarteg = async (req:Request, res:Response, nest: NextFunction) => {
    try{
        const result = await Vendor.find({serviceAvailable: true}).sort({'rating': 'descending'}).populate("foods").limit(3);
        if(result.length > 0){
            return res.status(200).json(result);
        }
        else{
            return res.status(400).json({"message":"Not Found or Not Available"})
        }
    }
    catch(e: any){
        if(typeof e === "string"){
            console.log(e.toUpperCase());
        }else if (e instanceof Error){
            console.log(e.message);
        }
        return res.json({"message":"Not Found or Not Available"})
    }
}

export const GetFoodIn30Min = async (req:Request, res:Response, nest: NextFunction) => {
    const idvendor = req.params.id;
    try{
        const result = await Vendor.find({_id : idvendor, serviceAvailable: true}).sort({'rating': 'descending'}).populate("foods");
        if(result.length > 0){
            let foodResult: any = [];
            result.map(vendor => {
                const foods = vendor.foods as [FoodDoc];
                foodResult.push(...foods.filter(food => food.readyTime <= 30));
            })
            return res.status(200).json(foodResult);
        }
        else{
            return res.status(400).json({"message":"Not Found or Not Available"})
        }
    }
    catch(e: any){
        if(typeof e === "string"){
            console.log(e.toUpperCase());
        }else if (e instanceof Error){
            console.log(e.message);
        }
        return res.json({"message":"Not Found or Not Available"})
    }
}