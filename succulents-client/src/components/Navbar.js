import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  Collapse,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button
} from "reactstrap";
import styled from "styled-components";
import SearchModal from "./SearchModal";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDropDownOpen: false,
      category: []
    };
  }

  componentDidMount() {
    fetch("/api/categories")
      .then(response => response.json())
      .then(response => {
        this.setState({
          category: response
        });
      })
      .catch(err => console.log("error:" + err));
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  onMouseEnter_DropDown = () => {
    this.setState({
      isDropDownOpen: true
    });
  };
  onMouseLeave_DropDown = () => {
    this.setState({
      isDropDownOpen: false
    });
  };
  dropdownToggle = () => {
    console.log("dropdowntoggle");
    window.location = "/collections";
  };
  render() {
    return (
      <Navbar color="light" light expand="lg" className="mb-1 text-capitialize">
        <NavbarBrand className="mr-4" href="/">
          <ImgNavbar
            src={process.env.PUBLIC_URL + "/images/logo-small1.png"}
            alt="React Bootstrap logo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle}></NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <Dropdown
              className="nav-item dropdown"
              onMouseOver={this.onMouseEnter_DropDown}
              onMouseLeave={this.onMouseLeave_DropDown}
              isOpen={this.state.isDropDownOpen}
              toggle={this.dropdownToggle}
              nav
            >
              <DropdownToggle nav>Products</DropdownToggle>
              {/* {this.state.category.length > 0 && ( */}
              <DropdownMenu
                style={{
                  border: "none"
                }}
              >
                {this.state.category.map((item, index) => (
                  <DropdownItem
                    className="specialHover"
                    href={"/collections/" + item}
                    key={index}
                  >
                    {item}
                  </DropdownItem>
                ))}
              </DropdownMenu>
              {/* )} */}
            </Dropdown>

            <NavItem>
              <NavLink href="/">About us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Gallery</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto align-items-center" navbar>
            <NavItem>
              <NavLink href="/cart">
                <i
                  className="fa fa-cart-plus"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <SearchModal classNameCss={"nav-link"} />
              {/* <i className="fa fa-search" style={{ fontSize: "1.3rem" }}></i> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
const ImgNavbar = styled.img`
  width: 5em;
  align: center;
  display: inline-block;
`;
const SpanStyled = styled.span`
  &:hover {
    cursor: pointer;
    background-color: red;
  }
`;
export default AppNavbar;
