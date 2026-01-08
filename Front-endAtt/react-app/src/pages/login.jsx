
import React, { useState } from 'react';
import API from "../services/api";
import { saveTokens } from "../services/auth";
import { useNavigate } from 'react-router-dom'; 
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './login.css';

function Login() {
  const [responseMessage, setResponseMessage] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await API.post("/api/accounts/login/", { email, password });
      saveTokens(res.data);
      setResponseMessage("Login successful!");
      console.log("Login response:", res.data);
      // navigate("/dashboard");
    } catch (err) {
       console.error(err);
      setResponseMessage("Login failed");
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col>
            <h2 className="text">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="btn btn-success w-100">
                Login 
              </Button>
              <Button variant="secondary" className="btn btn-secondary w-100 mt-2" onClick={goToSignup}>
                click here to go to signup page
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <p>{responseMessage}</p>
    </>
  );
}

export default Login;
