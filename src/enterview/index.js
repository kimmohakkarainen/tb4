import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, Accordion, Button, Modal } from "react-bootstrap";

import { fetchState, postCreate, postDelete } from "../actions";

import CreateTaskModal from "../components/createTaskModal";
import ModifyTaskModal from "../components/modifyTaskModal";
import ModifyInfoModal from "../components/modifyInfoModal";
import DeleteTaskModal from "../components/deleteTaskModal";

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

  function exitModal() {
    openCreateTaskModal(null);
    openModifyTaskModal(null);
    openDeleteTaskModal(null);
    openModifyInfoModal(null);
  }

  function handleCreateTask(task) {
    postCreate({ Person: person, Task: task });
  }

  function handleDeleteTask(task) {
    postDelete({ Person: person, Task: task });
  }

  return (
    <div>
      <ErrorView />
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Uudet lausuttavat
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <div>
              <Button
                variant="primary"
                onClick={() => {
                  openCreateTaskModal(true);
                }}
              >
                Syötä uusi lausuttava
              </Button>
              <Entries
                tasks={newTasks}
                openModifyTaskModal={openModifyTaskModal}
                openDeleteTaskModal={openDeleteTaskModal}
              />
            </div>
          </Accordion.Collapse>
        </Card>

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
      </Accordion>
      <Modal show={deleteTaskModal != null} onHide={exitModal}>
        <DeleteTaskModal task={deleteTaskModal} dispatch={handleDeleteTask} />
      </Modal>
      <Modal show={modifyTaskModal != null} onHide={exitModal}>
        <ModifyTaskModal
          task={modifyTaskModal}
          dispatch={handleCreateTask}
          examinationOptions={examinationOptions}
          doctorOptions={doctorOptions}
        />
      </Modal>
      <Modal show={modifyInfoModal != null} onHide={exitModal}>
        <ModifyInfoModal task={modifyInfoModal} dispatch={handleCreateTask} />
      </Modal>
      <Modal show={createTaskModal} onHide={exitModal}>
        <CreateTaskModal
          callback={handleCreateTask}
          examinationOptions={examinationOptions}
          doctorOptions={doctorOptions}
        />
      </Modal>
    </div>
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
