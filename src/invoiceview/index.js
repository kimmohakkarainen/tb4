import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Button, Container, Card } from "react-bootstrap";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";

import { getPreview, getExcel } from "../actions";
import ErrorView from "../errorview";
import PreviewTable from "./previewtable";
import TimeRange from "./timerange";
import Filter from "./filter";

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

  function onChange({ begin, end, doctors, examinations }) {
    getPreview({
      beginDate: begin == null ? beginDate : moment(begin).format("YYYY-MM-DD"),
      endDate: end == null ? endDate : moment(end).format("YYYY-MM-DD"),
      doctorFilter: doctors == null ? doctorFilter : doctors,
      examinationFilter: examinations == null ? examinationFilter : examinations
    });
  }

  function onGetExcel() {
    getExcel({
      beginDate,
      endDate,
      doctorFilter,
      examinationFilter
    });
  }

  const begin = moment(beginDate).toDate();
  const end = moment(endDate).toDate();
  const data = preview == null ? [] : preview;
  console.log(data);

  return (
    <Container>
      <ErrorView />
      <Card body>
        <strong>Laskutus</strong>
      </Card>
      <TimeRange begin={begin} end={end} onChange={onChange} />
      <Filter
        doctorOptions={doctorOptions}
        doctorFilter={doctorFilter}
        examinationOptions={examinationOptions}
        examinationFilter={examinationFilter}
        onChange={onChange}
      />
      <Card body>
        <Button variant="primary" onClick={onGetExcel}>
          Tee lasku
        </Button>
      </Card>

      <PreviewTable preview={data} />
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
