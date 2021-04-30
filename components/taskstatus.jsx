import React, {Component} from 'react'
import Divider from "antd/lib/divider"
import Row from "antd/lib/row"
import Col from "antd/lib/col"
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import NavBar from "./navbar";
import { Menu, Dropdown, Button, message} from 'antd';
import { Form, Select, Input } from 'antd';
import axios from "axios";
import _ from "lodash";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const tailLayout = {
    labelCol: { span: 8 },
    wrapperCol: { offset: 8, span: 16 },
    margintop: 2,
};

const taskStatuses = ['Unscheduled', 'In-Progress', 'Completed']


const { Option } = Select;

export default class ChangeTaskStatus extends Component {

    formRef = React.createRef();
    
    state = {
        projects: [],
        projectSelected: '',
        tasksOfProject: [],
        taskSelected: '',
        taskStatusSelected: ''
    };

    handleSubmit = async () => {
        console.log(this.state)

        const body = {
            projectname: this.state.projectSelected,
            taskname: this.state.taskSelected,
            taskstatus: this.state.taskStatusSelected
        }

        await axios
                .put('http://localhost:3900/api/tasks', {...body})
                .then(
                    async (res ) => {
                        if (res.status === 200) {
                            message.success(res.data);
                        }
                    })
                .catch(
                    (err) => {
                        message.error("Sorry, an unexpected error occurred!")
                    }
                )
    }

    handleProjectChange = (value) => {
        const tasksOfProject = []
        const tasks = this.props.tasks;
        for (let task of tasks) {
            if (value === task.projectname) {
                tasksOfProject.push(task.taskname)
            }
        }
        this.setState({projectSelected: value})
        this.setState({tasksOfProject: tasksOfProject});
    }

    handleTaskChange = (value) => {
        this.setState({taskSelected: value});
    }

    handleTaskStatusChange = (value) => {
        this.setState({taskStatusSelected: value})
    }

    handleReset = () => {
        this.formRef.current.resetFields();
    }

    componentDidMount = () => {
        console.log(this.props)
        const tasks = this.props.tasks;
        let projects = tasks.map(t => t.projectname);  
        projects = new Set(projects);
        const unique_projects = Array.from(projects, val => val)
        this.setState({projects: unique_projects})
    }
    
    render() {
        console.log(this.state);
        return (
            <React.Fragment> 
              <NavBar role = {this.props.role} email = {this.props.email}/>
                <Row style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'marginBottom': 10}}>
                <Form {...layout} size="medium"  onFinish={this.handleSubmit} ref = {this.formRef}>
                 <Form.Item 
                label="Project"
                >
                    <Select
                        showSearch
                        style = {{width: 200}}
                        placeholder="Select a project"
                        optionFilterProp="children"
                        onChange={this.handleProjectChange}
                        filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                    {this.state.projects.map((project) => (
                            <Option
                                key={project}
                                value = {project}
                            >
                            {project}
                            </Option>
                    ))}

                    </Select>
                </Form.Item>

                <Form.Item 
                label="Task" 
                >
                    <Select
                        showSearch
                        style = {{width: 200}}
                        placeholder="Select a task"
                        optionFilterProp="children"
                        onChange={this.handleTaskChange}
                        filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                       {this.state.tasksOfProject.map((task) => (
                            <Option
                                key={task}
                                value = {task}
                            >
                            {task}
                            </Option>
                    ))}
                    </Select>
                </Form.Item>

                <Form.Item 
                label="Task Status" 
                >
                    <Select
                        showSearch
                        style = {{width: 200}}
                        placeholder="Task Status"
                        optionFilterProp="children"
                        onChange={this.handleTaskStatusChange}
                        filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                       {taskStatuses.map((status) => (
                            <Option
                                key={status}
                                value = {status}
                            >
                            {status}
                            </Option>
                    ))}
                    </Select>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className = "ant-btn login-form-button ant-btn-primary">
                        Change Status
                    </Button>
                </Form.Item> 

                </Form>
                </Row>
            </React.Fragment> 
        )
    }
}