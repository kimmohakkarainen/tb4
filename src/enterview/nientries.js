import React from "react";
import { Table, Button } from "react-bootstrap";

export default function NIEntries({
  tasks,
  role,
  openModifyTaskModal,
  openDeleteTaskModal
}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th />
          <th>Lääkäri</th>
          <th>Tutkimus</th>
          <th>Potilaan vast.otto</th>
          <th>Potilaan henkilötunnus</th>
          <th>Potilaan sukunimi</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {tasks.map(function (task) {
          const laakari = task.laakari == null ? "" : task.laakari.label;
          const syntymaaika = task.hetu == null ? "" : task.hetu;
          const tutkimus = task.tutkimus == null ? "" : task.tutkimus.label;
          const admin = role === "ADMIN";
          console.log(task);
          return (
            <tr key={task.taskId}>
              <td>
                {admin && (
                  <Button
                    variant="warning"
                    onClick={() => {
                      openModifyTaskModal(task);
                    }}
                  >
                    Palauta Lausuttavaksi
                  </Button>
                )}
              </td>
              <td>{laakari}</td>
              <td>{tutkimus}</td>
              <td>{task.vastaanottoPaiva}</td>
              <td>{syntymaaika}</td>
              <td>{task.sukunimi}</td>
              <td />
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
