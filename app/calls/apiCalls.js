import axios from "axios";

export const getCategories = async (setCategories) => {
  try {
    const res = await axios.get("/api/categories/all");
    console.log(res.data);
    setCategories(res.data);
  } catch (error) {
    throw new error();
  }
};

export const getSubCategories = async (categoryName, setProducts) => {
  try {
    const res = await axios.post("/api/subcategories/all", { categoryName });
    console.log(res.data);
    setProducts(res.data);
  } catch (error) {
    throw new error();
  }
};

export const getProducts = async (subCategoryName, setProducts) => {
  try {
    const res = await axios.post("/api/products/all", { subCategoryName });
    console.log(res.data);
    setProducts(res.data);
  } catch (error) {
    throw new error();
  }
};
