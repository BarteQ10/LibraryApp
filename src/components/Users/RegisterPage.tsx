import React, { useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { register } from "../../redux/authSlice";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { RootState, AppDispatch } from "../../redux/store"; // zaimportuj RootState i AppDispatch
const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>(); // uzyj AppDispatch zamiast ThunkDispatch
  const error = useSelector((state: RootState) => state.auth.error);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(register({ email, password, confirmPassword }));
  };

  return (
    <div className="gradient-background min-vh-100">
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100 loginModal">
          <Col xs={12} md={8} lg={6} xl={5}>
            <div
              className="card bg-secondary text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>
                  {error && <p className="text-danger">{error}</p>}
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

                  <Form.Group className="form-outline form-white mb-4">
                    <Form.Control
                      type="password"
                      id="typePasswordConfirmX"
                      className="form-control form-control-lg"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Form.Label htmlFor="typePasswordConfirmX">
                      Confirm Password
                    </Form.Label>
                  </Form.Group>

                  <Button
                    className="btn bg-info btn-lg px-5"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
