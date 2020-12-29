import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Container,
  Row,
  Col,
  Card,
  FormGroup,
  FormLabel,
  FormControl,
  FormText
} from "react-bootstrap";

import { getPreview, getExcel } from "../actions";

import moment from "moment";
import momentLocalizer from "react-widgets-moment";

import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";

import ErrorView from "../errorview";
import PreviewTable from "./previewtable";
import TimeRange from "./timerange";

const DAY_FORMAT = "D.M.YYYY";

moment.locale("fi");
momentLocalizer();

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

  function handleTimeRangeChange({ begin, end }) {
    console.log("handleTimeRangeChange");
    console.log(begin);
    console.log(end);
  }

  function handleEndDayChange(selectedDay, modifiers) {}

  const formattedBeginDay = beginDate
    ? moment(beginDate).format(DAY_FORMAT)
    : "";
  const formattedEndDay = endDate ? moment(endDate).format(DAY_FORMAT) : "";

  const begin = moment(beginDate).toDate();
  const end = moment(endDate).toDate();

  const dayPickerProps = {
    locale: "fi",
    localeUtils: MomentLocaleUtils
  };

  const data = preview == null ? [] : preview;
  console.log(data);

  return (
    <Container>
      <ErrorView />
      <Card body>
        <strong>Laskutus</strong>
      </Card>
      <TimeRange begin={begin} end={end} onChange={handleTimeRangeChange} />
      <Card bg="light">
        <Card.Header>Laskutus</Card.Header>
        <Card.Body bg="white">
          <FormGroup>
            <Row>
              <Col sm={2}>
                <FormLabel>Alkupäivä</FormLabel>
              </Col>
              <Col sm={4}>
                <DayPickerInput
                  component={(props) => (
                    <input class="form-control" {...props} />
                  )}
                  value={formattedBeginDay}
                  onDayChange={handleEndDayChange}
                  format={DAY_FORMAT}
                  placeholder={DAY_FORMAT}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  dayPickerProps={dayPickerProps}
                />
              </Col>
              <Col sm={2}>
                <FormLabel>Loppupäivä</FormLabel>
              </Col>
              <Col sm={4}>
                <DayPickerInput
                  component={(props) => (
                    <input class="form-control" {...props} />
                  )}
                  value={formattedEndDay}
                  onDayChange={handleEndDayChange}
                  format={DAY_FORMAT}
                  placeholder={DAY_FORMAT}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  dayPickerProps={dayPickerProps}
                />
              </Col>
            </Row>
          </FormGroup>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Yhteenveto</Card.Header>
        <Card.Body>
          <PreviewTable preview={data} />
        </Card.Body>
      </Card>
    </Container>
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
