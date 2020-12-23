import React from "react";
import { Table, Button } from "react-bootstrap";

export default function Entries({
  tasks,
  openModifyTaskModal,
  openDeleteTaskModal
}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th />
          <th />
          <th>Tutkimuspäivä</th>
          <th>Tutkimus</th>
          <th>Potilaan henkilötunnus</th>
          <th>Potilaan sukunimi</th>
          <th>Potilaan vastaanotto</th>
          <th>Esitietolomake</th>
          <th>Lisätiedot</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(function (task) {
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
              <td>
                <Button
                  onClick={() => {
                    openDeleteTaskModal(task);
                  }}
                >
                  Poista
                </Button>
              </td>
              <td>{task.tutkimusPaiva}</td>
              <td>{tutkimus}</td>
              <td>{syntymaaika}</td>
              <td>{task.sukunimi}</td>
              <td>{task.vastaanottoPaiva}</td>
              <td>{task.esitietolomake}</td>
              <td>{task.lisatiedot}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
