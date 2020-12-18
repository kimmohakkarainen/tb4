import * as api from "../api";

export function getPreview({
  beginDate,
  endDate,
  doctorFilter,
  examinationFilter
}) {
  return dispatch => {
    api
      .getPreview({
        beginDate,
        endDate,
        doctorFilter,
        examinationFilter
      })
      .then(resp => {
        dispatch(fetchPreviewSucceeded(resp.data));
      });
  };
}


export function fetchPreviewSucceeded(data) {
  return {
    type: "FETCH_PREVIEW_SUCCEEDED",
    payload: data
  };
}


export function getExcel({
	  beginDate,
	  endDate,
	  doctorFilter,
	  examinationFilter
	}) {
	  return dispatch => {
		    api
		      .getExcel({
		        beginDate,
		        endDate,
		        doctorFilter,
		        examinationFilter
		      });
	  };
}

