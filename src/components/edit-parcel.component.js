import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditParcel extends Component {

  constructor(props) {
    super(props)

    this.onChangeParcelName = this.onChangeParcelName.bind(this);
    this.onChangeParcelMetric = this.onChangeParcelMetric.bind(this);
    this.onChangeParcelSize = this.onChangeParcelSize.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      metric: '',
      size: 0
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/parcel/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          metric: res.data.metric,
          size: res.data.size
        });
      })
      .catch((error) => {
        console.log(error);
      })
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

    const parcelObject = {
      name: this.state.name,
      metric: this.state.metric,
      size: this.state.size
    };

    axios.put('http://localhost:4000/parcel/' + this.props.match.params.id, parcelObject)
      .then((res) => {
        console.log(res.data)
        console.log('Parcel successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to parcel List 
    this.props.history.push('/parcel-list')
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

        <Form.Group controlId="metric">
          <Form.Label>Metric</Form.Label>
          <Form.Control type="text" value={this.state.metric} onChange={this.onChangeParcelMetric} />
        </Form.Group>



        <Button variant="danger" size="lg" block="block" type="submit">
          Update Parcel
        </Button>
      </Form>
    </div>);
  }
}
