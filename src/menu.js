import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem
} from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

function Menu({ personName, role }) {
  console.log("Menu " + personName + " " + role);

  return (
    <Container>
      <Navbar
        sticky="top"
        collapseOnSelect
        bg="sata-light"
        variant="dark"
        expand="lg"
      >
        <Navbar.Brand>
          Tieto<sup>2</sup>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <IndexLinkContainer to="/">
              <Nav.Link href="/">Lausuttavat</Nav.Link>
            </IndexLinkContainer>
            {(role === "ADMIN" || role === "SECRETARY") && (
              <IndexLinkContainer to="/billing">
                <Nav.Link href="/billing">Laskutus</Nav.Link>
              </IndexLinkContainer>
            )}
            {role === "ADMIN" && (
              <IndexLinkContainer to="/admin/rights">
                <Nav.Link href="/admin/rights">Käyttöoikeudet</Nav.Link>
              </IndexLinkContainer>
            )}
            {role === "ADMIN" && (
              <IndexLinkContainer to="/admin/examinations">
                <Nav.Link href="/admin/examinations">Tutkimukset</Nav.Link>
              </IndexLinkContainer>
            )}
          </Nav>
          <Nav id="loggedUsr">
            <NavDropdown alignRight title={personName} id="user-dropdown">
              <IndexLinkContainer to="/password">
                <NavDropdown.Item>Vaihda salasana</NavDropdown.Item>
              </IndexLinkContainer>
              <NavDropdown.Divider />
              <IndexLinkContainer to="/logout">
                <NavDropdown.Item>Kirjaudu ulos</NavDropdown.Item>
              </IndexLinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default Menu;
