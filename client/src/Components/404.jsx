import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="notfound__wrapper">
      <Row className="">
        <Col className="text-center">
          <h1>404</h1>
          <p className="lead">Page Not Found</p>
          <Link to="/">
            <Button variant="outline-primary">Go to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
