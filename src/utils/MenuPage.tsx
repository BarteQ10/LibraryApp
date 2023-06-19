import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import jwt_decode from "jwt-decode";

const MenuPage: React.FC = () => {
  let token = localStorage.getItem("token");
  const decodedToken: any = jwt_decode(token || "");
  const role =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <div className="container-fluid">
          <Navbar.Brand href="/" className="gradientLogo">
            Navbar
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarTogglerDemo02" />
          <Navbar.Collapse id="navbarTogglerDemo02">
            {role === "Admin" || role === "Librarian" ? (
              <Nav className="me-auto">
                <Nav.Link href="/admin/books">Books</Nav.Link>
                <Nav.Link href="/loans">Loans</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <Nav.Link href="/books">Books</Nav.Link>
                <Nav.Link href="/loans">Loans</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default MenuPage;
