import * as api from "../api";

export function getUsers({ Person }) {
  return dispatch => {
    api.getUsers().then(resp => {
      dispatch(fetchUsersSucceeded(resp.data));
    });
  };
}

export function modifyUser({ Person }) {
  return dispatch => {
    api.postUser(Person).then(resp => {
      dispatch(fetchUsersSucceeded(resp.data));
    });
  };
}

export function fetchUsersSucceeded(data) {
  return {
    type: "FETCH_USERS_SUCCEEDED",
    payload: {
      company: data
    }
  };
}

export function getExaminations() {
	return dispatch => {
	   api.getExaminations().then(resp => {
	     dispatch(fetchExaminationsSucceeded(resp.data));
	 });
	};
}

export function modifyExamination({ Examination }) {
  return dispatch => {
	  api.postExamination(Examination).then(resp => {
	      dispatch(fetchExaminationsSucceeded(resp.data));
	  });
  };
}

export function fetchExaminationsSucceeded(data) {
  return {
    type: "FETCH_EXAMINATIONS_SUCCEEDED",
    payload: {
      examinations: data
    }
  };
}
