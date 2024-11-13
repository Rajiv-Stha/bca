import BlackSale from "../../components/BlackSale/BlackSale"
import Footer from "../../components/Footer/Footer"
import Hero from "../../components/Hero/Hero"
import Navbar from "../../components/Navbar/Navbar"
import Category from "../../components/category/Category"
import styles from "./homepage.module.css"
const Homepage = () => {
  return (
    <div className={styles.homepage_container}>
      <Navbar/>
      <Hero/>
      <Category/>
      <BlackSale/>
      <Footer/>
    </div>
  )
}

export default Homepage