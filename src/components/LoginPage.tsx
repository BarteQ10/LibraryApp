import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Wywołanie akcji logowania
    dispatch(login({ email, password }));
    if (localStorage.getItem('token') === null) {
      alert('Błędne dane logowania');
    } else {
      alert('Zalogowano');
      navigate('/books');
    }
    // Przekierowanie do strony z książkami po zalogowaniu
  };
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  return (
    <section className="h-100 gradient-background">
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100 loginModal">
          <Col xs={12} md={8} lg={6} xl={5}>
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <Form.Group className="form-outline form-white mb-4">
                    <Form.Control
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Label htmlFor="typeEmailX">Email</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-outline form-white mb-4">
                    <Form.Control
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Label htmlFor="typePasswordX">Password</Form.Label>
                  </Form.Group>

                  <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                  <Button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleLogin}>
                    Login
                  </Button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                  </div>

                </div>

                <div>
                  <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                  </p>
                </div>

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LoginPage;