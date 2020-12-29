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

export default function TimeRange({ begin, end, onChange }) {
  return (
    <Card>
      <Card.Header>
        <strong>Time Range</strong>
      </Card.Header>
      <Card.Body>
        <Container>
          <Form.Group as={Row} controlId="begin">
            <Form.Label column sm="2">
              <strong>Begin</strong>
            </Form.Label>
            <Col sm="4">
              <DateTimePicker
                time={false}
                value={begin}
                onChange={(begin) => onChange({ begin: begin, end: end })}
              />
            </Col>
            <Form.Label column sm="2">
              <strong>End</strong>
            </Form.Label>
            <Col sm="4">
              <DateTimePicker
                time={false}
                value={end}
                onChange={(end) => onChange({ begin: begin, end: end })}
              />
            </Col>
          </Form.Group>
        </Container>
      </Card.Body>
    </Card>
  );
}
