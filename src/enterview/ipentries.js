import React from "react";
import { Table, Button } from "react-bootstrap";

export default function IPEntries({
  tasks,
  openModifyTaskModal,
  openModifyInfoModal
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
          return (
            <tr key={task.taskId}>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    openModifyTaskModal(task);
                  }}
                >
                  Muokkaa
                </Button>
              </td>
              <td>{laakari}</td>
              <td>{tutkimus}</td>
              <td>{task.vastaanottoPaiva}</td>
              <td>{syntymaaika}</td>
              <td>{task.sukunimi}</td>
              <td>
                {task.viesti != null && (
                  <Button
                    variant="warning"
                    onClick={() => {
                      openModifyInfoModal(task);
                    }}
                  >
                    Viesti
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
