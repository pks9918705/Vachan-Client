import React, { createContext, useState } from 'react';

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const selectItem = (item) => {
    // console.log("context",item)
    setSelectedItem(item);
  };

  return (
    <CategoryContext.Provider value={{ selectedItem, selectItem }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryProvider, CategoryContext };
