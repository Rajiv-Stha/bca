import styles from "./productDetails.module.css"

import { useContext, useState } from "react"
import { BuyModal } from "../../../layouts/modal/BuyModal"
import { ThriftContext } from "../../../context/Context"
const ProductDetails = ({productData}) => {

      const {state:{user}} = useContext(ThriftContext)
  const [quantity,setQuantity]  =useState(1)



  const handleChangeQuantity=(type:string)=>{

    if(type==="sub"){
      if(quantity===1)return;
      setQuantity(prev=>prev-1)
    }else{
      if(quantity ===(+productData.quantity))return;
     setQuantity(prev=>prev+1)
    }

  }




  return (
    <div className={styles.ProductDetails}>
      <div className={styles.img_wrapper}>
          <img src={productData.image} alt="" />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{productData.name}</h3>
        <div className={styles.ratingInfo}>
          {/* <div className={styles.rating}>
          <Rating size="small" name="read-only" value={4.5} precision={0.5} readOnly />
          <p className={styles.ratingCount}>24 ratings</p>
          </div> */}
          {/* <div className={styles.reaction}>
            <BsFillShareFill className={styles.shareIcon}/>
            <AiOutlineHeart className={styles.heartIcon}/>
          </div> */}
        </div>
        <p className={styles.productBrand}>{productData.desc}</p>
        {
          (+productData.quantity)===0 ? <p className={styles.outOfStock}>Out of stock </p>:<p>In stock {productData.quantity}</p>
        } 
        <hr />
        <div className={styles.priceInfo}>
          
        <p className={styles.newPrice}>Rs {productData.price}</p>
        {/* <del className={styles.oldPrice}>Rs. 7999</del> */}
        </div>
        {
          (+productData?.quantity) !== 0 &&<>
        <div className={styles.quantityBox}>
        <p>Quantity</p>
        <button onClick={()=>handleChangeQuantity("add")}>+</button>
        <p>{quantity}</p>
        <button onClick={()=>handleChangeQuantity("sub")}>-</button>

      </div>
      {
        user?._id !== productData?.owner?._id &&   <BuyModal quantity={quantity} product={productData}>
      <button  className={styles.buyBtn}>Buy Now</button>
      </BuyModal>
      }
          </>

        }
   
    
      </div>
    </div>
  )
}

export default ProductDetails