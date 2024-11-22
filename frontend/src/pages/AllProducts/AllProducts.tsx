import { useEffect, useRef, useState } from "react"
import Navbar from "../../components/Navbar/Navbar"

import SideBar from "../../components/allProductsCard/sidebar/SideBar"
import styles from "./allProducts.module.css"
import {BsSearch} from "react-icons/bs"
import { getAllProductApi, getProductsbyCategoryApi } from "../../utils/api"
import ProductItem from "../../components/productItem/ProductItem"

import SearchModal from "../../layouts/modal/SeachModal/SearchModal"
import Footer from "../../components/Footer/Footer"
import { useLocation } from 'react-router-dom';


const AllProducts = () => {

  const [ currentCategory,setCurrentCategory] =useState("All");
  const [productItem,setProductItem] = useState([]);
  const location = useLocation(); // Get the current URL location
  const searchParams = new URLSearchParams(location.search); // Parse query parameters
  const category = searchParams.get('category'); // Extract 'category' value

 
  useEffect(()=>{

      fetchProductsByCategory(currentCategory)
    
  },[currentCategory])

 useEffect(()=>{
  if(category){

    setCurrentCategory(category)
  }
 },[category])


  const fetchProductsByCategory=async(category:string)=>{
    let res ; 
    try {

      if(category === "All"){

        res = await getAllProductApi()
      }else{
        res = await getProductsbyCategoryApi(category)
      }
     
       let products =  res.data.message;
       setProductItem(products)
      
    } catch (error) {
      console.log(error)
    }
  }
  
   




  return (
    <>
   
    <Navbar/>
    <div className={styles.allProducts_container}>
      <div className={styles.topPart}>
        <h2>Products</h2>
    <SearchModal>
        <div className={styles.searchBox}>

        <input type="text" placeholder="Search"/>
        <BsSearch className={styles.searchIcon}/>
        </div>
    </SearchModal>
        </div> 
        <div className={styles.allProducts_box}>
          <div className={styles.product_sidebar}>
            <SideBar setCurrentCategory={setCurrentCategory} activeCat={currentCategory}/>
          </div>
          <div className={styles.productCard_box}>
          {
            productItem.map(product=><ProductItem key={product._id} productItem={product}/>)
          }
          
          </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default AllProducts