import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

class MyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initilaValue: [],
      newValues: [],
      options: [],
      selectedOpt: ""
    };
  }

  getValues() {
    fetch("http://localhost:3001/api/initialvalues")
      .then(res => res.json())
      .then(res => {
        this.setState({ initilaValue: res, newValues: res });
      });
  }

  updateValues() {
    

    axios({
      method: "post",
      url: "http://localhost:3001/api/savevalues",
      data: this.state.newValues
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  selectedOption(data) {
    return { value: data, label: data };
  }
  getOptins(data) {
    let opt = [];
    data.forEach(d => {
      let a = { value: "", label: "" };
      a.value = d;
      a.label = d;
      opt.push(a);
    });
    return opt;
  }
  handleSelectChange(option) {
    
  //  this.selectedOption(option.value);
  }
  handleChange(data, newvalue) {
    let newStateValue = [];
    newStateValue = this.state.newValues;

    if (data.key === "id") {
      for (let i = 0; i < newStateValue.length; i++) {
        if (newStateValue[i].key === "id") {
          newStateValue[i].value = newvalue;
          newStateValue[i] = data;
        }
      }
    }
    if (data.key === "age") {
      for (let i = 0; i < newStateValue.length; i++) {
        if (newStateValue[i].key === "age") {
          newStateValue[i].value = newvalue;
          newStateValue[i] = data;
        }
      }
    }
    if (data.key === "pin") {
      for (let i = 0; i < newStateValue.length; i++) {
        if (newStateValue[i].key === "pin") {
          newStateValue[i].value = newvalue;
          newStateValue[i] = data;
        }
      }
    }
    this.setState({ newValues: newStateValue });
    
  }

  componentWillMount() {
    this.getValues();
  }

  render() {
    return (
      <div>
        {this.state.initilaValue ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Discription</th>
              </tr>
            </thead>
            <tbody>
              {this.state.initilaValue.map(data => {
                return (
                  <tr key={data.key} style={{ cursor: "pointer" }}>
                    <td>{data.label}</td>
                    <td>
                      {data.type === "text" ? (
                        <input
                          defaultValue={data.value}
                          onChange={e =>
                            this.handleChange(data, e.target.value)
                          }
                        />
                      ) : data.type === "select" ? (
                        <Select
                          value={this.selectedOption(data.value)}
                          onChange={this.handleSelectChange}
                          options={this.getOptins(data.options)}
                        />
                      ) : data.type === "check" ? (
                        <input type="checkbox" defaultChecked={data.value} />
                      ) : null}
                    </td>
                    <td>{data.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : null}

        <Button variant="danger" onClick={() => this.updateValues()}>
          Save
        </Button>
      </div>
    );
  }
}

export default MyCard;
