import styles from "./checkoutItem.module.css"

const CheckoutItem = () => {
  return (
    <div className={styles.checkoutItem_container}>
        <h2>ORDER SUMMARY</h2>
        <div className={styles.checkoutCard}>
            <img src="" alt="img" />
            <div className={styles.checkoutCard_details}>
                <h3>THE LAST STAND</h3>
            </div>
        </div>

    </div>
  )
}

export default CheckoutItem
