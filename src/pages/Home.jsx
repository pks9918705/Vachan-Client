import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
// import Products from "../components/Products";
import { CategoryContext } from "../context/CategoryContext";
import ProductList from "../components/ProductList";
import ProductList2 from "../components/ProductList2";

const Home = () => {
  const { selectedItem } = useContext(CategoryContext);

  return (
    <div>
      <Announcement />
      <Navbar />

      <Categories />

      {/* yehi pe products ko render kro. */}
      {selectedItem && <ProductList cat={selectedItem} />}
      {!selectedItem && <ProductList2 />}
    </div>
  );
};

export default Home;
