import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    // console.log(_.get(item, column.path))
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  getClassName = (item, column) => {
    if (column.path.toLowerCase() === 'taskstatus') {
      if (item.taskstatus.toLowerCase() === 'completed') {
        return "text-success"
      }
      else if (item.taskstatus.toLowerCase() === 'unscheduled'){
        return "text-danger"
      }
      else {
        return "text-secondary"
      }
    }
    if (column.path.toLowerCase() === 'assignedto' || column.path.toLowerCase() === 'payeeemail')  {
      return "text-primary"
    } 
    if (column.path.toLowerCase() === 'amountpaid') return "text-success"
    return "text-dark"
  }

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)} >
                {""}
                <p className = {this.getClassName(item, column)}> {this.renderCell(item, column)} </p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;