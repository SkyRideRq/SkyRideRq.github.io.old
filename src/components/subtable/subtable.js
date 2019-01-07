import React, { Component } from 'react';


class Subtable extends Component {
    state = {
        data: [],
        service:[],
        formStyle:{
            "display":"none"
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.props.match.params.post_id;
        let fields = Array.prototype.slice.call(e.target)
            .filter(el => el.name)
            .reduce((form, el) => ({
                ...form,
                [el.name]: el.value,
            }), {});
        const randomID= Math.random().toString(36).substr(2, 9)
        fields.id = randomID
        this.state.data.service.push(fields)
        const dataToSend =JSON.stringify(this.state.data)
            fetch('http://localhost:3000/user/'+id+ '/', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: dataToSend
            });
        this.setState({
            formStyle: {
                "display" :"none"
            },
        })
        
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
    handleClick = () => {
        this.state.formStyle.display === "none" ? (
            this.setState({
                formStyle: {
                    "display" :"block",
                    "position":"absolute",
                    "top":"2rem",
                    "left": "0",
                    "zIndex": "99999",
                    "padding":"30px"
                }
            })
        ): (
            this.setState({
                formStyle: {
                    "display" :"none"
                }
            })
        )
        
    }
    
    componentWillMount() {
        //console.log(this.props)
        let id = this.props.match.params.post_id;
        fetch("http://localhost:3000/user/"+id).then( resp => {
            return resp.json();
        }).then( obj => {
            this.setState({ 
                data: obj,
                service:obj.service
            });
        });
    }
    
    render () {
        const data = this.state.data ? (
            <div>
                <h4 className="center">{this.state.data.name} {this.state.data.model} {this.state.data.serialNumber}</h4>
            </div>
        ) : (<h1 className="center">Wczytywanie...</h1>)
        const datalist = this.state.service.length ? (
            this.state.service.map(e=>{
                return (
                    <tr key={e.id}>
                        <td>{e.description}</td>
                        <td>{e.parts}</td>
                        <td>{e.cost}</td>
                        <td>{e.inputDate}</td>
                        <td>{e.outputDate}</td>
                    </tr>
                )
            })
            ) : (<tr className="center"><td>Brak danych</td></tr>)
        return (
            <div className="container center">
                {data}
                <button className='waves-effect waves-light btn' onClick={this.handleClick}>Dodaj nową naprawę</button>
                <div className='modal' style={this.state.formStyle}>
                    <form  onSubmit={this.handleSubmit}>
                        <h6>Dodaj nowy wpis</h6>
                        <div className="input-field">
                            <input
                                type="text"
                                name="description"
                                value={this.state.service.description}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="description">Opis:</label>
                        </div>
                        
                        <div className="input-field">
                            <input
                                type="text"
                                name="parts"
                                value={this.state.service.parts}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="parts">Części:</label>
                        </div>
                        <div className="input-field">
                            <input
                                type="number"
                                name="cost"
                                value={this.state.service.cost}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="cost">Koszt:</label>
                        </div>
                        
                        <div className="input-field">
                            <input
                                type="date"
                                name="inputDate"
                                value={this.state.service.inputDate}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="inputDate">Data przyjęcia:</label>
                        </div>
                        
                        <div className="input-field">
                            <input
                                type="date"
                                name="outputDate"
                                value={this.state.service.outputDate}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="outputDate">Data wydania:</label>
                        </div>
                        <div className="modal-footer">
                            <input className="btn" type="submit" value="Dodaj" />
                        </div>
                        
                    </form>
                </div>
                    
                
                <table className="striped highlight">
                    <thead>
                        <tr>
                            <th>Opis</th>
                            <th>Cześci</th>
                            <th>Koszt</th>
                            <th>Data przyjęcia</th>
                            <th>Data wydania</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datalist}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Subtable