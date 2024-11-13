import styles from "./hero.module.css";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroBg}></div>
      <div className={styles.hero_left}>
        <h1 className={styles.hero_heading}>SECOND HAND STORE</h1>
        <div className={styles.para}>
          <p>Find Hidden Gems, Save Money, </p>
          <p>and Shop Sustainably.</p>
          <p>Join the Second-Hand Revolution.</p>
        </div>
        <div className="flex  gap-x-2">
          <Link
            to={"scrollProduct"}
            smooth={true}
            duration={500}
            className={`${styles.hero_btn} bg-[#047857] text-white`}
          >
            Start Shopping
          </Link>
          <RouterLink
            to={"/about"}
            className={styles.hero_btn}
            
          >
            Read about us{" "}
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;
