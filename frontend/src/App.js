import React, { Component } from 'react';
import { Table, Button, Input, } from 'reactstrap';

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: this.generateBlockList(res) }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/blockchain/blocks');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    if(this.state.post.trim() === ""){
      this.setState({responseToPost: "Invalid"});
      return;
    }
    const response = await fetch('/blockchain/mineBlock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: this.state.post }),
    });
    const body = await response.json();

    this.setState({
        responseToPost: body.msg,
    });

    this.callApi()
          .then(res => this.setState({ response: this.generateBlockList(res) }))
          .catch(err => console.log(err));
  };

  generateBlockList = res =>{
    console.log(res);
      return Object.keys(res).map(function(key) {
        let date = new Date(parseFloat(res[key]['timestamp'])*1000).toUTCString();
          return <tr>
            <th>{res[key]['index']}</th>
            <td>{res[key]['hash'].slice(0,12).toUpperCase()}</td>
            <td>{res[key]['data'] ? res[key]['data']: '-'}</td>
            <td>{date}</td>
          </tr>;
      })
  };

render() {
    return (
      <div className="App">
        <div className={"container mt-3"}>

          <form onSubmit={this.handleSubmit}>
            <p>
              <strong>Send data to Blockchain API:</strong>
            </p>
            <Input
                type="text"
                value={this.state.post}
                onChange={e => this.setState({ post: e.target.value })}
            />
            <Button type="submit" className={"btn-success mt-2"}>Submit</Button>
          </form>

          <p className={"mb-2 mt-2"}>{this.state.responseToPost}</p>

          <Table size={"sm"} responsive={true} striped={true} bordered={true}>
            <thead>
            <tr><th colSpan={"4"}>CHAIN</th></tr>
            <tr>
              <th>index</th>
              <th>hash</th>
              <th>data</th>
              <th>timestamp</th>
            </tr>
            </thead>
            <tbody>
              {this.state.response}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;