import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { login } from '../redux/authSlice';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import Alert from '../utils/alerts/Alert';

type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

interface AlertObject {
  show: boolean,
  header: string,
  message: string,
  variant: AlertVariant,
};

const defaultAlert: AlertObject = {
  show: false,
  header: '',
  message: '',
  variant: 'primary',
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(defaultAlert);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = () => {
    setAlert({ show: true, header: 'Logowanie', message: 'Proszę czekać...', variant: 'info' });

    dispatch(login({ email, password }))
      .then((res) => {
        if (res.payload && res.payload.jwtToken) {
          setAlert({ ...defaultAlert, show: true, header: 'Sukces', message: 'Zalogowano pomyślnie!', variant: 'success' });
          navigate('/books');
        } else {
          setAlert({ ...defaultAlert, show: true, header: 'Błąd', message: 'Błędne dane logowania', variant: 'danger' });
        }
      })
      .catch((error) => {
        setAlert({ ...defaultAlert, show: true, header: 'Błąd', message: 'Błąd logowania', variant: 'danger' });
        console.error(error);
      });
  };
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  return (
    <section className="h-100 gradient-background">
       <Alert show={alert.show}
        header={alert.header}
        message={alert.message}
        variant={alert.variant}
        onClose={() => setAlert({...alert, show: false})}  
      />
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