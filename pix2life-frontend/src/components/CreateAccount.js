import React from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CreateAccount.css'; // Custom CSS for styling

const CreateAccount = () => {
  return (
    <Container className="create-account-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Nav variant="tabs" defaultActiveKey="/" className="justify-content-center">
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="active">Create Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/login">Log In</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="form-container">
            <h2 className="text-center">Create Account</h2>
            <p className="text-center">Let's get started by filling out the form below.</p>
            <Form>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mb-3">Get Started</Button>
              <p className="text-center">Or sign up with</p>
              <Button variant="outline-dark" className="w-100">
                <i className="fab fa-google"></i> Continue with Google
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAccount;
