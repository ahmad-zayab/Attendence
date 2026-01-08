import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './signup.css';
import axios from "axios";
import API from '../services/api';
function Signup() {
    const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [responseMessage, setResponseMessage] = useState("");
    const [role, setRole] = useState("EMPLOYEE");
  const navigate = useNavigate();
 const goToLogin = () => {
    navigate("/"); 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, full_name, password, role };
       await API.post("/api/accounts/register/", payload);
      setResponseMessage("Signup successful! Please login.");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      setResponseMessage("Error creating account");
    }
  };
  return (
    <>
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col>
          <h2 className="text">Signup</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
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
            <Form.Group className="mb-3" >
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              </Form.Group>

            <Button variant="primary" type="submit" className="btn btn-success w-100">
              Signup
            </Button>
            <Button variant="secondary" className="btn btn-secondary w-100 mt-2" onClick={goToLogin}>
                          click her to go to login
          </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    <p>{responseMessage}</p>
    </>
  );
}
export default Signup;