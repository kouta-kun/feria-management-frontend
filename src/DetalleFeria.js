import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {apiUrl} from "./Config";

class CreacionStand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {nombre: "", dni: "", responsable: "", feria: props.feria, success: null, error: ''};
        this.updateNombre = this.updateNombre.bind(this);
        this.updateDNI = this.updateDNI.bind(this);
        this.updateResponsable = this.updateResponsable.bind(this);
        this.addStand = this.addStand.bind(this);
    }

    updateNombre(e) {
        this.setState({...this.state, nombre: e.target.value});
    }

    updateDNI(e) {
        this.setState({...this.state, dni: e.target.value});
    }

    updateResponsable(e) {
        this.setState({...this.state, responsable: e.target.value});
    }

    addStand() {
        let state = {...this.state};
        if (state.nombre.length === 0) state.nombre = null;
        console.log(state);
        fetch(apiUrl + "feria/register",
            {
                method: 'POST', credentials: 'include', body: JSON.stringify(state),
                headers: {'Content-Type': "application/json"}
            })
            .then(r => r.json())
            .then(r => {
                this.props.updateFunction();
                let newState = {...this.state, success: r.success};
                if (!r.success) {
                    newState.error = r.error;
                }
                this.setState(newState);
            });
    }

    render() {
        return (<>
            <h2>Crear stand</h2>
            <Form className="w-50 ms-auto me-auto">
                <Form.Group className="mb-3" controlId="nombreStand">
                    <Form.Label>
                        Nombre del Stand (opcional)
                    </Form.Label>
                    <Form.Control value={this.state.nombre} onChange={this.updateNombre}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="dniStand">
                    <Form.Label>
                        DNI del responsable del Stand
                    </Form.Label>
                    <Form.Control value={this.state.dni} onChange={this.updateDNI}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="responsableStand">
                    <Form.Label>
                        Nombre del responsable del Stand
                    </Form.Label>
                    <Form.Control value={this.state.responsable} onChange={this.updateResponsable}/>
                </Form.Group>
                <Button onClick={this.addStand}>Agregar Stand</Button>
                {this.state.success !== null && (this.state.success ? <h3>¡Agregado con exito!</h3> :
                    <h3>Ocurrió algún error: {this.state.error}</h3>)}
            </Form></>);
    }
}

export class DetalleFeria extends React.Component {
    constructor(props) {
        super(props);

        this.state = {name: '', date: '', count: 0, owner: '', stands: [], amigo: null};
        this.generarAmigoInvisible = this.generarAmigoInvisible.bind(this);
        this.updateStands = this.updateStands.bind(this);
    }

    componentDidMount() {
        this.updateStands();
    }

    generarAmigoInvisible() {
        fetch(apiUrl + "feria/amigo/" + this.props.name, {
            method: 'POST',
            credentials: 'include'
        }).then(this.updateStands);
    }

    updateStands() {
        fetch(apiUrl + "feria/" + this.props.name, {
            credentials: "include",
        }).then(r => r.json()).then(r => {
            this.setState({
                name: r.name,
                date: r.date,
                count: r.count,
                owner: r.owner,
                stands: r.stands,
                amigo: r.amigo
            });
        });
    }

    render() {
        return (<>
                <h2>Detalles de la feria</h2>
                <Form className="w-50 ms-auto me-auto">
                    <Form.Group className="mb-3" controlId="nombreFeria">
                        <Form.Label>
                            Nombre de la feria
                        </Form.Label>
                        <Form.Control value={this.state.name} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fechaFeria">
                        <Form.Label>
                            Fecha de la feria
                        </Form.Label>
                        <Form.Control disabled value={this.state.date}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="standsFeria">
                        <Form.Label>
                            Cantidad de Stands
                        </Form.Label>
                        <Form.Control type="number" min="0" disabled value={this.state.count}/>
                    </Form.Group>
                </Form>
                <hr/>
                <h2>Amigo invisible</h2>
                {this.state.amigo !== null ? <>
                        <ul>
                            {Object.entries(this.state.amigo).map(([k, v]) => <li key={k}>{k} -> {v}</li>)}
                        </ul>
                        <Button onClick={this.generarAmigoInvisible}>Regenerar amigo invisible</Button>
                    </>
                    : <Button onClick={this.generarAmigoInvisible}>Generar amigo invisible</Button>}
                <hr/>
                <h2>Lista de stands</h2>
                <ul>
                    {this.state.stands.map(s => {
                        return (<li key={s}>
                            {s}
                        </li>);
                    })}
                </ul>
                <hr/>
                <a href={apiUrl + "feria/reporte/" + this.props.name}>Generar reporte</a>
                <hr/>
                <CreacionStand updateFunction={() => this.updateStands()} feria={this.props.name}/>
            </>
        );
    }
}