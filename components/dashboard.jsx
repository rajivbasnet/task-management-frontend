import React, {Component} from 'react'
import Divider from "antd/lib/divider"
import Row from "antd/lib/row"
import Col from "antd/lib/col"
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import NavBar from "./navbar";
import TasksTable from "./tasks"

export default class DashBoard extends Component {
    state = {
    };

    render() {
        return (
            <div> 
              <NavBar role = {this.props.role} email = {this.props.email}/>
              <TasksTable role = {this.props.role} email = {this.props.email} tasks = {this.props.tasks} />
            </div>
        )
    }
}