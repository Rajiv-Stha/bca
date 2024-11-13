import styles from "./transactionItem.module.css"
import moment from 'moment'
const TransactionItem = ({transaction,type}) => {
  return (
    <div className={styles.transactionItem}>
        <div className={styles.transactionLeft}>

        <div className={styles.img_wrapper}>
            <img src={transaction.product.image}  alt="" />
        </div>
        <div className={styles.transaction_details}>
            <p>{transaction._id}</p>
            <p>{transaction.product.name}</p>
            <p>{moment(transaction.createdAt).format("LLLL")}</p>
        </div>




        </div>
        <div>
          {
            type==="buy" ? <div>
              <p>seller</p>
              <p> Name : {transaction.seller.username}</p>
              <p>Email : {transaction.seller.email}</p>
              <p></p>
            </div> :<div>
                <p>buyer</p>
              <p> Name : {transaction.buyer.username}</p>
              <p>email: {transaction.buyer.email}</p>
            </div>
          }
        </div>
        <div className={styles.transactionRight}>
            <p>Quantity  : {transaction.quantity}</p>
            <p>Price  : {transaction.product.price}</p>
            <p>Total price : {transaction.totalPrice}</p>
        </div>
      
    </div>
  )
}

export default TransactionItem