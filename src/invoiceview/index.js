import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Container, Row } from "react-bootstrap";

import { getPreview, getExcel } from "../actions";

import moment from "moment";

import ErrorView from "../errorview";

function InvoiceView({
  person,
  errorModal,
  beginDate,
  endDate,
  doctorOptions,
  doctorFilter,
  examinationOptions,
  examinationFilter,
  preview,

  getPreview,
  getExcel
}) {
  useEffect(() => {
    getPreview({
      beginDate: null,
      endDate: null,
      doctorFilter: [],
      examinationFilter: []
    });
  }, [getPreview]);

  return (
    <div className="billingContainer">
      <ErrorView />
      <Container>
        <Row>
          <h2>Laskutus</h2>
        </Row>
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    person: state.person,
    errorModal: state.errorModal,
    beginDate: state.invoice.beginDate,
    endDate: state.invoice.endDate,
    doctorOptions: state.doctorOptions,
    doctorFilter: state.invoice.doctorFilter,
    examinationOptions: state.examinationOptions,
    examinationFilter: state.invoice.examinationFilter,
    preview: state.invoice.preview
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPreview: (params) => dispatch(getPreview(params)),
    getExcel: (params) => dispatch(getExcel(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceView);
