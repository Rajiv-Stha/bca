import styles from "./blacksale.module.css";
import { SiLightning } from "react-icons/si";
import { BsArrowLeftSquare } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import ProductItem from "../productItem/ProductItem";
import { useEffect, useState } from "react";
import { getAllProductApi, getAllProductByStatusApi } from "../../utils/api";

const BlackSale = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { status, data } = await getAllProductByStatusApi([
        "approved",
      ]);
      if (status === 200) {
        setAllProducts(data.message);
      } else {
        throw new Error("something went wrong");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.blackSale} id="scrollProduct">
      <div className={styles.sale_header}>
        <div className={styles.left_sale_header}>
          <SiLightning className={styles.icons} />
          <h2 className={styles.blackSale_header}>All Products</h2>
        </div>
        {/* <div className={styles.right_sale_header}>
                <BsArrowLeftSquare className={styles.icons} />
                <BsFillArrowRightSquareFill className={styles.icons}/>
            </div> */}
      </div>
      <div className={styles.productWrapper}>
        {allProducts.map((productItem) => {
          return <ProductItem productItem={productItem} />;
        })}
      </div>
    </div>
  );
};

export default BlackSale;
