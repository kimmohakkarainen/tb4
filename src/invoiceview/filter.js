import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Row,
  Col,
  Form
} from "react-bootstrap";

import { Multiselect } from "react-widgets";

export default function Filter({
  doctorOptions,
  doctorFilter,
  examinationOptions,
  examinationFilter
}) {
  function onChange({ doctorFilter, examinationFilter }) {
    console.log("onChange");
    console.log(doctorFilter);
    console.log(examinationFilter);
  }

  return (
    <Card>
      <Card.Header>
        <strong>Filter</strong>
      </Card.Header>
      <Card.Body>
        <Container>
          <Form.Group as={Row} controlId="begin">
            <Form.Label column sm="3">
              <strong>Lääkäri</strong>
            </Form.Label>
            <Col sm="9">
              <Multiselect
                textField="label"
                value={doctorFilter}
                filter="contains"
                data={doctorOptions}
                onChange={(filter) =>
                  onChange({
                    doctorFilter: filter,
                    examinationFilter: examinationFilter
                  })
                }
              />
            </Col>
            <Form.Label column sm="3">
              <strong>tutkimus</strong>
            </Form.Label>
            <Col sm="9">
              <Multiselect
                textField="label"
                value={examinationFilter}
                filter="contains"
                data={examinationOptions}
                onChange={(filter) =>
                  onChange({
                    doctorFilter: doctorFilter,
                    examinationFilter: filter
                  })
                }
              />
            </Col>
          </Form.Group>
        </Container>
      </Card.Body>
    </Card>
  );
}
