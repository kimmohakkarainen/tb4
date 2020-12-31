import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { Modal } from "react-bootstrap";

import { fetchState, postLogout } from "./actions";

import Menu from "./menu";
import ErrorView from "./errorview";
import EnterView from "./enterview";
import InvoiceView from "./invoiceview";
import PersonAdminView from "./dummyview";
import ExaminationAdminView from "./dummyview";
import PasswordView from "./passwordview";
import DoctorView from "./dummyview";
import Footer from "./components/footer.js";

function App({ fetchState, postLogout, person, errorModal }) {
  const personName =
    person && person.fullname ? person.fullname : person ? person.email : "";

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  return (
    <div className="App">
      <Modal show={errorModal != null}>
        <ErrorView />
      </Modal>
      {person && (
        <Router>
          <div>
            {person.role === "ADMIN" && (
              <div>
                <Menu personName={personName} role="ADMIN" />
                <Route exact path="/" component={EnterView} />
                <Route exact path="/billing" component={InvoiceView} />
                <Route exact path="/admin/rights" component={PersonAdminView} />
                <Route
                  exact
                  path="/admin/examinations"
                  component={ExaminationAdminView}
                />
                <Route exact path="/password" component={PasswordView} />
                <Route
                  exact
                  path="/logout"
                  render={() => {
                    postLogout();
                    return <div>Logging out</div>;
                  }}
                />
              </div>
            )}
            {person.role === "SECRETARY" && (
              <div>
                <Menu personName={personName} role="SECRETARY" />
                <Route exact path="/" component={EnterView} />
                <Route exact path="/billing" component={InvoiceView} />
                <Route exact path="/password" component={PasswordView} />
                <Route
                  exact
                  path="/logout"
                  render={() => {
                    postLogout();
                    return <div>Logging out</div>;
                  }}
                />
              </div>
            )}
            {person.role === "DOCTOR" && (
              <div>
                <Menu personName={personName} role="DOCTOR" />
                <Route exact path="/" component={DoctorView} />
                <Route exact path="/password" component={PasswordView} />
                <Route
                  exact
                  path="/logout"
                  render={() => {
                    postLogout();
                    return <div>Logging out</div>;
                  }}
                />
              </div>
            )}
          </div>
        </Router>
      )}
      <Footer />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    person: state.person,
    errorModal: state.errorModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchState: () => dispatch(fetchState()),
    postLogout: () => dispatch(postLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
