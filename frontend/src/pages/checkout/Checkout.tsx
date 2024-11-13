// import Image from 'next/image'
import { useContext } from 'react'

import { Minus, Plus } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ThriftContext } from "../../context/Context"
import { useAlert } from '../../hooks/useAlert';
import { handleCheckoutApi } from '../../utils/api';

export default function CartItemSummary() {
  const { state: { user } } = useContext(ThriftContext)
  const {alert}  =useAlert()

  const navigate = useNavigate()
  const locationn = useLocation();
  const receivedState = locationn.state; 
console.log(receivedState)
  const handleCheckout = async () => {
    try {
      if (!user?._id) {
        return navigate("/login");
      }
      const {data} = await handleCheckoutApi(receivedState.productDetails._id, user._id, receivedState.quantity, receivedState.totalPrice,receivedState)

console.log(data)
      location.href=data.url
    } catch (error) {
      console.error("Error creating checkout session", error);
      alert("error","Failed to initiate payment. Please try again.");
    }
  };
console.log(user)

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Cart Summary</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <img
                  src={receivedState.productDetails.image}
                  alt="Product Image"
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{receivedState.productDetails.name}</h2>
                <p className="text-gray-600 mb-4">{receivedState.productDetails.desc}</p>
                <div className="flex items-center mb-4">
                  <span className="text-xl font-semibold text-gray-900 mr-2">Rs. {receivedState.productDetails.price}</span>
                </div>
                <div className="flex items-center mb-4">
                  {/* <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400" aria-label="Decrease quantity">
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button> */}
                  <span className="text-lg font-semibold">Quantity: {receivedState.quantity}</span>
                  {/* <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400" aria-label="Increase quantity">
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button> */}
                </div>
                {/* <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Product Details:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>1. Bluetooth 5.0 connectivity</li>
                    <li>2. 40mm dynamic drivers for superior sound</li>
                    <li>3. Up to 30 hours of battery life</li>
                  
                  </ul>
                </div> */}
             
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Subtotal:</span>
              <span className="text-2xl font-bold text-gray-900">Rs. {receivedState.totalPrice}</span>
            </div>
            <button onClick={handleCheckout} className="mt-4 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}