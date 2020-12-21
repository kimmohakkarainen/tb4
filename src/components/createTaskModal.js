import React, { useReducer } from "react";
import ReactDOM from "react-dom";

import {
  Modal,
  Button,
  ToggleButton,
  ButtonToolbar,
  ToggleButtonGroup,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";

function reducer(state, action) {
  const payload = action.payload;

  switch (action.type) {
    case "SET_HETU":
      return {
        ...state,
        hetu: payload,
        hetuValid: payload.length === 11 ? "success" : "error"
      };

    case "SET_SUKUNIMI":
      return {
        ...state,
        sukunimi: payload,
        sukunimiValid: payload.length > 1 ? "success" : "error"
      };

    case "SET_ESITIETOLOMAKE":
      return {
        ...state,
        esitietolomake: payload,
        esitietolomakeValid: payload.length > 3 ? "success" : "error"
      };

    case "TOGGLE_ESITIETOLOMAKE":
      return {
        ...state,
        esitietolomakeExpanded: !state.esitietolomakeExpanded,
        esitietolomakeValid: expanded ? null : true,
        esitietolomake: ""
      };

    case "SET_TUTKIMUSPAIVA":
      if (payload === undefined) {
        return state;
      } else {
        return {
          ...state,
          tutkimusPaiva: payload,
          tutkimusPaivaValid: "success"
        };
      }

    case "SET_VASTAANOTTOPAIVA":
      if (payload === undefined) {
        return state;
      } else {
        return {
          ...state,
          vastaanottoPaiva: payload,
          vastaanottoPaivaValid: "success"
        };
      }

    case "CONFIRM":
      if (
        state.tutkimusPaivaValid === "success" &&
        state.hetuValid === "success" &&
        state.sukunimiValid === "success" &&
        state.tutkimusValid === "success" &&
        state.esitietolomakeValid === "success"
      ) {
        const params = {
          taskId: null,
          hetu: this.state.hetu,
          sukunimi: this.state.sukunimi,
          tutkimus: { value: this.state.tutkimus },
          tutkimusPaiva: this.state.tutkimusPaiva,
          vastaanottoPaiva: this.state.vastaanottoPaiva,
          lisatiedot: this.state.lisatiedot,
          esitietolomake: this.state.esitietolomake,
          laakari: { value: this.state.laakari }
        };
        action.payload.dispatch(params);
        return state;
      } else {
        return state;
      }
    default:
      console.log(" NOT MATCHED " + action.type);
  }
}

const initialState = {
  validation: false,
  hetu: "",
  hetuValid: null,
  sukunimi: "",
  sukunimiValid: null,
  tutkimus: "",
  tutkimusValid: null,
  tutkimusPaiva: "",
  tutkimusPaivaValid: null,
  vastaanottoPaiva: "",
  vastaanottoPaivaValid: null,
  esitietolomake: "",
  esitietolomakeValid: null,
  esitietolomakeExpanded: false,
  lisatiedot: "",
  laakari: ""
};

export default function CreateTaskModel(
  callback,
  examinationOptions,
  doctorOptions
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleHetu(v) {
    dispatch({ type: "SET_HETU", payload: v.target.value });
  }

  function handleSukunimi(v) {
    dispatch({ type: "SET_SUKUNIMI", payload: v.target.value });
  }

  function handleEsitietolomake(v) {
    dispatch({ type: "SET_ESITIETOLOMAKE", payload: v.target.value });
  }

  function handleEsitietolomakeToggle() {
    dispatch({ type: "TOGGLE_ESITIETOLOMAKE", payload: null });
  }

  function handleTutkimusPaivaChange(selectedDay, modifiers) {
    dispatch({ type: "SET_TUTKIMUSPAIVA", payload: selectedDay });
  }

  function handleVastaanottoPaivaChange(selectedDay, modifiers) {
    dispatch({ type: "SET_VASTAANOTTOPAIVA", payload: selectedDay });
  }

  function handleClick() {
    dispatch({ type: "CONFIRM", payload: callback });
  }

  const DAY_FORMAT = "D.M.YYYY";
  const dayPickerProps = {
    locale: "fi",
    localeUtils: MomentLocaleUtils
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Uusi lausuttava</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup validationState={state.tutkimusPaivaValid}>
          <ControlLabel>Tutkimuspäivä</ControlLabel>
          <div className="form-control">
            <DayPickerInput
              value={state.tutkimusPaiva}
              format={DAY_FORMAT}
              placeholder={DAY_FORMAT}
              formatDate={formatDate}
              parseDate={parseDate}
              onDayChange={handleTutkimusPaivaChange}
              dayPickerProps={dayPickerProps}
            />
          </div>
        </FormGroup>
        <FormGroup validationState={state.hetuValid}>
          <ControlLabel>Henkilötunnus</ControlLabel>
          <FormControl
            type="text"
            placeholder="000000-0000"
            value={state.hetu}
            onChange={handleHetu}
          />
          {false && (
            <HelpBlock>Syötä tähän henkilön sosiaaliturvatunnus</HelpBlock>
          )}
        </FormGroup>
        <FormGroup validationState={state.sukunimiValid}>
          <ControlLabel>Sukunimi</ControlLabel>
          <FormControl
            type="text"
            placeholder="Sukunimi"
            value={state.sukunimi}
            onChange={handleSukunimi}
          />
          {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={state.tutkimusValid}>
          <ControlLabel>Tutkimus</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="(Valitse)"
            value={state.tutkimus}
            onChange={(event) => {
              this.setState({
                tutkimus: event.target.value,
                tutkimusValid: "success"
              });
            }}
          >
            {examinationOptions.map(function (option) {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </FormControl>
          {false && <HelpBlock>Syötä tähän tutkimusmuoto</HelpBlock>}
        </FormGroup>
        <FormGroup validationState={state.vastaanottoPaivaValid}>
          <ControlLabel>Vastaanottopäivä</ControlLabel>
          <div className="form-control">
            <DayPickerInput
              value={state.vastaanottoPaiva}
              format={DAY_FORMAT}
              placeholder={DAY_FORMAT}
              formatDate={formatDate}
              parseDate={parseDate}
              onDayChange={handleVastaanottoPaivaChange}
              dayPickerProps={dayPickerProps}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <ToggleButtonGroup
              style={{ zIndex: 0 }}
              type="radio"
              name="options"
              defaultValue={1}
              onChange={handleEsitietolomakeToggle}
            >
              <ToggleButton value={1}>
                Esitietolomaketta ei ole täytetty
              </ToggleButton>
              <ToggleButton value={2}>Esitietolomake on täytetty</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </FormGroup>
        {state.esitietolomakeExpanded && (
          <FormGroup validationState={state.esitietolomakeValid}>
            <ControlLabel>Esitietolomakkeen tiedostonimi</ControlLabel>
            <FormControl
              type="text"
              placeholder="Esitietolomakkeen tiedostonimi"
              value={state.esitietolomake}
              onChange={handleEsitietolomake}
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
            value={state.lisatiedot}
            onChange={(e) => {
              this.setState({ lisatiedot: e.target.value });
            }}
          />
          {false && <HelpBlock>Syötä tähän henkilön sukunimi</HelpBlock>}
        </FormGroup>
        <FormGroup>
          <ControlLabel>Lääkäri</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="(Valitse)"
            value={state.laakari}
            onChange={(event) => {
              this.setState({ laakari: event.target.value });
            }}
          >
            <option key={null} value={null}></option>
            {doctorOptions.map(function (option) {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </FormControl>
          {false && <HelpBlock>Syötä tähän arvioiva lääkäri</HelpBlock>}
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={handleClick}>
          Talleta
        </Button>
      </Modal.Footer>
    </div>
  );
}
