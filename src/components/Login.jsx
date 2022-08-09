import React, { useState, useContext } from "react";
import MyContext from "../MyContext";
import { Container, Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Registration from "./Registration";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAlert, setUserAlert] = useState(false);
  const [userError, setUserError] = useState("");
  const [registrationModal, setRegistrationModal] = useState(false);

  const { setIsLoggedIn, setUser } = useContext(MyContext);

  const navigate = useNavigate();
  const showModal = () => setRegistrationModal(true);
  const hideModal = () => setRegistrationModal(false);

  const submitLogin = async (e) => {
    e.preventDefault();
    const { data: user } = await axios.post(
      "https://milo-social-media.herokuapp.com/users/signin",
      {
        email,
        password,
      }
    );
    if (user.error) {
      setUserError(user.error);
      setUserAlert(true);
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
      setUser(user);
      navigate("/", { replace: true });
    }
  };

  return (
    <Container
      id="login"
      className="d-flex align-items-center justify-content-center"
    >
      <Form onSubmit={submitLogin} className="w-100">
        <Alert
          show={userAlert}
          variant="danger"
          onClose={() => setUserAlert(false)}
          dismissible
        >
          <div>{userError}</div>
        </Alert>
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
        <div className="d-grid gap-2">
          <Button type="submit" size="lg">
            Sign in
          </Button>
        </div>
        <div className="text-center">
          <Button
            type="button"
            variant="success"
            size="lg"
            className="px-5"
            onClick={showModal}
          >
            Sign up
          </Button>
        </div>
      </Form>
      <Registration
        registrationModal={registrationModal}
        hideModal={hideModal}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
    </Container>
  );
};

export default Login;
