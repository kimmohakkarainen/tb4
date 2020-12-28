import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  Modal,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Row
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
          <FormLabel>Tutkimuspäivä</FormLabel>
          <FormControl readOnly defaultValue={tutkimusPaiva} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Henkilötunnus</FormLabel>
          <FormControl plaintext readOnly defaultValue={hetu} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Sukunimi</FormLabel>
          <FormControl plaintext readOnly defaultValue={sukunimi} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Tutkimus</FormLabel>
          <FormControl plaintext readOnly defaultValue={tutkimus} />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClick}>
          OK
        </Button>
      </Modal.Footer>
    </div>
  );
}
