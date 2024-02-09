import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #E32636;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>
    
     Super Deal! Free Chai on every 10 Cups !!
    
     </Container>;
};

export default Announcement;
