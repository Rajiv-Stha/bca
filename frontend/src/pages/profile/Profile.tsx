import Navbar from "../../components/Navbar/Navbar"
import ProfileCard from "../../components/profileCard/ProfileCard"
import styles from "./profile.module.css"

const Profile = () => {
  return (
    <>
    <Navbar/>
    <div className={styles.profile_container} >
      <ProfileCard/>
    </div>
    </>
  )
}

export default Profile