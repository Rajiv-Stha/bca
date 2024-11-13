import { useContext, useEffect, useState } from "react"
import TransactionItem from "../../components/transactionItem/TransactionItem"
import styles from "./transaction.module.css"
import Navbar from "../../components/Navbar/Navbar"
import {  getTransactionForBuyerApi, getTransactionForSellerApi } from "../../utils/api"
import { ThriftContext } from "../../context/Context"

const Transaction = () => {


    const [ tab,setTab] =useState("buy")
    const handleChangeTab=(type:"buy"|"sell")=>setTab(type) 
    const {state:{user}} = useContext(ThriftContext)
    const [transactionData,setTransactionData] = useState([])
    useEffect(()=>{

      fetchTransaction()

    },[tab])

    const fetchTransaction=async()=>{
      if(!user)return;
      let res ; 
      try {
        if(tab==="buy"){
        res =   await  getTransactionForBuyerApi(user._id)
        }else{
        res =   await getTransactionForSellerApi(user._id)
        }
        setTransactionData(res.data.message)

      } catch (error) {
        console.log(error)
      }
    }




  return (

    <div className={styles.transaction_container}>
      <Navbar/>
      <div className={styles.transaction_info}>
      <h2 className={styles.transaction_heading}>My Transactions</h2>

      
      <div className={styles.buttonWrapper}>
        <button className={`${styles.transaction_tabButton} ${tab==="buy"? styles.activeTab:""}` } onClick={()=>handleChangeTab("buy")} >As a Buyer</button>
        <button className={`${styles.transaction_tabButton} ${tab==="sell"? styles.activeTab:""}` }  onClick={()=>handleChangeTab("sell")} >As a Seller</button>
      </div>
      </div>

      <div className={styles.transactionItem_container}>
        {
         transactionData.length  > 0 ?  transactionData.map(transaction=><TransactionItem  type={tab} transaction={transaction} key={transaction._id}/>):<div className={styles.noTransactionBox}><p>No Transaction as {tab ==="buy" ? "buyer":"seller"}</p></div>
        }
      </div>
    </div>
  )
}

export default Transaction