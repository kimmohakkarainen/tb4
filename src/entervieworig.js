import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Panel,
  Button,
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  DropdownButton,
  MenuItem,
  HelpBlock,
  Table,
  Modal
} from "react-bootstrap";
import { connect } from "react-redux";
import ActionButton from "./panels/actionbutton";
import {
  fetchState,
  postCreate,
  postDelete,
  openDeleteTaskModal,
  openCreateTaskModal,
  openModifyTaskModal,
  openModifyInfoModal
} from "./actions";

import CreateTaskModal from "./components/createTaskModal";
import ModifyTaskModal from "./components/modifyTaskModal";
import ModifyInfoModal from "./components/modifyInfoModal";
import DeleteTaskModal from "./components/deleteTaskModal";
import ModifyEntry from "./panels/modifyentry";
import ErrorView from "./errorview";

class TaskButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.startModify(this.props.task);
  }

  render() {
    return (
      <Button bsStyle="primary" onClick={this.handleClick}>
        Muokkaa
      </Button>
    );
  }
}

const IPEntries = (props) => {
  return (
    <Table striped condensed hover>
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
        {props.tasks.map(function (task) {
          const laakari = task.laakari == null ? "" : task.laakari.label;
          const syntymaaika = task.hetu == null ? "" : task.hetu;
          const tutkimus = task.tutkimus == null ? "" : task.tutkimus.label;
          return (
            <tr key={task.taskId}>
              <td>
                <Button
                  bsStyle="primary"
                  onClick={() => {
                    props.dispatch(openModifyTaskModal(task));
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
                    bsStyle="warning"
                    onClick={() => {
                      props.dispatch(openModifyInfoModal(task));
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
};

const NotInvoicedEntries = (props) => {
  return (
    <Table striped condensed hover>
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
        {props.tasks.map(function (task) {
          const laakari = task.laakari == null ? "" : task.laakari.label;
          const syntymaaika = task.hetu == null ? "" : task.hetu;
          const tutkimus = task.tutkimus == null ? "" : task.tutkimus.label;
          const admin = props.role === "ADMIN";
          console.log(props);
          console.log(task);
          return (
            <tr key={task.taskId}>
              <td>
                {admin && (
                  <Button
                    bsStyle="warning"
                    onClick={() => {
                      props.dispatch(openModifyTaskModal(task));
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
};

const Entries = (props) => {
  return (
    <Table striped condensed hover>
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
        {props.tasks.map(function (task) {
          const syntymaaika = task.hetu == null ? "" : task.hetu;
          const tutkimus = task.tutkimus == null ? "" : task.tutkimus.label;
          return (
            <tr key={task.taskId}>
              <td>
                <Button
                  bsStyle="primary"
                  onClick={() => {
                    props.dispatch(openModifyTaskModal(task));
                  }}
                >
                  Muokkaa
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    props.dispatch(openDeleteTaskModal(task));
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
};

class EnterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enterModalVisible: false,
      modifyModalVisible: false,
      modifyTarget: {}
    };
    this.exitModal = this.exitModal.bind(this);
    this.handleCreateTask = this.handleCreateTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchState());
  }

  exitModal() {
    this.props.dispatch(fetchState());
  }

  handleCreateTask(task) {
    this.props.dispatch(postCreate({ Person: this.props.person, Task: task }));
  }

  handleDeleteTask(task) {
    this.props.dispatch(postDelete({ Person: this.props.person, Task: task }));
  }

  render() {
    return (
      <div>
        <ErrorView />
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle componentClass="h3">
              Uudet lausuttavat
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <Entries
                tasks={this.props.newTasks}
                dispatch={this.props.dispatch}
              />
              <Button
                bsStyle="primary"
                onClick={() => {
                  this.props.dispatch(openCreateTaskModal());
                }}
              >
                Syötä uusi lausuttava
              </Button>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        <Modal show={this.props.createTaskModal} onHide={this.exitModal}>
          <CreateTaskModal
            dispatch={this.handleCreateTask}
            examinationOptions={this.props.examinationOptions}
            doctorOptions={this.props.doctorOptions}
          />
        </Modal>
        {this.props.assignedTasks.length > 0 && (
          <Panel defaultExpanded>
            <Panel.Heading>
              <Panel.Title toggle componentClass="h3">
                Keskeneräiset lausuttavat
              </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
                <IPEntries
                  tasks={this.props.assignedTasks}
                  dispatch={this.props.dispatch}
                />
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        )}
        {this.props.processedTasks.length > 0 && (
          <Panel defaultExpanded>
            <Panel.Heading>
              <Panel.Title toggle componentClass="h3">
                Laskuttamattomat lausutut
              </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
                <NotInvoicedEntries
                  tasks={this.props.processedTasks}
                  dispatch={this.props.dispatch}
                  role={this.props.person.role}
                />
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        )}
        <Modal
          show={this.props.deleteTaskModal != null}
          onHide={this.exitModal}
        >
          <DeleteTaskModal
            task={this.props.deleteTaskModal}
            dispatch={this.handleDeleteTask}
          />
        </Modal>
        <Modal
          show={this.props.modifyTaskModal != null}
          onHide={this.exitModal}
        >
          <ModifyTaskModal
            task={this.props.modifyTaskModal}
            dispatch={this.handleCreateTask}
            examinationOptions={this.props.examinationOptions}
            doctorOptions={this.props.doctorOptions}
          />
        </Modal>
        <Modal
          show={this.props.modifyInfoModal != null}
          onHide={this.exitModal}
        >
          <ModifyInfoModal
            task={this.props.modifyInfoModal}
            dispatch={this.handleCreateTask}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const person = state.person;
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
