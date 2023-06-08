import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const MenuPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <div className="container-fluid">
          <Navbar.Brand href="/" className='gradientLogo'>Navbar</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarTogglerDemo02" />
          <Navbar.Collapse id="navbarTogglerDemo02">
            <Nav className="me-auto">
              <Nav.Link href="/books">Books</Nav.Link>
              <Nav.Link href="/loans">Loans</Nav.Link>
              {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default MenuPage;