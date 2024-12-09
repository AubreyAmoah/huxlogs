import axios from "axios";
import toast from "react-hot-toast";

export const getCategories = async (setCategories) => {
  try {
    const res = await axios.get("/api/categories/all");
    setCategories(res.data);
  } catch (error) {
    return console.log(error);
  }
};

export const getSubCategories = async (categoryName, setProducts) => {
  try {
    const res = await axios.post("/api/subcategories/all", { categoryName });
    setProducts(res.data);
  } catch (error) {
    return console.log(error);
  }
};

export const getProducts = async (subCategoryName, setProducts, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.post("/api/products/all", { subCategoryName });
    setProducts(res.data);
  } catch (error) {
    return console.log(error);
  } finally {
    setLoading(false);
  }
};

export const addToCart = async (id, setLoading) => {
  try {
    setLoading(true);
    const res = await axios.post("/api/products/addtocart", { id });
    if (res.status === 201) toast.success(res.data.message);
  } catch (error) {
    console.error(error.response.data || error);
    return toast.error(error.response.data.error || "An error occurred");
  } finally {
    setLoading(false);
  }
};

export const handlePurchase = async (setLoading) => {
  try {
    setLoading(true);
    const res = await axios.post("/api/products/purchase");
    
    if (res.status === 201) {
      toast.success("Purchase successful,");
    }
  } catch (error) {
    console.error(error);
    toast.error("Could not complete the purchase.");
  } finally {
    setLoading(false);
  }
};