import { Link } from "react-router-dom"
import styles from "./productItem.module.css"

type ProductItemProps={
  productItem:{
    image:string,
    desc:string,
    name:string,
    price:number,
    sale: string,
    _id?:string,
  }
}
const ProductItem:React.FC<ProductItemProps> = ({productItem}) => {
  return (
    <Link to={`/product/${productItem._id}`} className={styles.productItem}>
    <div className={styles.imgWrapper}>
        <img className={styles.productImg} src={productItem.image} alt="productImg" />
    </div>
    <div className={styles.productInfo}>
        <div className={styles.productName}>
            <p className={styles.name}>{productItem.name}</p>
            <p className={styles.desc}>{productItem.desc}</p>
        </div>
        <div className={styles.productPrice}>
            <h2>Rs. {productItem.price}</h2>

        </div>
    </div>
    {/* <div className={styles.progressBox}>
      <div className={styles.progressBar}>
        <div className={styles.progress}></div>
      </div>
      <p>{productItem.sale} Sale</p>
    </div> */}
      

    </Link>
  )
}

export default ProductItem