import React from "react";
import {apiUrl} from "./Config";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export class CreacionFeria extends React.Component {
    constructor(props) {
        super(props);

        this.state = {name: '', date: '', stands: 0};
        this.oncreate = props.oncreate;
        this.updateName = this.updateName.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.updateStands = this.updateStands.bind(this);
        this.sendCreate = this.sendCreate.bind(this);
    }

    updateName(e) {
        this.setState({...this.state, name: e.target.value});
    }

    updateDate(e) {
        this.setState({...this.state, date: e.target.value});
    }

    updateStands(e) {
        this.setState({...this.state, stands: e.target.value});
    }

    sendCreate() {
        fetch(apiUrl + "feria/create", {
            method: 'POST',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nombre: this.state.name, date: this.state.date, count: this.state.stands})
        }).then(() => this.oncreate(this.state.name));
    }

    render() {
        return (
            <Form className="w-50 ms-auto me-auto">
                <Form.Group className="mb-3" controlId="nombreFeria">
                    <Form.Label>
                        Nombre de la feria
                    </Form.Label>
                    <Form.Control onChange={this.updateName} value={this.state.name}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="fechaFeria">
                    <Form.Label>
                        Fecha de la feria
                    </Form.Label>
                    <Form.Control type="date" onChange={this.updateDate} value={this.state.date}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="standsFeria">
                    <Form.Label>
                        Cantidad de Stands
                    </Form.Label>
                    <Form.Control type="number" min="0" onChange={this.updateStands} value={this.state.stands}/>
                </Form.Group>
                <Button variant="primary" onClick={this.sendCreate}>
                    Crear feria
                </Button>
            </Form>
        );
    }
}