import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, Container, Accordion, Button, Modal } from "react-bootstrap";

import { fetchState, postCreate, postDelete } from "../actions";

import CreateTaskModal from "./createTaskModal";
import ModifyTaskModal from "../components/modifyTaskModal";
import ModifyInfoModal from "../components/modifyInfoModal";
import DeleteTaskModal from "./deleteTaskModal";

import ErrorView from "../errorview";
import Entries from "./entries";
import IPEntries from "./ipentries";
import NIEntries from "./nientries";

function EnterView({
  person,
  errorModal,
  examinationOptions,
  doctorOptions,
  newTasks,
  assignedTasks,
  processedTasks,

  postCreate,
  postDelete
}) {
  const [createTaskModal, openCreateTaskModal] = useState(null);
  const [modifyTaskModal, openModifyTaskModal] = useState(null);
  const [deleteTaskModal, openDeleteTaskModal] = useState(null);
  const [modifyInfoModal, openModifyInfoModal] = useState(null);

  function handleCreateTask(task) {
    console.log("handleCreateTask");
    openCreateTaskModal(null);
    openModifyTaskModal(null);
    postCreate({ Person: person, Task: task });
  }

  function handleDeleteTask(task) {
    openDeleteTaskModal(null);
    postDelete({ Person: person, Task: task });
  }

  return (
    <Container>
      <ErrorView />
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Uudet lausuttavat
            </Accordion.Toggle>
            <Button
              variant="primary"
              onClick={() => {
                openCreateTaskModal(true);
              }}
            >
              Syötä uusi lausuttava
            </Button>
          </Card.Header>
          <Card.Body>
            <Accordion.Collapse eventKey="0">
              <div>
                {newTasks.length > 0 && (
                  <Entries
                    tasks={newTasks}
                    openModifyTaskModal={openModifyTaskModal}
                    openDeleteTaskModal={openDeleteTaskModal}
                  />
                )}
              </div>
            </Accordion.Collapse>
          </Card.Body>
        </Card>

        {assignedTasks.length > 0 && (
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Keskeneräiset lausuttavat
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <IPEntries
                tasks={assignedTasks}
                openModifyTaskModal={openModifyTaskModal}
                openDeleteTaskModal={openDeleteTaskModal}
                openModifyInfoModal={openModifyInfoModal}
              />
            </Accordion.Collapse>
          </Card>
        )}

        {processedTasks.length > 0 && (
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                Laskuttamattomat lausuttavat
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <NIEntries
                tasks={processedTasks}
                role={person.role}
                openModifyTaskModal={openModifyTaskModal}
                openDeleteTaskModal={openDeleteTaskModal}
                openModifyInfoModal={openModifyInfoModal}
              />
            </Accordion.Collapse>
          </Card>
        )}
      </Accordion>
      <Modal
        show={deleteTaskModal != null}
        onHide={() => openDeleteTaskModal(null)}
      >
        <DeleteTaskModal task={deleteTaskModal} dispatch={handleDeleteTask} />
      </Modal>
      <Modal
        show={modifyTaskModal != null}
        onHide={() => openModifyTaskModal(null)}
      >
        <CreateTaskModal
          defaultValue={modifyTaskModal}
          dispatch={handleCreateTask}
          examinationOptions={examinationOptions}
          doctorOptions={doctorOptions}
          title="Muokkaa lausuttava"
        />
      </Modal>
      <Modal
        show={modifyInfoModal != null}
        onHide={() => openModifyInfoModal(null)}
      >
        <ModifyInfoModal task={modifyInfoModal} dispatch={handleCreateTask} />
      </Modal>
      <Modal show={createTaskModal} onHide={() => openCreateTaskModal(null)}>
        <CreateTaskModal
          dispatch={handleCreateTask}
          examinationOptions={examinationOptions}
          doctorOptions={doctorOptions}
          title="Uusi lausuttava"
        />
      </Modal>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    person: state.person,
    errorModal: state.errorModal,
    examinationOptions: state.examinationOptions,
    doctorOptions: state.doctorOptions,
    newTasks: state.newTasks,
    assignedTasks: state.assignedTasks,
    processedTasks: state.processedTasks
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchState: () => dispatch(fetchState()),
    postCreate: (params) => dispatch(postCreate(params)),
    postDelete: (params) => dispatch(postDelete(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterView);
