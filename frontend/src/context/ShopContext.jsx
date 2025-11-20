import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import axios from "axios";
import { userDataContext } from "./UserContext";
import { toast } from "react-toastify";

export const shopDataContext = createContext();
const ShopContext = ({ children }) => {
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let [showSearch, setShowSearch] = useState(false);
  let [cartItem, setCartItem] = useState({});
  let currency = "₹";
  let deliveryFee = 49;

  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);

  const getProduct = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list", {
        withCredentials: true,
      });
      console.log(result.data);
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    if (userData) {
      try {
        let result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );
        console.log(result);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      console.log("add Error");
    }
  };

  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true }
      );
      setCartItem(result.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (cartData) {
      try {
        let result = await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true }
        );
        console.log(result.data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const getCartAmount =  () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getUserCart();
  }, []);

  const value = {
    getProduct,
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    getCartCount,
    addToCart,
    setCartItem,
    cartItem,
    updateQuantity,
    getCartAmount,
  };
  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
};

export default ShopContext;
