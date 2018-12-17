import React, { Component } from 'react';

import "react-table/react-table.css";
import { Link } from 'react-router-dom'
class Main extends Component {
    constructor() {
        super();
        this.state = {
            data:[],
            name: "",
            model: "",
            serialNumber: "",
            description:"",
            parts:"",
            cost:"",
            inputDate:"",
            outputDate:"",
            service:[{
            
            }]
        };
    }
    handleChange = (event) => {
        event.preventDefault()
        if (event.target.name === "name")
            this.setState({ name: event.target.value});
        if (event.target.name === "model")
             this.setState({ model: event.target.value});
        if (event.target.name === "serialNumber")
            this.setState({ serialNumber: event.target.value});
        if (event.target.name === "description")
            this.setState({description: event.target.value});
        if (event.target.name === "parts")
            this.setState({ parts: event.target.value});
        if (event.target.name === "cost")
            this.setState({cost: event.target.value });
        if (event.target.name === "inputDate")
            this.setState({inputDate: event.target.value});
        if (event.target.name === "outputDate")
            this.setState({outputDate: event.target.value});
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const fields = Array.prototype.slice.call(e.target)
            .filter(el => el.name)
            .reduce((form, el) => ({
                ...form,
                [el.name]: el.value,
            }), {});
        console.log(fields)
        fields.service= []
        console.log(fields)
        const randomID= Math.random().toString(36).substr(2, 9)
        console.log(randomID)
        fields.id = randomID
        const newData = this.state.data
        newData.push(fields)
        this.setState({ 
            data: newData ,
            name: "",
            model: "",
            serialNumber: "",
            description:"",
            parts:"",
            cost:"",
            inputDate:"",
            outputDate:"", 
            service:[{
            }]
        });
        const dataToSend =JSON.stringify(fields)
        fetch('http://localhost:3000/user', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: dataToSend
        })
    };
    componentWillMount() {
        fetch("http://localhost:3000/user").then( resp => {
            return resp.json();
        }).then( obj => {
            this.setState({ 
                data: obj
            });
        });
    }
      
    render () {
        const { data } = this.state;
        const datalist = data.length ? (
            data.map(e=>{
                return (
                    <tr key={e.id}>
                        <td><Link to={'/'+ e.id}>link</Link></td>
                        <td>{e.name}</td>
                        <td>{e.model}</td>
                        <td>{e.serialNumber}</td>
                    </tr>
                )
            })
            ) : (<tr className="center"><td>Brak danych</td></tr>)
        return (
            <div className="container">
                <div className="center">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Dodaj nowy wpis</h3>
                        <label>
                            Nazwisko Imię:
                            <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            />
                        </label>
                        <label>
                            Model:
                            <input
                                type="text"
                                name="model"
                                value={this.state.model}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label>
                            Nr. Seryjny:
                            <input
                                type="text"
                                name="serialNumber"
                                value={this.state.serialNumber}
                                onChange={this.handleChange}
                            />
                        </label>
                        <input type="submit" value="Dodaj" />
                    </form>
                </div>
                <div>
                    <table className="striped highlight">
                        <thead>
                            <tr>
                                <th>Link</th>
                                <th>Imie</th>
                                <th>Model</th>
                                <th>nrSeryjny</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datalist}
                        </tbody>
                    </table>
                </div>
            </div>
            
        
        )
    }
}
export default Main;