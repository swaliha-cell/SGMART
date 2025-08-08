import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    const tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select an address");

      const orderPayload = {
        userId: user._id,
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddress._id,
      };

      const url = paymentOption === "COD" ? "/api/order/cod" : "/api/order/stripe";
      const { data } = await axios.post(url, orderPayload);

      if (data.success) {
        if (paymentOption === "COD") {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          window.location.replace(data.url);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length && cartItems) getCart();
  }, [products, cartItems]);

  useEffect(() => {
    if (user) getUserAddress();
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row gap-10 mt-20 px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-50 min-h-screen">
      {/* Cart Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-6">
          Your Cart <span className="text-base text-primary">({getCartCount()} items)</span>
        </h1>

        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3 border-b border-gray-300 mb-4 text-sm uppercase">
          <p>Product</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Remove</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 items-center p-5 mb-6 bg-white rounded-3xl shadow-md border border-gray-100"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div
                onClick={() => {
                  navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="w-24 h-24 cursor-pointer rounded-xl border border-gray-300 flex items-center justify-center overflow-hidden"
              >
                <img src={product.image[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-500 text-sm">Weight: {product.weight || "N/A"}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-600 text-sm">Qty:</p>
                  <select
                    value={cartItems[product._id]}
                    onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm outline-none"
                  >
                    {Array(Math.max(cartItems[product._id], 9))
                      .fill("")
                      .map((_, idx) => (
                        <option key={idx} value={idx + 1}>
                          {idx + 1}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <p className="text-center font-medium text-gray-700">
              {currency}
              {product.offerPrice * product.quantity}
            </p>
            <div className="text-center">
              <button onClick={() => removeFromCart(product._id)}>
                <img src={assets.remove_icon} alt="Remove" className="w-6 h-6 mx-auto opacity-70 hover:opacity-100" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="text-primary font-medium mt-6 inline-flex items-center gap-2 hover:underline"
        >
          <img src={assets.arrow_right_icon_colored} alt="arrow" className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>

      {/* Order Summary */}
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
        <hr className="mb-4" />

        {/* Address */}
        <p className="text-sm font-semibold uppercase text-gray-500">Delivery Address</p>
        <div className="relative mt-2 text-sm text-gray-700">
          <p>
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No address found"}
          </p>
          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-primary hover:underline text-sm mt-1"
          >
            Change
          </button>

          {showAddress && (
            <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
              {addresses.map((address, idx) => (
                <p
                  key={idx}
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddress(false);
                  }}
                  className="p-2 hover:bg-primary/10 cursor-pointer"
                >
                  {address.street}, {address.city}, {address.state}, {address.country}
                </p>
              ))}
              <p
                onClick={() => navigate("/add-address")}
                className="p-2 text-center text-primary hover:bg-primary/10 cursor-pointer"
              >
                Add new address
              </p>
            </div>
          )}
        </div>

        {/* Payment */}
        <p className="mt-6 text-sm font-semibold uppercase text-gray-500">Payment</p>
        <select
          value={paymentOption}
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full mt-2 border border-gray-300 rounded px-3 py-2 text-sm outline-none"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        {/* Summary */}
        <div className="mt-6 text-sm text-gray-600 space-y-2">
          <div className="flex justify-between">
            <span>Items Total</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {getCartAmount() * 0.02}
            </span>
          </div>
          <div className="flex justify-between font-semibold pt-2 text-base text-gray-800">
            <span>Total</span>
            <span>
              {currency}
              {getCartAmount() + getCartAmount() * 0.02}
            </span>
          </div>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 rounded-full bg-primary text-white font-semibold shadow-md hover:shadow-lg hover:bg-primary-dull transition duration-300"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;

