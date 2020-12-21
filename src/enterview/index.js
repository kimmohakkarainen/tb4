import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, Accordion, Button } from "react-bootstrap";

import ErrorView from "../errorview";
import Entries from "./entries";
import IPEntries from "./ipentries";
import NIEntries from "./nientries";

function EnterView({
  person,
  errorModal,
  examinationOptions,
  doctorOptions,
  createTaskModal,
  modifyTaskModal,
  modifyInfoModal,
  deleteTaskModal,
  newTasks,
  assignedTasks,
  processedTasks
}) {
  function openModifyTaskModal(task) {}
  function openDeleteTaskModal(task) {}
  function openModifyInfoModal(task) {}

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
            <Entries
              tasks={newTasks}
              openModifyTaskModal={openModifyTaskModal}
              openDeleteTaskModal={openDeleteTaskModal}
            />
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
    </div>
  );
}

/* <Entries tasks={newTasks} /> */

function mapStateToProps(state) {
  return {
    person: state.person,
    errorModal: state.errorModal,
    examinationOptions: state.examinationOptions,
    doctorOptions: state.doctorOptions,
    createTaskModal: state.createTaskModal,
    modifyTaskModal: state.modifyTaskModal,
    modifyInfoModal: state.modifyInfoModal,
    deleteTaskModal: state.deleteTaskModal,
    newTasks: state.newTasks,
    assignedTasks: state.assignedTasks,
    processedTasks: state.processedTasks
  };
}

export default connect(mapStateToProps)(EnterView);
