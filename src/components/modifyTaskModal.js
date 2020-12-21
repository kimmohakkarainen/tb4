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

class ModifyTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.clearValues(props.task);
    this.handleClick = this.handleClick.bind(this);
    this.handleTutkimusPaivaChange = this.handleTutkimusPaivaChange.bind(this);
    this.handleVastaanottoPaivaChange = this.handleVastaanottoPaivaChange.bind(this);
    this.handleHetu = this.handleHetu.bind(this);
    this.handleSukunimi = this.handleSukunimi.bind(this);
    this.handleEsitietolomake = this.handleEsitietolomake.bind(this);
    this.handleEsitietolomakeToggle = this.handleEsitietolomakeToggle.bind(
      this
    );
  }

  clearValues(task) {
    return {
      taskId: task.taskId,
      version: task.version,
      validation: false,
      hetu: task.hetu == null ? '' : task.hetu,
      hetuValid: "success",
      sukunimi: task.sukunimi == null ? '' : task.sukunimi,
      sukunimiValid:"success",
      tutkimus: task.tutkimus == null ? null : task.tutkimus.value ,
      tutkimusValid: "success",
      tutkimusPaiva: task.tutkimusPaiva == null ? '' : task.tutkimusPaiva,
      tutkimusPaivaValid: "success",
      vastaanottoPaiva: task.vastaanottoPaiva == null ? '' : task.vastaanottoPaiva,
      vastaanottoPaivaValid: null,
      esitietolomake: task.esitietolomake == null ? '' : task.esitietolomake,
      esitietolomakeValid: "success",
      esitietolomakeExpanded:
        task.esitietolomake != null && task.esitietolomake.length > 0,
      lisatiedot: task.lisatiedot == null ? '' : task.lisatiedot,
      laakari: task.laakari == null ? '' : task.laakari.value
    };
  }

  handleHetu(v) {
    const value = v.target.value;
    const valid = value.length === 11 ? "success" : "error";
    this.setState({
      hetu: value,
      hetuValid: valid
    });
  }

  handleSukunimi(v) {
    const value = v.target.value;
    const valid = value.length > 1 ? "success" : "error";
    this.setState({
      sukunimi: value,
      sukunimiValid: valid
    });
  }

  handleEsitietolomake(v) {
    const value = v.target.value;
    const valid = value.length > 3 ? "success" : "error";
    this.setState({
      esitietolomake: value,
      esitietolomakeValid: valid
    });
  }

  handleEsitietolomakeToggle() {
    const expanded = !this.state.esitietolomakeExpanded;
    const valid = expanded ? null : true;

    this.setState({
      esitietolomakeExpanded: expanded,
      esitietolomakeValid: valid,
      esitietolomake: ""
    });
  }
  
  handleTutkimusPaivaChange(selectedDay, modifiers) {
	  if (selectedDay == undefined) {
	       // ignore
	  } else {
		  this.setState({
			  tutkimusPaiva: selectedDay,
			  tutkimusPaivaValid: "success"
          });
	  }
  }

  handleVastaanottoPaivaChange(selectedDay, modifiers) {
	  if (selectedDay == undefined) {
	       // ignore
	  } else {
		  this.setState({
			  vastaanottoPaiva: selectedDay,
			  vastaanottoPaivaValid: "success"
          });
	  }
  }


  handleClick() {
    const tutkimusPaivaValid =
      this.state.tutkimusPaivaValid == null
        ? "error"
        : this.state.tutkimusPaivaValid;
    const hetuValid =
      this.state.hetuValid == null ? "error" : this.state.hetuValid;
    const sukunimiValid =
      this.state.sukunimiValid == null ? "error" : this.state.sukunimiValid;
    const tutkimusValid =
      this.state.tutkimusValid == null ? "error" : this.state.tutkimusValid;
    const esitietolomakeValid = this.state.esitietolomakeExpanded
      ? this.state.esitietolomakeValid == null
        ? "error"
        : this.state.esitietolomakeValid
      : "success";

    if (
      tutkimusPaivaValid === "success" &&
      hetuValid === "success" &&
      sukunimiValid === "success" &&
      tutkimusValid === "success" &&
      esitietolomakeValid === "success"
    ) {
      const parms = {
          taskId: this.state.taskId,
          version: this.state.version,
          hetu: this.state.hetu,
          sukunimi: this.state.sukunimi,
          tutkimus: {value : this.state.tutkimus },
          tutkimusPaiva: this.state.tutkimusPaiva,
          vastaanottoPaiva: this.state.vastaanottoPaiva,
          lisatiedot: this.state.lisatiedot,
          esitietolomake: this.state.esitietolomake,
          laakari: { value: this.state.laakari }
        };
      this.props.dispatch(parms);
    } else {
      this.setState({
        tutkimusPaivaValid: tutkimusPaivaValid,
        hetuValid: hetuValid,
        sukunimiValid: sukunimiValid,
        tutkimusValid: tutkimusValid,
        esitietolomakeValid: esitietolomakeValid
      });
    }
  }

  render() {
    const DAY_FORMAT = "D.M.YYYY";
    const dayPickerProps = {
    	      locale: "fi",
    	      localeUtils: MomentLocaleUtils
    };

    return (
      <div>
      	<Modal.Header closeButton>
      	<Modal.Title>Muokkaa lausuttavaa</Modal.Title>
      	</Modal.Header>
      	<Modal.Body>
        <FormGroup validationState={this.state.tutkimusPaivaValid}>
          <ControlLabel>Tutkimuspäivä</ControlLabel>
          <div className="form-control">
          <DayPickerInput
          	value={this.state.tutkimusPaiva}
          	format={DAY_FORMAT} placeholder={DAY_FORMAT}
          	formatDate={formatDate} parseDate={parseDate}
          	onDayChange={this.handleTutkimusPaivaChange}
          	dayPickerProps={dayPickerProps} />
          </div>
        </FormGroup>
        <FormGroup validationState={this.state.hetuValid}>
          <ControlLabel>Henkilötunnus</ControlLabel>
          <FormControl
            type="text"
            placeholder="000000-0000"
            value={this.state.hetu}
            onChange={this.handleHetu}
          />
          {false && (
            <HelpBlock>Syötä tähän henkilön sosiaaliturvatunnus</HelpBlock>
          )}
        </FormGroup>
        <FormGroup validationState={this.state.sukunimiValid}>
          <ControlLabel>Sukunimi</ControlLabel>
          <FormControl
            type="text"
            placeholder="Sukunimi"
            value={this.state.sukunimi}
            onChange={this.handleSukunimi}
          />
          {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={this.state.tutkimusValid}>
          <ControlLabel>Tutkimus</ControlLabel>
          <FormControl componentClass="select" 
        	  value={this.state.tutkimus}
          	  onChange={event => {this.setState({ tutkimus: event.target.value, tutkimusValid: "success"});}}
          >
          {this.props.examinationOptions.map(function (option) {
        	return (
        		<option key={option.value} value={option.value}>{option.label}</option>
        	);  
          })}
          </FormControl>
          {false && <HelpBlock>Syötä tähän tutkimusmuoto</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={this.state.vastaanottoPaivaValid}>
          <ControlLabel>Vastaanottopäivä</ControlLabel>
          <div className="form-control">
          <DayPickerInput
          	value={this.state.vastaanottoPaiva}
          	format={DAY_FORMAT} placeholder={DAY_FORMAT}
          	formatDate={formatDate} parseDate={parseDate}
          	onDayChange={this.handleVastaanottoPaivaChange}
          	dayPickerProps={dayPickerProps} />
          </div>
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <ToggleButtonGroup style={{zIndex: 0}}
              type="radio" name="options" defaultValue={this.state.esitietolomakeExpanded ? 2 : 1 }
              onChange={this.handleEsitietolomakeToggle} >
              <ToggleButton value={1}>
                Esitietolomaketta ei ole täytetty
              </ToggleButton>
              <ToggleButton value={2}>Esitietolomake on täytetty</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </FormGroup>
        
        {this.state.esitietolomakeExpanded && (
          <FormGroup validationState={this.state.esitietolomakeValid}>
            <ControlLabel>Esitietolomakkeen tiedostonimi</ControlLabel>
            <FormControl
              type="text"
              placeholder="Esitietolomakkeen tiedostonimi"
              value={this.state.esitietolomake}
              onChange={this.handleEsitietolomake}
            />
            {false && (
              <HelpBlock>Syötä esitietolomakkeen tiedostonimi</HelpBlock>
            )}
          </FormGroup>
        )}
        
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
          {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
        </FormGroup>
        
        <FormGroup >
        	<ControlLabel>Lääkäri</ControlLabel>
        	<FormControl componentClass="select" placeholder="(Valitse)"
        		value={this.state.laakari}
        	  onChange={event => {this.setState({ laakari: event.target.value});}} >
        	<option key={null} value={null}></option>
        {this.props.doctorOptions.map(function (option) {
      	return (
      		<option key={option.value} value={option.value}>{option.label}</option>
      	);  
        })}
        </FormControl>
        {false && <HelpBlock>Syötä tähän arvioiva lääkäri</HelpBlock>}
        </FormGroup>

      
        
        </Modal.Body>
        <Modal.Footer>
        	<Button bsStyle="primary" onClick={this.handleClick}>Talleta</Button>
        </Modal.Footer>
      </div>
    );
  }
}

export default ModifyTaskModal;