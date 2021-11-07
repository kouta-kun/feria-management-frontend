import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from "react";
import Container from "react-bootstrap/Container";
import {Router} from "./Router";
import {LoginComponent} from "./Login";
import {apiUrl} from "./Config";
import {DetalleFeria} from "./DetalleFeria";
import {CreacionFeria} from "./CreacionFeria";
import {ListaFerias} from "./ListaFerias";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {logged: false, username: null, type: null};
        this.onlogin = this.onlogin.bind(this);
        this.setRoute = this.setRoute.bind(this);
        this.oncreate = this.oncreate.bind(this);
        this.routerRef = React.createRef();
        this.initialRoute = window.location.pathname;
    }

    setRoute(route) {
        this.routerRef.current.setRoute(route);
    }

    onlogin() {
        this.setRoute('/');
        this.updateLoginState();
    }

    oncreate(feria) {
        this.setRoute('/feria/' + feria);
    }

    componentDidMount() {
        this.updateLoginState();
    }

    updateLoginState() {
        fetch(apiUrl + 'auth/info', {
            method: 'POST', credentials: 'include'
        }).then(r => r.json()).then(r => {
            this.setState({...this.state, logged: r.logged_in, username: r.name, type: r.type});
        });
    }

    render() {
        return (
            <div className="App">
                <Navbar bg="light" expand="lg" fixed="top">
                    <Container>
                        <Navbar.Brand>
                            <Nav.Link onClick={() => (this.setRoute("/"))}>Ferias</Nav.Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                {
                                    this.state.logged ?
                                        (<>
                                            <Nav.Link onClick={() => (this.setRoute("/creacion"))}>
                                                Crear feria
                                            </Nav.Link>
                                            <Nav.Link>
                                                {this.state.username}
                                            </Nav.Link>
                                        </>)
                                        :
                                        <Nav.Link onClick={() => (this.setRoute('/login'))}>
                                            Login
                                        </Nav.Link>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Router ref={this.routerRef} initialRoute={this.getInitialRoute()}>
                    <ListaFerias route="/"/>
                    <DetalleFeria route="/feria/:name"/>
                    <CreacionFeria route="/creacion" oncreate={this.oncreate}/>
                    <LoginComponent onlogin={this.onlogin} route="/login"/>
                </Router>
            </div>
        );
    }

    getInitialRoute() {
        return this.initialRoute;
    }
}

export default App;
