import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ButtonContainer } from "./Button";
import styled from "styled-components";
const SearchModal = props => {
  const { classNameCss } = props;
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState("");
  const handleModalClick = () => {
    toggle();
    var url = `/search?q=${input}`;
    window.location = url;
  };
  const handleTextChange = e => {
    setInput(e.target.value.substr(0, 20));
  };
  const toggle = () => setModal(!modal);
  return (
    <React.Fragment>
      <i
        className={`fa fa-search ${classNameCss}`}
        style={{ fontSize: "1.3rem" }}
        onClick={toggle}
      ></i>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Can we help find anything?</ModalHeader>
        <ModalBody
          className="mx-2 mt-1 mb-4"
          style={{ fontSize: "1.2rem", width: "80%" }}
        >
          <div className="row">
            <input
              type="text"
              placeholder="Enter Name"
              onChange={handleTextChange}
              className="col-10"
            />
            <ButtonModal onClick={handleModalClick}>Search</ButtonModal>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
const ButtonModal = styled.button`
  text-transform: capitalize;
  background: transparent;
  border: 0.05rem solid var(--mainYellow);
  color: var(--mainYellow);
  padding: 0.2rem 0.5rem;
  outline-color: red;
  cursor: pointer;
  display: inline-block;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: var(--mainYellow);
    color: var(--mainBlue);
  }
`;
export default SearchModal;
