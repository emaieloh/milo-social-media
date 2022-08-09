import React, { useContext } from "react";
import MyContext from "../MyContext";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavigationBar = ({ user }) => {
  const { setIsLoggedIn } = useContext(MyContext);

  const signOut = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <Navbar
      className="px-5"
      bg="primary"
      variant="dark"
      expand="md"
      fixed="top"
      collapseOnSelect
    >
      <Navbar.Brand>Welcome {user.firstName}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link className="nav-item">All posts</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create-post">
            <Nav.Link className="nav-item">Create post</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <Nav.Link className="nav-item" onClick={signOut}>
            Sign out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
