import React from "react";

import BootstrapTable from "react-bootstrap-table-next";

const columnsProp = [
  { dataField: "id", text: "Id", hidden: true },
  { dataField: "doctor", text: "Lääkäri" },
  { dataField: "examination", text: "Tutkimus" },
  { dataField: "dpart", text: "Lääkärin korvaus yht." },
  { dataField: "sum", text: "Laskutettava yht." },
  { dataField: "count", text: "lkm" }
];

/*
  {
    dataField: "customer",
    text: "Customer",
    editable: false,
    headerStyle: { width: "15%" },
    headerClasses: "dayview-column d-none d-lg-table-cell",
    classes: "dayview-column d-none d-lg-table-cell"
  },
  {
    dataField: "project",
    text: "Project",
    editable: false,
    headerStyle: { width: "20%" },
    headerClasses: "dayview-column",
    classes: "dayview-column"
  },
  {
    dataField: "time",
    text: "Time",
    editable: true,
    headerStyle: { width: "10%" },
    headerClasses: "dayview-column",
    editCellClasses: "dayview-time-column",
    classes: "dayview-time-column"
  },
  {
    dataField: "comment",
    text: "Comment",
    editable: true,
    headerStyle: { width: "35%" },
    headerClasses: "dayview-column  d-none d-sm-table-cell",
    style: { whiteSpace: "pre-wrap" },
    editor: {
      rows: 6,
      type: Type.TEXTAREA
    },
    classes: "dayview-column  d-none d-sm-table-cell"
  },
  {
    dataField: "week",
    text: "Week",
    editable: false,
    style: { backgroundColor: "var(--light)" },
    headerStyle: { width: "10%", backgroundColor: "var(--light)" },
    headerClasses: "dayview-column d-none d-lg-table-cell",
    classes: "dayview-column d-none d-lg-table-cell"
  },
  {
    dataField: "month",
    text: "Month",
    editable: false,
    style: { backgroundColor: "var(--light)" },
    headerStyle: { width: "10%", backgroundColor: "var(--light)" },
    headerClasses: "dayview-column d-none d-lg-table-cell",
    classes: "dayview-column d-none d-lg-table-cell"
  }
  */

export default function PreviewTable({ preview }) {
  return (
    <BootstrapTable
      bordered
      striped
      bootstrap4
      keyField="id"
      data={preview}
      columns={columnsProp}
    />
  );
}
