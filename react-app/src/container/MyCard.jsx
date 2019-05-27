import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import MyForm from "../component/MyForm.jsx";

class MyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initilaValue: [],
      newValues: [],
      options: [],
      selectedOpt: ""
    };
    this.handleChange= this.handleChange.bind(this);
    this.selectedOption = this.selectedOption.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  getValues() {
    fetch("/api/initialvalues")
      .then(res => res.json())
      .then(res => {
        this.setState({ initilaValue: res, newValues: res });
      });
  }

  updateValues() {
    axios({
      method: "post",
      url: "/api/savevalues",
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
  getOptions(data) {
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
    console.log(data)
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

  componentDidMount() {
    this.getValues();
  }

  render() {
    return (
      <div>
        {this.state.initilaValue.length>0 ? 
        <MyForm 
        displayData={this.state.initilaValue} 
        handleInput = {this.handleChange}
        selectedOption = {this.selectedOption}
        getOptions = {this.getOptions}
        handleSelectChange = {this.handleSelectChange}
        />:null}
        {/* {this.state.initilaValue ? (
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
                          options={this.getOptions(data.options)}
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
        ) : null} */}

        <Button variant="danger" onClick={() => this.updateValues()}>
          Save
        </Button>
        
      </div>
    );
  }
}

export default MyCard;
