import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

export default function DeleteTaskModal({ task, dispatch }) {
  function handleClick() {
    dispatch(task);
  }

  console.log("DeleteTaskModal ");
  console.log(task);
  const hetu = task == null ? "" : task.hetu;
  const tutkimusPaiva = task == null ? "" : task.tutkimusPaiva;
  const sukunimi = task == null ? "" : task.sukunimi;
  const tutkimus = task == null ? "" : task.tutkimus.label;
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Poista lausuttava</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <ControlLabel>Tutkimuspäivä</ControlLabel>
          <FormControl.Static>{tutkimusPaiva}</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Henkilötunnus</ControlLabel>
          <FormControl.Static>{hetu}</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Sukunimi</ControlLabel>
          <FormControl.Static>{sukunimi}</FormControl.Static>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Tutkimus</ControlLabel>
          <FormControl.Static>{tutkimus}</FormControl.Static>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={this.handleClick}>
          OK
        </Button>
      </Modal.Footer>
    </div>
  );
}
