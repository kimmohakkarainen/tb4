import * as api from "../api";

export function getPreview({
  beginDate,
  endDate,
  doctorFilter,
  examinationFilter
}) {
  return (dispatch) => {
    api
      .getPreview({
        beginDate,
        endDate,
        doctorFilter,
        examinationFilter
      })
      .then((resp) => {
        dispatch(fetchPreviewSucceeded(resp.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(invoiceError(error.toString()));
      });
  };
}

export function fetchPreviewSucceeded(data) {
  return {
    type: "FETCH_PREVIEW_SUCCEEDED",
    payload: data
  };
}

export function invoiceError(error) {
  return {
    type: "OPEN_ERROR_MODAL",
    payload: {
      errorModal: error,
      createTaskModal: false,
      modifyTaskModal: null,
      deleteTaskModal: null
    }
  };
}

export function getExcel({
  beginDate,
  endDate,
  doctorFilter,
  examinationFilter
}) {
  return (dispatch) => {
    api.getExcel({
      beginDate,
      endDate,
      doctorFilter,
      examinationFilter
    });
  };
}
