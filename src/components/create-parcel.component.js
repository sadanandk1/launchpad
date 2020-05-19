import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateParcel extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeParcelName = this.onChangeParcelName.bind(this);
    this.onChangeParcelMetric = this.onChangeParcelMetric.bind(this);
    this.onChangeParcelSize = this.onChangeParcelSize.bind(this);
   // this.onClickNext = this.onClickNext.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      metric: '',
      size: '',
      page:''
    }
  }

  onChangeParcelName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeParcelMetric(e) {
    this.setState({ metric: e.target.value })
  }

  onChangeParcelSize(e) {
    this.setState({ size: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    this.state.page +=1;
  //  if(this.setState.page ===1){
    const parcelObject = {
      name: this.state.name,
      metric: this.state.metric,
      size: this.state.size
    };

    axios.post('http://localhost:4000/parcel', parcelObject)
      .then(res => console.log(res.data));

    this.setState({
      name: '',
      metric: '',
      size: ''
    });
  //}else{
    this.props.history.push('/crop-list')
 // }

  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeParcelName} />
        </Form.Group>

        <Form.Group controlId="Size">
          <Form.Label>Size</Form.Label>
          <Form.Control type="number" value={this.state.size} onChange={this.onChangeParcelSize} />
        </Form.Group>

        <Form.Group controlId="Metric">
          <Form.Label>Metric</Form.Label>
          <Form.Control type="text" value={this.state.metric} onChange={this.onChangeParcelMetric} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Parcel
        </Button>
      </Form>
    </div>);
  }
}
