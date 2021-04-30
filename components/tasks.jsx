import React from 'react'
import Row from "antd/lib/row"
import Col from "antd/lib/col"
import Table from "./common/table";
import _ from 'lodash';

export default class TasksTable extends React.Component {
    state = {
        ...this.props,
        sortColumn: {path: 'projectname', order: 'asc'}
    }

    getColumns = () => {
        let columns = [
            {
                path: 'projectname',
                label: 'Project Name'
            },
            {
                path: 'taskname',
                label: 'Task Name',
            },
            {
                path: 'taskstatus',
                label: 'Status'
            }
        ]

        if (this.state.role == 'admin') {
            columns.push({path: 'assignedto', label: "Assigned To"});
        }

        return columns;
    }

    handleSort = (sortColumn) => {
        this.setState({sortColumn});
    }

    getPageData = () => {
        const {tasks, sortColumn} = this.state;
        const sorted = _.orderBy(tasks, [sortColumn.path], [sortColumn.order])
        return sorted;
    }


    render() {
        const sortColumn = this.state.sortColumn;
        const tasks = this.getPageData();

        return (
            <React.Fragment> 
                <Row style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'marginBottom': 20}}> 
                    <Table 
                        columns = {this.getColumns()}
                        data = {tasks}
                        sortColumn ={sortColumn}
                        onSort = {this.handleSort}
                    />
                </Row>
            </React.Fragment>
        )
    }
}