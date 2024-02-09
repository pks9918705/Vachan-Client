import styled from "styled-components";
 
import Products from "../components/Products";
 
import { mobile } from "../responsive";
 
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 5px;
`;

// const FilterContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const Filter = styled.div`
//   margin: 20px;
//   ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
// `;

// const FilterText = styled.span`
//   font-size: 20px;
//   font-weight: 600;
//   margin-right: 20px;
//   ${mobile({ marginRight: "0px" })}
// `;

// const Select = styled.select`
//   padding: 10px;
//   margin-right: 20px;
//   ${mobile({ margin: "10px 0px" })}
// `;
// const Option = styled.option``;

const ProductList2 = () => {
 
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  console.log(filters)

  return (
    <Container>
       
      <Title>ALL</Title>
   
      <Products cat={""}  />
       
    </Container>
  );
};

export default ProductList2;