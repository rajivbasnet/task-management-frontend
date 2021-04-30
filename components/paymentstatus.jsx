import React from 'react'
import Row from "antd/lib/row"
import Col from "antd/lib/col"
import Table from "./common/table";
import _ from 'lodash';
import NavBar from "./navbar";

export default class PaymentsTable extends React.Component {
    state = {
        ...this.props,
        sortColumn: {path: 'projectname', order: 'asc'}
    }

    getColumns = () => {
        let columns = [
            // {
            //     path: 'payeeEmail',
            //     label: 'Payee Email'
            // },
            {
                path: 'paidAt',
                label: 'Paid At',
            },
            {
                path: 'amountPaid',
                label: 'Amount Paid'
            }
        ]

        if (this.state.role == 'admin') {
            columns.push({path: 'payeeEmail', label: "Payee Emaiil"});
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
                <NavBar role = {this.props.role} email = {this.props.email}/>
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