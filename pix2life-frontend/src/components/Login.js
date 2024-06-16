import React from 'react';
import { useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css'; 
import { GoogleLogin } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  const navigate = useNavigate(); // Step 2: Initialize useNavigate

  const onSuccess = (response) => {
    console.log("Login Success!! current user: ", response.profileObj);
    navigate('/home'); // Step 3: Redirect to home
  };

  const onFailure = (response) => {
    console.log("Login Failed!! res: ", response);
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Nav variant="tabs" defaultActiveKey="/login" className="justify-content-center">
            <Nav.Item>
              <Nav.Link as={Link} to="/sign">Create Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="active">Log In</Nav.Link>
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
              <GoogleLogin
              clientId={clientId}
              buttonText="Continue with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
              uxMode="redirect" // Use redirect instead of popup
              redirectUri="http://localhost:3000/home" // Specify where Google should redirect after sign-in
/>
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