import React, { useContext, useState } from 'react';
import { CategoryContext } from '../context/CategoryContext';

const CategoryItem = ({ item }) => {
  const { selectedItem, selectItem } = useContext(CategoryContext);
 

  

  // Check if the current item is selected, and apply styles accordingly
  const containerStyle = {
    margin: '2px',
    height: 'fit-content',
    width: 'fit-content',
    padding: '2px 3px',
    borderRadius: '10px',
    color: 'grey',
    border: selectedItem === item ? '1px solid blue' : '1px solid red', // Change border color based on selection
  };

  const buttonStyle = {
    padding: '6px',
    border: 'none',
    backgroundColor: selectedItem === item ? 'lightblue' : 'transparent', // Change background color based on selection
    color: selectedItem === item ? 'pink' : 'gray', // Change text color based on selection
    cursor: 'pointer',
    outline: 'none', // Remove button outline on click
  };

  const handleItemClick = () => {
    selectItem(item.cat);
     
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleItemClick} style={buttonStyle}>
        {item.cat}
      </button>
    </div>
  );
};

export default CategoryItem;
