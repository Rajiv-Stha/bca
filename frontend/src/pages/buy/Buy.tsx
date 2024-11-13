import { useContext, useEffect, useState } from "react"
import CommentItem from "../../components/Comment/CommentItem"
import Navbar from "../../components/Navbar/Navbar"
import TopNav from "../../components/TopNav/TopNav"
import ProductDetails from "../../components/buy/productDetails/ProductDetails"
import UserCard from "../../components/buy/userCard/UserCard"
import styles from "./buy.module.css"
import {FaComment} from "react-icons/fa"
import { useParams } from "react-router-dom"
import { getCommentOfProductApi, getSingleProductById } from "../../utils/api"
import CommentInputBox from "../../components/Comment/CommentInputBox/CommentInputBox"
import { ThriftContext } from "../../context/Context"

const Buy = () => {

  const {id} = useParams();
  const [productData,setProductData]= useState({})
  const [allComments,setAllComments] =useState([])
  const {state:{refresh}}= useContext(ThriftContext)
  useEffect(()=>{
    if(!id)return;
    fetchSingleProduct()
    fetchProductComment()
  },[id,refresh])

const fetchProductComment=async()=>{
  if(!id)return;
  try {
   const {status,data} =  await getCommentOfProductApi(id)
   if(status===200){
    setAllComments(data.message)
   }
  } catch (error) {
    console.log(error)
    
  }

}
  const fetchSingleProduct=async()=>{
    if(!id)return;
      try {
          const {data,status} = await getSingleProductById(id);
          if(status===200){
            setProductData(data.message[0])
          }

      } catch (error) {
        console.log(error)
      }
  }
  // 
  return (
    <div className={styles.buy_container}>
   
        <Navbar/>
        <div className={styles.productDetails_container}>
          <ProductDetails productData={productData}/>
          { productData.owner && <UserCard userData={productData.owner}/>}
        </div>
        <div className={styles.commentWrapper}>
          <CommentInputBox/>
         <div className={styles.reviewSection}>
         <FaComment className={styles.commentIcon}/>
         
         <h2>Product Review</h2>
         
         </div>
        {
          allComments.map(comment=><CommentItem key={comment._id} comment={comment}/>)
        }
        </div>
    </div>
  )
}

export default Buy