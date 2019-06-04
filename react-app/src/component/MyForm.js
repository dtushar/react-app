import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Select from "react-select";

class MyForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table striped bordered >
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Discription</th>
          </tr>
        </thead>
        <tbody>
          {this.props.displayData.map(data => {
            return (
              <tr key={data.key} style={{ cursor: "pointer" }}>
                <td>{data.label}</td>
                <td>
                  {data.type === "text" ? (
                    <input
                      defaultValue={data.value}
                      onChange={e =>
                        this.props.handleInput(data, e.target.value)
                      }
                    />
                  ) : data.type === "select" ? (
                    <Select
                      value={this.props.selectedOption(data.value)}
                      onChange={this.handleSelectChange}
                      options={this.props.getOptions(data.options)}
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
    );
  }
}

export default MyForm;
