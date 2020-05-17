import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class ParcelTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteParcel = this.deleteParcel.bind(this);
    }

    deleteParcel() {
        axios.delete('http://localhost:4000/parcel/' + this.props.obj._id)
            .then((res) => {
                console.log('parcel successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.size}</td>
                <td>{this.props.obj.metric}</td>

                <td>
                    <Link className="edit-link" to={"/edit-parcel/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteParcel} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}
