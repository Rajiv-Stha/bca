
import axiosInstance from "./axios"

type loginPayload = {
    email:string,
    password:string,
}
type registerPayload = {
    username:string,
    email:string,
    password:string,
    country:string,
}
type productPayloadType = {
    name:string,
    desc:string,
    owner:string,
    image:string,
    price:string,
    quantity:number,
    gender:string,
}


type commentPayload = {
    text:string,
    user:string,
    product:string
}
type transactionPayload={
    seller:string,
    buyer:string,
    product:string,
    totalPrice:number,
    quantity:number,

}

// auth routes 
export const loginApi = (data:loginPayload)=>axiosInstance.post("/auth/login",data)
export const signUpApi = (data:registerPayload)=>axiosInstance.post("/auth/register",data)
export const getSessionUser = ()=>axiosInstance.get("/user/sessionUser")
export const logOut = ()=>axiosInstance.post("/auth/logout")
export const verifyIfEmailConfirmationTokenIsValidApi=(hash:string)=>axiosInstance.post(`/auth/verifyConfirmationEmailHash`,{hash})
export const confirmEmailApi= (email:string,hash:string)=>axiosInstance.post("/auth/confirmEmail",{hash,email});
export const verifyAccountApi = (email:string)=>axiosInstance.post("/auth/verifyAccount",{email})
export const updateUserApi =(data) =>axiosInstance.put("/user",data)
export const sentConfirmationlinkApi =(email:string)=>axiosInstance.post("/auth/sentConfirmationlink",{email})



// category routes
export const allCategoryApi = ()=>axiosInstance.get("/category")




// product routes
export type TupdateProuductPayload={
    name:string,
    desc:string,
    image:string,
    price:string,
    category:string,
    quantity:number
}
export const AddProductApi = (data:productPayloadType)=>axiosInstance.post("/product/create",data)
export const getAllProductApi = ()=>axiosInstance.get("/product");
export const getAllProductByStatusApi = (statusArr: ("pending" | "approved")[]) => 
    axiosInstance.get("/product", { params: { status: statusArr } });
  export const getSingleProductById=(productId:string)=>axiosInstance.get(`/product?_id=${productId}`)
export const getProductsbyCategoryApi=(category:string)=>axiosInstance.get(`/product?category=${category}`)
export const searchProductByInputApi =(search:string)=>axiosInstance.get(`/product/search?search=${search}`)
export const getProductByUserId = (userId:string)=>axiosInstance.get(`/product/user/${userId}`)
export const updateProductById = (productId:string,data:TupdateProuductPayload)=>axiosInstance.put(`/product/${productId}`,data)





// comment route 


export const AddCommentApi=(data:commentPayload)=>axiosInstance.post("/comment/create",data)

export const getCommentOfProductApi = (productId:string)=>axiosInstance.get(`/comment/product/${productId}`)



// transaction route 


export const createTransactionApi=(data:transactionPayload)=>axiosInstance.post("/transaction/create",data)
export const getTransactionForBuyerApi=(userId:true)=>axiosInstance.get(`/transaction/user?userId=${userId}&buyer=true`)
export const getTransactionForSellerApi=(userId:true)=>axiosInstance.get(`/transaction/user?userId=${userId}&seller=true`)
export const getTransactionOfUserApi=(userId:true)=>axiosInstance.get(`/transaction/myTransaction/${userId}`)

//checkout route
export const handleCheckoutApi=(productId:string, userId:string, quantity:number, totalPrice:number,data:transactionPayload)=>axiosInstance.post("/payment/checkout/",{
    userId, quantity,productId,totalAmount:totalPrice,data
})