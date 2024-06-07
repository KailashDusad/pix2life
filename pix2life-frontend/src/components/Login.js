import React from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css'; // Custom CSS for styling

const Login = () => {
  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Nav variant="tabs" defaultActiveKey="/login" className="justify-content-center">
            <Nav.Item>
              <Nav.Link as={Link} to="/">Create Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/login" className="active">Log In</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="form-container">
            <h2 className="text-center">Welcome Back</h2>
            <p className="text-center">Fill out the information below in order to access your account.</p>
            <Form>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mb-3">Sign In</Button>
              <p className="text-center">Or sign in with</p>
              <Button variant="outline-dark" className="w-100">
                <i className="fab fa-google"></i> Continue with Google
              </Button>
              <p className="text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
