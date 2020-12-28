import React, { useReducer } from "react";
import ReactDOM from "react-dom";

import {
  Modal,
  Button,
  ToggleButton,
  ButtonToolbar,
  ToggleButtonGroup,
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
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
        hetuValid: payload.length === 11 ? true : false
      };

    case "SET_SUKUNIMI":
      return {
        ...state,
        sukunimi: payload,
        sukunimiValid: payload.length > 1 ? true : false
      };

    case "SET_ESITIETOLOMAKE":
      return {
        ...state,
        esitietolomake: payload,
        esitietolomakeValid: payload.length > 3 ? true : false
      };

    case "SET_LISATIEDOT":
      return {
        ...state,
        lisatiedot: payload
      };

    case "SET_LAAKARI":
      return {
        ...state,
        laakari: payload
      };

    case "SET_TUTKIMUS":
      console.log("SET_TUTKIMUS");
      console.log(payload);
      return {
        ...state,
        tutkimus: payload,
        tutkimusValid: payload == null ? false : true
      };

    case "TOGGLE_ESITIETOLOMAKE":
      return {
        ...state,
        esitietolomakeExpanded: !state.esitietolomakeExpanded,
        esitietolomakeValid: state.esitietolomakeExpanded ? true : false,
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
        return {
          ...state,
          tutkimusPaivaValid: state.tutkimusPaivaValid ? true : false,
          hetuValid: state.hetuValid ? true : false,
          sukunimiValid: state.sukunimiValid ? true : false,
          tutkimusValid: state.tutkimusValid ? true : false,
          esitietolomakeValid: state.esitietolomakeValid ? true : false
        };
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

export default function CreateTaskModel({
  callback,
  examinationOptions,
  doctorOptions
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleHetu(v) {
    dispatch({ type: "SET_HETU", payload: v.target.value });
  }

  function handleSukunimi(v) {
    dispatch({ type: "SET_SUKUNIMI", payload: v.target.value });
  }

  function handleLisatiedot(v) {
    dispatch({ type: "SET_LISATIEDOT", payload: v.target.value });
  }

  function handleLaakari(v) {
    dispatch({ type: "SET_LAAKARI", payload: v.target.value });
  }

  function handleTutkimus(v) {
    dispatch({ type: "SET_TUTKIMUS", payload: v.target.value });
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
        <FormGroup>
          <FormLabel>Tutkimuspäivä</FormLabel>
          <DayPickerInput
            className="form-control"
            value={state.tutkimusPaiva}
            format={DAY_FORMAT}
            placeholder={DAY_FORMAT}
            formatDate={formatDate}
            parseDate={parseDate}
            onDayChange={handleTutkimusPaivaChange}
            dayPickerProps={dayPickerProps}
            isValid={state.tutkimusPaivaValid}
          />
          <FormText className="text-muted">Syötä tähän tutkimuspäivä</FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel>Henkilötunnus</FormLabel>
          <FormControl
            type="text"
            placeholder="000000-0000"
            value={state.hetu}
            onChange={handleHetu}
            isValid={state.hetuValid}
            isInvalid={state.hetuValid === false}
          />
          <FormText className="text-muted">
            Syötä tähän henkilön sosiaaliturvatunnus
          </FormText>
        </FormGroup>

        <FormGroup>
          <FormLabel>Sukunimi</FormLabel>
          <FormControl
            type="text"
            placeholder="Sukunimi"
            value={state.sukunimi}
            onChange={handleSukunimi}
            isValid={state.sukunimiValid}
            isInvalid={state.sukunimiValid === false}
          />
          <FormText className="text-muted">
            Syötä tähän henkilön sukunimi
          </FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel>Tutkimus</FormLabel>
          <FormControl
            as="select"
            placeholder="(Valitse)"
            value={state.tutkimus}
            onChange={handleTutkimus}
            isValid={state.tutkimusValid}
            isInvalid={state.tutkimusValid === false}
          >
            <option key={null} value={null} disabled={true}></option>
            {examinationOptions.map(function (option) {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Vastaanottopäivä</FormLabel>
          <DayPickerInput
            className="form-control"
            value={state.vastaanottoPaiva}
            format={DAY_FORMAT}
            placeholder={DAY_FORMAT}
            formatDate={formatDate}
            parseDate={parseDate}
            onDayChange={handleVastaanottoPaivaChange}
            dayPickerProps={dayPickerProps}
            isValid={state.vastaanottoPaivaValid}
          />
          <FormText className="text-muted">Syötä tähän tutkimuspäivä</FormText>
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
          <FormGroup>
            <FormLabel>Esitietolomakkeen tiedostonimi</FormLabel>
            <FormControl
              type="text"
              placeholder="Esitietolomakkeen tiedostonimi"
              value={state.esitietolomake}
              onChange={handleEsitietolomake}
              isValid={state.esitietolomakeValid}
              isInvalid={state.esitietolomakeValid === false}
            />
            <FormText className="text-muted">
              Syötä esitietolomakkeen tiedostonimi
            </FormText>
          </FormGroup>
        )}

        <FormGroup>
          <FormLabel>Lisätiedot</FormLabel>
          <FormControl
            type="textarea"
            placeholder="Tähän mahdolliset lisätiedot"
            value={state.lisatiedot}
            onChange={handleLisatiedot}
          />
          <FormText className="text-muted">
            Syötä tähän mahdolliset lisätiedot
          </FormText>
        </FormGroup>

        <FormGroup>
          <FormLabel>Lääkäri</FormLabel>
          <FormControl
            as="select"
            placeholder="(Valitse)"
            value={state.laakari}
            onChange={(event) => {
              handleLaakari(event);
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
          <FormText className="text-muted">
            Syötä tähän arvioiva lääkäri
          </FormText>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClick}>
          Talleta
        </Button>
      </Modal.Footer>
    </div>
  );
}
