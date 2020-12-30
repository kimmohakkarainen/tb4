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
import { DateTimePicker } from "react-widgets";

const parseFormats = ["D.M.YYYY", "D.M.YY", "D.M"];

export default function TimeRange({ begin, end, onChange }) {
  return (
    <Card body>
      <Container>
        <Form.Group as={Row} controlId="begin">
          <Form.Label column sm="2">
            <strong>Alkupäivämäärä</strong>
          </Form.Label>
          <Col sm="4">
            <DateTimePicker
              time={false}
              value={begin}
              format="D.M.YYYY"
              parse={parseFormats}
              onChange={(value) => onChange({ begin: value })}
            />
          </Col>
          <Form.Label column sm="2">
            <strong>Loppupäivämäärä</strong>
          </Form.Label>
          <Col sm="4">
            <DateTimePicker
              time={false}
              value={end}
              format="D.M.YYYY"
              parse={parseFormats}
              onChange={(value) => onChange({ end: value })}
            />
          </Col>
        </Form.Group>
      </Container>
    </Card>
  );
}
