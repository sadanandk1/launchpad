import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ParcelTableRow from './ParcelTableRow';


export default class ParcelList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      parcels: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/parcel/')
      .then(res => {
        this.setState({
          parcels: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.parcels.map((res, i) => {
      return <ParcelTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Metric</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}
