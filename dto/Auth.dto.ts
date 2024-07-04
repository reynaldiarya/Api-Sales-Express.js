import { VendorPayLoad } from "./Vendor.dto";
import { CustomerPayLoad } from "./Customer.dto";
export type AuthPayLoad = VendorPayLoad | CustomerPayLoad;