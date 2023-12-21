import { createContext, useContext, ReactNode, useState } from "react";
import { CategoryContextValue } from "./types";
import { getCategoriesRequest } from "../services/categories";

const CategoryContext = createContext<CategoryContextValue>({
  categories: [],
  getCategories: async () => {},
});

export const useCategories = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }

  return context;
};

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<object[]>([]);

  const getCategories = async () => {
    try {
      const res = await getCategoriesRequest();
      setCategories(res);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue: CategoryContextValue = {
    categories,
    getCategories,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};
