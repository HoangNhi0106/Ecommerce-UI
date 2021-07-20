import React from 'react';
import './Contact.css'

const axios = require('axios').default;

export default class Contact extends React.Component {
    state = {
        items: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            const items = response.data;
            this.setState(items);
        });
    }

    render() {
        return (
            <table id="table">
            <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
            </thead>
            {this.state.items.map((item) => (
                <tbody>
                    <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    </tr>
                </tbody>
            ))}
            </table>
        )
    }
}