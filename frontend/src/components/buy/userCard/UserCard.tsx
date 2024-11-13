
import { useContext } from "react"
import styles from "./UserCard.module.css"
import { ThriftContext } from "../../../context/Context"
const UserCard = ({userData}) => {
    
      const {state:{user}} = useContext(ThriftContext)
  return (
    <div className={styles.userCard}>

      <div className={styles.profile_info}>
        <img width={"50"} src={userData.image} alt="" />


        <div className="user_info">
          <h4 className={styles.userName}>{userData.username}</h4>
          <p className={styles.userEmail}>{userData.email}</p>
        </div>
      </div>
      <div className={styles.addressBox}>

        <div className={styles.addressItem}>
          <p>Country:</p>
          <p>{userData.country}</p>

        </div>
        <div className={styles.addressItem}>
          <p>City:</p>
          <p>{userData.city}</p>

        </div>
      </div>
      <div className={styles.bioBox}>
      <p className={styles.bioKey}>About seller</p>
        <p className={styles.bioTxt} >{userData.about}</p>
        </div>
   {/* {
    user?._id !== userData?._id && <button className={styles.messageBtn}>
        Message
      </button>
   }   
     */}
    </div>
  )
}

export default UserCard