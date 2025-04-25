// ✅ src/utils/sessionStorageUtils.ts
export const getSessionCart = (): any[] => {
    try {
      const storedCart = sessionStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (err) {
      console.error("Failed to load cart from sessionStorage", err);
      return [];
    }
  };
  
  export const saveSessionCart = (cart: any[]) => {
    try {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart to sessionStorage", err);
    }
  };
  