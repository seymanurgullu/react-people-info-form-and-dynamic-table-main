import './List.css';
import {Component} from "react";
import Toastify from 'toastify-js'
import ShowList from './ShowList'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [
                {id: 1, name: 'Servet', surname: 'Şatıroğlu', mail: 'satirogluservet@gmail.com'},
                {id: 2, name: 'Şeyma Nur', surname: 'Güllü', mail: 'nurgulluu@gmail.com'},
            ],
            id: 3,
            message: ""
        }
        this.removePerson = this.removePerson.bind(this);
        this.addPerson = this.addPerson.bind(this);
    }

    clearInputs() {
        document.getElementById('name').value = ''
        document.getElementById('surname').value = ''
        document.getElementById('mail').value = ''
    }

    addPerson() {
        if (this.checFields()) {
            let person = {
                id: this.state.id,
                name: document.getElementById("name").value,
                surname: document.getElementById("surname").value,
                mail: document.getElementById("mail").value
            }
            this.state.id = this.state.id + 1;
            this.clearInputs();
            this.setState({
                people: [...this.state.people, person]
            });
        }
    }

    checFields() {
        const duration = 3000;
        if (document.getElementById("name").value === '') {
            Toastify({
                text: "'Name' cannot blank",
                duration: duration
            }).showToast();
            return false;
        }
        if (document.getElementById("surname").value === '') {
            Toastify({
                text: "'Surname' cannot blank",
                duration: duration
            }).showToast();
            return false;
        }
        if (document.getElementById("mail").value === ''
            || !document.getElementById("mail").value.includes("@")
            || !document.getElementById("mail").value.includes(".")) {
            Toastify({
                text: "'Mail' is blank or wrong",
                duration: duration
            }).showToast();
            return false;
        }
        return true;
    }

    removePerson(id) {
        let {people} = this.state;
        let index = people.findIndex(x => x.id === id);
        people.splice(index, 1);
        this.setState({
            people: people
        })
    }

    render() {
        return (
            <div className="List">
                <header className="List-header">
                    <h2>Add Person</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Mail</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input type="text" id="name" placeholder="Name"/></td>
                            <td><input type="text" id="surname" placeholder="Surname"/></td>
                            <td><input type="text" id="mail" placeholder="Mail"/></td>
                            <td>
                                <button onClick={this.addPerson}>Add Person</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div id="snackbar">{this.state.message}</div>
                    <h2>People List</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Mail</th>
                        </tr>
                        </thead>
                        <tbody>
                        <ShowList
                            people={this.state.people}
                            removePerson={this.removePerson}
                        />
                        </tbody>
                    </table>
                </header>
            </div>
        );
    }
}

export default List;
