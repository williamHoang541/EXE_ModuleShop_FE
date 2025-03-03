import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = title || "Furniture"; 
  }, [title]);
};

export default useTitle;
