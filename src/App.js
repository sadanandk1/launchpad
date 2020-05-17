import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateParcel from "./components/create-parcel.component";
import EditParcel from "./components/edit-parcel.component";
import ParcelList from "./components/parcel-list.component";

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/create-parcel"} className="nav-link">
                Agri Management App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-parcel"} className="nav-link">
                  Create Parcel
                </Link>
              </Nav>

              {/* <Nav>
                <Link to={"/edit-parcel/:id"} className="nav-link">
                  Edit Parcel
                </Link>
              </Nav> */}

              <Nav>
                <Link to={"/parcel-list"} className="nav-link">
                  Parcel List
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CreateParcel} />
                <Route path="/create-parcel" component={CreateParcel} />
                <Route path="/edit-parcel/:id" component={EditParcel} />
                <Route path="/parcel-list" component={ParcelList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;