export interface CreateFoodInputs{
    name: string;
    description: string;
    category: string;
    foodType: string;
    readyTime: number;
    price: number;
}
export interface EditFoodInputs{
    foodId: string;
    hapus: boolean;
}