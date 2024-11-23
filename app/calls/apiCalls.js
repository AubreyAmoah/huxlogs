import axios from "axios";

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
