import React, { ChangeEvent, SyntheticEvent, useRef, useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import styles from  "./upload.module.css"
import {IoMdCloudUpload} from "react-icons/io"
import { AddProductApi, allCategoryApi } from "../../utils/api"
import { ThriftContext } from "../../context/Context"
import {useContext ,useEffect}from "react"
import { useNavigate } from "react-router-dom"
import { useUploadImage } from "../../hooks/useUploadImage"
import { useAlert } from "../../hooks/useAlert"
 



const Upload = () => {
  const navigate = useNavigate()
  const {state:{user}} = useContext(ThriftContext)
  const fileRef:React.MutableRefObject<HTMLInputElement | null> = useRef(null)
  const [file,setFile] =useState<File|null > (null)
  const [allCategories,setAllCategories] =useState([])
  const [isUploading,setIsUploading] =useState(false)
  const [uploadData, setUploadData] = useState({
    name:"",
    desc:"",
    owner:user?._id,
    image:"",
    price:"",
    category:"",
    quantity:0,
    gender:"",
  })
  const {upload}  = useUploadImage()
  const {alert}  = useAlert()



  useEffect(()=>{
  fetchAllCategories()
  },[])


  const fetchAllCategories=async()=>{
    try {
    const {status,data} =await allCategoryApi()

    if(status===200){
      setAllCategories(data.message)
    }

    } catch (error) {
      console.log(error)
    }
  }


  const handleInputChange = (event:ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = event.target;
    setUploadData(prev=>{
      return {...prev, [name]:value}
    })
  }

  const handleSubmit = async(event:SyntheticEvent)=>{
    event.preventDefault()
    setIsUploading(true)
    let uploadPayload = {
      ...uploadData,
      owner:user._id
    }

    // upload image 
    if(file){

      
     await   upload(file,(progress:number, url:string )=>{
      console.log(progress)
        if(progress===100 && url){
          console.log("completed",url)
          uploadPayload.image = url
          
        }
      }) 

    }else{
      alert("error","image is required")
      setIsUploading(false)
      return ;
    }


 




    try {
      const {data, status} = await AddProductApi(uploadPayload)
      if(status ===200){
        alert("success","Product added sucessfully for sale")
       setFile(null)
       setUploadData({
        name:"",
        desc:"",
        owner:user?._id,
        image:"",
        price:"",
        quantity:0,
        gender:"",
        category:""
       })
      }
      console.log(data)
      setIsUploading(false)
      navigate("/")
    } catch (error:any) {
      console.log(error.message)
      setIsUploading(false)
    }

  }
  const handleGenderChange = (event:ChangeEvent<HTMLSelectElement>)=>{
    const {name, value} = event.target
    setUploadData(prev=>{
      return {...prev, [name]:value}
    })

  }

  const handleFileChange = (e:ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files){

      setFile(e.target.files[0])
    }

  }

  const handleSelectChange=(e:ChangeEvent<HTMLSelectElement>)=>{

    const {name, value} = e.target
    setUploadData(prev=>{
      return {...prev, [name]:value}
    })

  }
  return (
 <>

 
    <Navbar/>

    <div className={styles.uploadContainer}>

      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>

    <IoMdCloudUpload/>  
    <h2 className={styles.uploadHeading}>Sell your item</h2>
      </div>



        <div className={styles.inputItem}>
          <label htmlFor="name" >Name</label>
          <input type="text" name="name" id="name" placeholder="Enter product name" onChange={handleInputChange} value={uploadData.name} />
        </div>


        <div className={styles.inputItem}>
          <label htmlFor="desc">Desc</label>
          <input type="text" name="desc" id="desc" placeholder="Enter desc" onChange={handleInputChange} value={uploadData.desc} />
        </div>
        <div className={styles.priceInputItem}>
          <div className={styles.priceInput}>

          <label htmlFor="price">Price</label>
          <input type="number" id="price" placeholder="Enter price" onChange={handleInputChange} name="price" value={uploadData.price} />
          </div>
          <div className={styles.genderInput}>

          <label htmlFor="price">Gender</label>
          <select name="gender" id="gender" onChange={handleGenderChange}>
            <option className={styles.selectOption} value="choose" selected disabled>gender</option>
            <option className={styles.selectOption} value="male">Male</option>
            <option className={styles.selectOption} value="female">Female</option>
            <option className={styles.selectOption} value="other">Other</option>
          </select>
          </div>
     
          
          
       
        </div>
        <div className={styles.priceInputItem}>
          
        <div className={styles.inputItem}>
          <label htmlFor="quantity" >Quantity</label>
          <input type="number" name="quantity" id="quantity" placeholder="Enter Quantity" onChange={handleInputChange}/>
        </div>
                  <div className={styles.genderInput}>

          <label htmlFor="price">Category</label>
          <select name="category" id="cateogory" onChange={handleSelectChange}>
            <option className={styles.selectOption} value="choose" selected disabled>category</option>
            {
              allCategories.map(cat=>   <option className={styles.selectOption} value={cat.categoryName}>{cat.categoryName}</option>)
            }
  
          </select>
          </div>

            </div>


        
        <div className={styles.inputItem}>

        <label>Upload Image</label>
        <div className={styles.uploadImage} onClick={()=>fileRef.current?.click()}>
          <input type="file" style={{display:"none"}} ref={fileRef} onChange={handleFileChange} />
          <IoMdCloudUpload className={styles.uploadIcon} />
          <p>Upload</p>
        </div>
        </div>
        <button type="submit" className={styles.uploadBtn}>{isUploading ? "Uploading":"Upload"}</button>
      
      </form>

    </div>


 </>
    
      
  
  )
}

export default Upload