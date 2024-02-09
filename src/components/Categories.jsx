import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left:10px;
  // padding: 20px;
  // justify-content: space-between;
  ${mobile({ padding: "10px", flexDirection:"row" })}

`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item,i) => (
        <CategoryItem item={item} key={i} />
      ))}
    </Container>
  );
};

export default Categories;
