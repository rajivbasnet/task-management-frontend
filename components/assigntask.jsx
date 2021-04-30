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


const { Option } = Select;

export default class AssignTask extends Component {

    formRef = React.createRef();

    state = {
        users: [],
        userSelected: '',
        projects: [],
        projectSelected: '',
        tasks: [],
        taskSelected: ''

    };

    handleSubmit = async () => {

        const body =  {
            projectname: this.state.projectSelected,
            taskname: this.state.taskSelected,
            assignedto: this.state.userSelected,
            taskstatus: "Unscheduled"
        }
        
        await axios
                .post('http://localhost:3900/api/tasks', {...body})
                .then(
                    async (res) => {
                        if (res.status === 200) {
                            message.success(res.data)
                        }
                        else if (res.status === 208){
                            message.warning(res.data)
                        }
                    })
                .catch( err => {
                    message.error('Sorry an error occurred! Please try again!!!')
                }
            )
    }

    handleProjectChange = (value) => {
        this.setState({projectSelected: value});
    }

    handleUserChange = (value) => {
        this.setState({userSelected: value});
    }

    handleTaskChange = (event) => {
        this.setState({taskSelected: event.target.value});
    }


    handleReset = () => {
        this.formRef.current.resetFields();
    }

    async componentDidMount() {
        
        await axios
                .get('http://localhost:3900/api/users/users')
                .then(
                    async (res ) => {
                        if (res.status === 200) {
                            // const values = _.uniq(_.map(res.data, 'assignedto'))
                            // console.log(values);
                            this.setState({users: res.data})
                        }
                    })
                .catch(
                    (err) => {
                        console.log("Sorry, an unexpected error occurred")
                    }
                )


        await axios
                .get('http://localhost:3900/api/tasks/')
                .then(
                    async (res ) => {
                        if (res.status === 200) {
                            const values = _.uniq(_.map(res.data, 'projectname'))
                            this.setState({projects: values})
                        }
                    })
                .catch(
                    (err) => {
                        console.log("Sorry, an unexpected error occurred")
                    }
                )
    }
    
    render() {
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
                label="User" 
                >
                    <Select
                        showSearch
                        style = {{width: 200}}
                        placeholder="Select a user"
                        optionFilterProp="children"
                        onChange={this.handleUserChange}
                        filterOption={(input, option) =>
                        option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                       {this.state.users.map((user) => (
                            <Option
                                key={user}
                                value = {user}
                            >
                            {user}
                            </Option>
                    ))}
                    </Select>
                </Form.Item>


                <Form.Item
                    name="task"
                    label="Enter Task"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a task',
                        },
                    ]}
                    >
                        <Input style = {{width: 200}} onChange = {this.handleTaskChange}/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className = "ant-btn login-form-button ant-btn-primary">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick = {this.handleReset}>
                        Reset
                    </Button>
                </Form.Item>

                </Form>
                </Row>
            </React.Fragment> 
        )
    }
}