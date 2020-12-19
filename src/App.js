import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchState, postLogout } from "./actions";

import Menu from "./menu";
import EnterView from "./dummyview";
import InvoiceView from "./dummyview";
import PersonAdminView from "./dummyview";
import ExaminationAdminView from "./dummyview";
import PasswordView from "./dummyview";
import DoctorView from "./dummyview";
import Footer from "./components/footer.js";

import "./styles.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchState());
  }

  render() {
    const personName =
      this.props.person && this.props.person.fullname
        ? this.props.person.fullname
        : this.props.person
        ? this.props.person.email
        : "";

    return (
      <div className="App">
        {this.props.person && (
          <Router>
            <div>
              {this.props.person.role === "ADMIN" && (
                <div>
                  <Menu personName={personName} role="ADMIN" />
                  <Route exact path="/" component={EnterView} />
                  <Route exact path="/billing" component={InvoiceView} />
                  <Route
                    exact
                    path="/admin/rights"
                    component={PersonAdminView}
                  />
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
                      this.props.dispatch(postLogout());
                      return <div>Logging out</div>;
                    }}
                  />
                </div>
              )}
              {this.props.person.role === "SECRETARY" && (
                <div>
                  <Menu personName={personName} role="SECRETARY" />
                  <Route exact path="/" component={EnterView} />
                  <Route exact path="/billing" component={InvoiceView} />
                  <Route exact path="/password" component={PasswordView} />
                  <Route
                    exact
                    path="/logout"
                    render={() => {
                      this.props.dispatch(postLogout());
                      return <div>Logging out</div>;
                    }}
                  />
                </div>
              )}
              {this.props.person.role === "DOCTOR" && (
                <div>
                  <Menu personName={personName} role="DOCTOR" />
                  <Route exact path="/" component={DoctorView} />
                  <Route exact path="/password" component={PasswordView} />
                  <Route
                    exact
                    path="/logout"
                    render={() => {
                      this.props.dispatch(postLogout());
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
}

function mapStateToProps(state) {
  return {
    person: state.person
  };
}

export default connect(mapStateToProps)(App);
