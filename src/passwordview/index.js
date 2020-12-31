import React, { useReducer, useEffect } from "react";
import { connect } from "react-redux";

import {
  Alert,
  Card,
  Container,
  Button,
  FormGroup,
  FormLabel,
  FormControl
} from "react-bootstrap";

import { postPassword } from "../actions";

import { initialState, passwordReducer } from "./passwordReducer";

function PasswordView({ person, passwordStatus, postPassword }) {
  const [state, dispatch] = useReducer(passwordReducer, initialState(null));

  function onSubmit() {
    if (
      state.currentPasswordValid &&
      state.newPasswordValid &&
      state.newPassword2Valid
    ) {
      const params = {
        oldPassword: state.currentPassword,
        password: state.newPassword,
        password2: state.newPassword2
      };

      postPassword(params);
    }
  }

  function ShowAlert({ passwordStatus }) {
    if (passwordStatus === 200) {
      return (
        <Alert show={true} variant="success">
          <Alert.Heading>Salasana vaihdettu onnistuneesti</Alert.Heading>
        </Alert>
      );
    } else if (passwordStatus != null) {
      return (
        <Alert show={true} variant="danger">
          <Alert.Heading>Salasanan vaihto epäonnistui</Alert.Heading>
        </Alert>
      );
    } else {
      return null;
    }
  }

  return (
    <Container>
      <ShowAlert passwordStatus={passwordStatus} />
      <Card>
        <Card.Header>
          <strong>Vaihda salasana</strong>
        </Card.Header>
        <Card.Body>
          <FormGroup controlId="formCurrentPassword">
            <FormLabel>Nykyinen salasana</FormLabel>
            <FormControl
              type="password"
              value={state.currentPassword}
              onChange={(e) => {
                dispatch({ currentPassword: e.target.value });
              }}
            />
          </FormGroup>
          <FormGroup controlId="formNewPassword">
            <FormLabel>Uusi salasana</FormLabel>
            <FormControl
              type="password"
              value={state.newPassword}
              isValid={state.newPasswordValid}
              isInvalid={state.newPasswordInvalid}
              onChange={(e) => {
                dispatch({ newPassword: e.target.value });
              }}
            />
            <FormControl.Feedback type="invalid">
              Salasanan tulee olla vähintään 6 merkin mittainen
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup controlId="formNewPassword2">
            <FormLabel>Toista uusi salasana</FormLabel>
            <FormControl
              type="password"
              value={state.newPassword2}
              isValid={state.newPassword2Valid}
              isInvalid={state.newPassword2Invalid}
              onChange={(e) => {
                dispatch({ newPassword2: e.target.value });
              }}
            />
            <FormControl.Feedback type="invalid">
              Salasanat eivät täsmää
            </FormControl.Feedback>
          </FormGroup>
          <Button
            onClick={onSubmit}
            variant="primary"
            disabled={
              !state.newPasswordValid ||
              !state.newPassword2Valid ||
              state.currentPasswordInvalid
            }
          >
            Vaihda
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    person: state.person,
    passwordStatus: state.passwordStatus
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    postPassword: (params) => dispatch(postPassword(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordView);
