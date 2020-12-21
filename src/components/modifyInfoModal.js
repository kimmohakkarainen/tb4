import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import {
	Modal,
  Panel,
  Button,
  ToggleButton,
  ButtonToolbar,
  ToggleButtonGroup,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup,
  DropdownButton,
  MenuItem,
  HelpBlock,
  Table
} from "react-bootstrap";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";

import { createTask, postCreate } from "../actions";

class ModifyInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state =Object.assign({}, this.props.task);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      console.log(this.state);
      this.props.dispatch(this.state);
  }

  render() {
    return (
      <div>
      	<Modal.Header closeButton>
      	<Modal.Title>Muokkaa lisätietoja</Modal.Title>
      	</Modal.Header>
      	<Modal.Body>
        <FormGroup>
          <ControlLabel>Henkilötunnus</ControlLabel>
          <FormControl readOnly
            type="text"
            value={this.state.hetu}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Sukunimi</ControlLabel>
          <FormControl readOnly
            type="text" 
            value={this.state.sukunimi}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Tutkimus</ControlLabel>
          <FormControl type="text" readOnly value={this.state.tutkimus.label} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Lisätiedot</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Tähän mahdolliset lisätiedot"
            value={this.state.lisatiedot}
            onChange={e => {
              this.setState({ lisatiedot: e.target.value });
            }}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Viesti lääkäriltä</ControlLabel>
          <FormControl componentClass="textarea" readOnly value={this.state.viesti} />
        </FormGroup>

        </Modal.Body>
        <Modal.Footer>
        	<Button bsStyle="primary" onClick={this.handleClick}>Talleta</Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default ModifyInfoModal;