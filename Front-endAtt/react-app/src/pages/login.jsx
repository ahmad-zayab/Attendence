import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './login.css';
import Signup from './signup.jsx';
function Login() {
 const [responseMessage, setResponseMessage] = useState("");
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const navigate = useNavigate();
      const goToSignup = () => {
    navigate("/signup"); 
  };
    const handleSubmit = (event) => {
        event.preventDefault()
        const newPost = {
            email,
            password,
        };
        axios.post("https://jsonplaceholder.typicode.com//posts", newPost)
            .then((response) => {
                setResponseMessage("Login successful!");
                console.log("Response:", response);
            })
            .catch((err) => {
                setResponseMessage("Error creating post");
            });
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
              click her to go to signup page
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