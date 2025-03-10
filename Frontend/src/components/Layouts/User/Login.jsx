import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError('Please provide both email and password');
    }

    try {
      const response = await axios.post('http://localhost:3000/user/login', { email, password });

      // Save the JWT token (you can store it in localStorage or context)
      localStorage.setItem('authToken', response.data.token);

      setSuccess(response.data.msg);  // Show success message
      setError('');  // Reset any error message

      // Redirect to the homepage (or dashboard)
      setTimeout(() => {
        navigate('/details');
      }, 2000);
    } catch (err) {
      setError(err.response ? err.response.data.msg : 'Server error');
      setSuccess('');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="bg-light p-4 rounded shadow-sm">
            <h2 className="text-center mb-4">Login</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!error}  // Show error if any
                />
                <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!error}  // Show error if any
                />
                <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>

            <div className="text-center mt-3">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
