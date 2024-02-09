import Badge from "@mui/material/Badge";
// import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { userRequest } from "../requestMethods";
import PrevOrders from "../pages/PrevOrders";
// import { useQuery } from "react-query";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit; /* Use the default text color */
`;
const RedBadge = styled(Badge)`
  .MuiBadge-dot {
    background-color: red; // Set your desired color
  }
`;
const LogoutButton = styled.button`
  color: white;
  padding: 6px 12px;
  border: 1px solid red;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  background-color: #e32536;
`;

const btn = {
  color: "white",
  padding: "6px 3px",
  border: "1px solid red",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "0px",
  backgroundColor: "#E32536",
};

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);

  const [viewOrderSideView, setViewOrderSideView] = useState(false);

  const quantity = useSelector((state) => state.cart.quantity);
  console.log(quantity);
  const dispatch = useDispatch();

  const handlePrevorders = () => {
    setViewOrderSideView(true);
  };
  const handleClose = () => {
    console.log("Close");

    setViewOrderSideView(false);
  };
  const handleLogout = () => {
    console.log("Logout");
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        {user ? (
          <Left>
            {/* <SearchContainer>
              <Input placeholder="Search" />
              <SearchIcon style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer> */}
            <button style={btn} onClick={handlePrevorders}>
              Previous Order
            </button>
            {viewOrderSideView && <PrevOrders close={handleClose} />}
          </Left>
        ) : (
          <></>
        )}

        <Center>
          <LogoLink to="/">
            <Logo>Vachan</Logo>
          </LogoLink>
        </Center>

        <Right>
          {user ? (
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          ) : (
            // <></>
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          <Link to="/cart">
            <MenuItem>
              <RedBadge badgeContent={quantity} color="primary">
                <ShoppingCartIcon />
              </RedBadge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
