import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Form,
  FloatingLabel,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const Registration = (props) => {
  const { registrationModal, hideModal, setIsLoggedIn, setUser } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [registrationAlert, setRegistrationAlert] = useState(false);
  const [userError, setUserError] = useState("");

  const navigate = useNavigate();

  const submitRegistration = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordAlert(true);
    } else {
      const { data: user } = await axios.post(
        "http://localhost:8080/users/signup",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      if (user.error) {
        setUserError(user.error);
        setRegistrationAlert(true);
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        setUser(user);
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <Modal
      show={registrationModal}
      onHide={hideModal}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Alert
        show={registrationAlert}
        variant="danger"
        onClose={() => setRegistrationAlert(false)}
        dismissible
      >
        <div>{userError}</div>
      </Alert>
      <Form onSubmit={submitRegistration}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-2">
            <Col xs>
              <FloatingLabel
                controlId="floatingFirstNameGrid"
                label="First name"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col xs>
              <FloatingLabel controlId="floatingLastNameGrid" label="Last name">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel controlId="floatingEmail" label="Email">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingConfirmPassword"
            label="Confirm password"
          >
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FloatingLabel>
          <Alert
            show={passwordAlert}
            variant="danger"
            onClose={() => setPasswordAlert(false)}
            dismissible
          >
            <div>Passwords did not match</div>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Register</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Registration;
