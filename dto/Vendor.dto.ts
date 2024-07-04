export interface CreateVendorInput{
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface VendorLoginInput{
    email:string,
    password:string
}

export interface VendorRet{
    _id: string,
    name: string,
    ownerName: string,
    foodType: [String],
    pincode: string,
    address: string,
    phone: string,
    email: string,
    password: string,
    salt: string,
    serviceAvailable: boolean,
    coverImage: [string],
    rating: number
}

export interface VendorPayLoad{
    _id: string,
    email: string,
    name: string,
    foodTypes: [string]
}

export interface EditVendorInputs{
    name: string,
    address: string,
    phone: string,
    foodTypes: [string]
}

export interface EditVendorServices{
    serviceAvailable: boolean,
}