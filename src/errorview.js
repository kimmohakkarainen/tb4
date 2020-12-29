import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { fetchState } from "./actions";
import { Modal, Button } from "react-bootstrap";

function ErrorView({ errorModal, fetchState }) {
  return (
    <div>
      {errorModal != null && (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Virhe</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorModal}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => fetchState()}>
              OK
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    errorModal: state.errorModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchState: () => dispatch(fetchState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorView);
