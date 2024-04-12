import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import SearchProduct from "./Products/SearchProduct";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="landing-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h1>Welcome to Our Store</h1>
            <p className="lead">
              Explore Our Store Search here Your Faverate product.
            </p>
            {user.userId ? (
              <SearchProduct />
            ) : (
              <Link to="/login">
                <Button variant="outline-primary">Login to Explore</Button>
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
