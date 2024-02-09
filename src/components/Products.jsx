
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import CardHomeScreen from "./CardHomeScreen/CardHomeScreen";

const Container = styled.div`
  padding: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  color: red;
`;

const Products = ({ cat, filters, sort }) => {
   
  const { data, isLoading, isError } = useQuery([cat], getProducts, {
    staleTime: 20000,
  });

  async function getProducts() {
    const res = await axios.get(
      cat
        ? `https://vachan-server.onrender.com/api/products?category=${cat}`
        : "https://vachan-server.onrender.com/api/products"
    );
   console.log(res);
    return res.data;
  }
 

   

  // useEffect(() => {
  //   // Additional logic if needed when products change
  // }, [products]);

  // const applyFilters = (data) => {
  //   return data.filter((item) =>
  //     Object.entries(filters).every(([key, value]) => item[key].includes(value))
  //   );
  // };

  // const applySorting = (data) => {
  //   if (sort === "newest") {
  //     return [...data].sort((a, b) => a.createdAt - b.createdAt);
  //   } else if (sort === "asc") {
  //     return [...data].sort((a, b) => a.price - b.price);
  //   } else {
  //     return [...data].sort((a, b) => b.price - a.price);
  //   }
  // };

  // const filteredProducts = applyFilters(products) || [];
  // const sortedProducts = applySorting(filteredProducts);

  return (
    <Container>
      {isLoading && cat ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : isError ? (
        <LoadingMessage>Error fetching data</LoadingMessage>
      ) : (
        data.map((item, i) => (
          <CardHomeScreen item={item} key={i} />
        ))
      )}
      
    </Container>
  );
};

export default Products;
