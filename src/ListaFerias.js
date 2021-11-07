import React from "react";
import {apiUrl} from "./Config";

export class ListaFerias extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'ferias': []}
    }

    componentDidMount() {
        fetch(apiUrl + 'feria/', {
            credentials: 'include'
        }).then(r => r.json()).then(r => this.setState({'ferias': r}));
    }

    render() {
        return (<>
            <h2>Administración de Ferias</h2>
            <ul>
                {this.state.ferias.map(f =>
                    <li><a href={"/feria/" + f.name} key={f.name}>{f.name}</a></li>
                )
                }
            </ul>
        </>);
    }
}