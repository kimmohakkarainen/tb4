import axios from "axios";

/* const API_BASE_URL = ""; */
const API_BASE_URL = "http://localhost:8080";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export function fetchState() {
  return client.get("/rest/state");
}

export function postDeleteTask(params) {
  return client.post("/rest/delete", params);
}

export function postCreateTask(params) {
  return client.post("/rest/create", params);
}

export function postModifyTask(params) {
  return client.post("/rest/update", params);
}

export function postAssignTask(params) {
  return client.post("/rest/assign", params);
}

export function postUnassignTask(params) {
  return client.post("/rest/unassign", params);
}

export function postFinishTask(params) {
  return client.post("/rest/finish", params);
}

export function getUsers() {
  return client.get("/rest/admin/user");
}

export function postUser(params) {
  return client.post("/rest/admin/user", params);
}

export function getExaminations() {
  return client.get("/rest/admin/exam");
}

export function postExamination(params) {
  return client.post("/rest/admin/exam", params);
}

export function postPassword(params) {
  return client.post("/rest/password", params);
}

export function postLogout() {
  return client.post("/logout");
}

export function getPreview({
  beginDate,
  endDate,
  doctorFilter,
  examinationFilter
}) {
  return client.post("/rest/invoice", {
    beginDate,
    endDate,
    doctorFilter,
    examinationFilter
  });
}

const excelClient = axios.create({
  baseURL: API_BASE_URL,
  responseType: "blob",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.ms-excel"
  }
});

export function getExcel({
  beginDate,
  endDate,
  doctorFilter,
  examinationFilter
}) {
  excelClient
    .post("/rest/invoice/xlsx", {
      beginDate,
      endDate,
      doctorFilter,
      examinationFilter
    })
    .then((response) => {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // this is for IE 11
        window.navigator.msSaveOrOpenBlob(response.data, "invoice.xlsx");
      } else {
        // Non-IE browsers
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "invoice.xlsx");
        link.click();
        window.URL.revokeObjectURL(url);
      }
    });
}
