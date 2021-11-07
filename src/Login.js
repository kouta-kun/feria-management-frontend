import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {apiUrl} from "./Config";

export class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.loginCallback = props.onlogin;
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);

        this.sendLogin = this.sendLogin.bind(this);

        this.state = {username: "", password: ""}
    }

    sendLogin() {
        fetch(apiUrl + "auth/login", {
            method: 'POST',
            headers: {
                'Authorization': btoa(this.state.username + ":" + this.state.password)
            },
            credentials: 'include'
        }).then(this.loginCallback);
    }

    updateUsername(e) {
        this.setState({...this.state, username: e.target.value});
    }

    updatePassword(e) {
        this.setState({...this.state, password: e.target.value});
    }

    render() {
        return (
            <Form className="w-50 ms-auto me-auto">
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>
                        Nombre de Usuario
                    </Form.Label>
                    <Form.Control onChange={this.updateUsername} value={this.state.username}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>
                        Contraseña
                    </Form.Label>
                    <Form.Control type="password" onChange={this.updatePassword} value={this.state.password}/>
                </Form.Group>
                <Button variant="primary" onClick={this.sendLogin}>
                    Submit
                </Button>
            </Form>
        );
    }
}