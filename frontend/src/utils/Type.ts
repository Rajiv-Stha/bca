export type ProductType={
    image:string,
    name:string,
    desc:string, 
    owner:UserType,
    price:number,
    category:string,
    quantity:number,
    status: "pending"|"approved"|"rejected"
    _id:string,
}
export type UserType={
    username:string,
    email:string,
    image:string,
    country:string,
    city:string,
    about:string,
    isVerfied:boolean,
    isAdmin:boolean,
    _id:string
}