import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";

import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

import { useDispatch } from "react-redux";
import { addProduct, cartToZero, removeCompletely } from "../redux/cartRedux";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import toast, { Toaster } from "react-hot-toast";



const BASE_URL = "https://vachan-server.onrender.com/api/";



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

// const Image = styled.img`
//   width: 200px;
// `;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

// const ProductId = styled.span``;

// const ProductColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
// `;

// const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

// const Summary = styled.div`
//   flex: 1;
//   border: 0.5px solid lightgray;
//   border-radius: 10px;
//   padding: 20px;
//   height: 50vh;
// `;

// const SummaryTitle = styled.h1`
//   font-weight: 200;
// `;

// const SummaryItem = styled.div`
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   font-weight: ${(props) => props.type === "total" && "500"};
//   font-size: ${(props) => props.type === "total" && "24px"};
// `;

// const SummaryItemText = styled.span``;

// const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const loading = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  color: "red",
  fontSize: "3rem",
};

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  // console.log(cart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const token = `Bearer ${localStorage.getItem('token')}`;

  useEffect(() => {
    // Simulate loading delay (you can replace this with actual loading logic)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Clean up the timeout on component unmount or when loading is done
    return () => clearTimeout(loadingTimeout);
  }, []);

  if (isLoading) {
    return <div style={loading}>Loading...</div>;
  }

  const handleAddQuantity = (obj) => {
    
    dispatch(addProduct(obj));
    // toast.success('Product added successfully')
  };

  const handleCompleteRemove = (p) => {

    toast.success('Product removed successfully')
    dispatch(removeCompletely(p));
  };

  // -----------
  // Checkout
  // -----------

  const checkout = async () => {
    console.log("****starting checkout");
    if (isCheckingOut) {
      // If already checking out, prevent multiple clicks
      return;
    }

    setIsCheckingOut(true);
    console.log("checkout clicked", cart.total);

    if (!cart.total > 0) {
      alert("bhai chutiya hai");
      return;
    }

    try {
      // const res = await userRequest.post("/orders", cart);
      const res = await axios.post(`${BASE_URL}orders`, cart,{
        headers: { token }
    });
      const { amount, _id } = res.data;
      checkoutHandler(amount, _id);
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
    }
  };

  const checkoutHandler = async (amount, _id) => {
    console.log("checkouthandler mein entry ho gi hai");
    const res = await axios.post(`${BASE_URL}checkout/payment`, { amount, _id },{headers: { token }});
    console.log("checkoutHandler");
    console.log(res);
    const { order } = res.data;
    const { id } = res.data.order;
    console.log(id);
    const { key_id } = res.data;
    const key = key_id;
    console.log(key);
    console.log(order.amount);

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Vachan", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      // callback_url: "http://localhost:5000/api/checkout/paymentVerification",
      handler: async function (response) {
        try {
          // Log the response received from Razorpay
          console.log(response);

          // Make an asynchronous request to your server's payment verification endpoint
          const res = await axios.post(
             

            `${BASE_URL}checkout/paymentVerification`,
            response
          );

          // Log the response from your server's payment verification endpoint
          console.log(res);

          dispatch(cartToZero());
          setIsCheckingOut(false);
          navigate(`/paymentsuccess?reference=${response.razorpay_payment_id}`);
        } catch (error) {
          setIsCheckingOut(false);
          navigate(`/failure`);
          console.error("Error handling payment success:", error);
        }
      },

      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9876543210",
        method: "upi", // Specify the payment method as UPI
        vpa: "success@razorpay", // Specify the UPI ID
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var razor = new window.Razorpay(options);
    razor.on("payment.failed", function (response) {
      console.log(response);
      alert("This step of Payment Failed");
    });

    razor.open();
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top >
          
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>{
            user && <TopButton  type="filled" onClick={checkout} disabled={isCheckingOut}>
            {isCheckingOut ? "CHECKING OUT..." : "CHECKOUT NOW"}
          </TopButton>
          }
          
      <Toaster />
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <Product key={index}>
                <ProductDetail>
                  {/* <Image src={product.img} /> */}
                  <LazyLoadImage
                 
                    // alt={item.alt}
                    // height={item.height}
                    src={product.img} // use normal <img> attributes as props
                    width="200px"
                    height="200px"
                    effect="blur"
                     
                  />

                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    {/* <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} /> */}
                    {/* <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize> */}
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon
                      onClick={() =>
                        handleAddQuantity({ ...product, quantity: 1 })
                      }
                    />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <RemoveIcon
                      onClick={() =>
                        handleAddQuantity({ ...product, quantity: -1 })
                      }
                    />
                    <Button onClick={() => handleCompleteRemove(product)}>
                      Remove
                    </Button>
                  </ProductAmountContainer>
                  <ProductPrice>
                    Rs {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          {/* when discount and offer calcultaion is done  */}
          {/* <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs {cart.total}</SummaryItemPrice>
            </SummaryItem>

            <Button onClick={checkout}>CHECKOUT NOW</Button>
          </Summary> */}
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
