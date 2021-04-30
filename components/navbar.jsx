import React, {Component} from 'react'
import Divider from "antd/lib/divider"
import Row from "antd/lib/row"
import Col from "antd/lib/col"
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { MailOutlined, AppstoreAddOutlined, SettingOutlined, PlusOutlined, MessageOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

export default class NavBar extends React.Component {
    state = {current: 'viewtasks'};

    handleClick = e => {
        if (e.key === 'logout') {
            window.location = "/login";
        }
        else if (e.key === 'assigntask') {
            window.location = "/admin/assigntask"
        }
        else if (e.key === 'changetaskstatus') {
            window.location = "/taskstatus"
        }
        else if (e.key === "paystatus") {
            window.location = "/paystatus"
        }
        else if (e.key === "adduser") {
            window.location = "/admin/adduser"
        }
        else if (e.key === "viewtasks") {
            window.location = this.props.role === "admin" ? "/admin" : "/user"
        }
       
        this.setState({ current: e.key });
    };

    render() {
        return (
            <React.Fragment>
                <div>
                    <Row className = "bg-light" style={{display: 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'marginBottom': 20}}> 
                        <Col>
                            <Row style={{display: 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'marginTop': 20}}>
                                <Avatar size={50} icon={<UserOutlined/>}  style={{ backgroundColor: '#87d068' }} />
                            </Row >
                            <Divider> </Divider>
                            <Row style={{display: 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>
                                <h5> {this.props.email}  </h5>                           
                            </Row>
                            <Row style={{display: 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>
                                <h6> ({this.props.role}) </h6>                           
                            </Row>
                        </Col>
                    </Row>
                    <Divider> </Divider>

                    <Row style={{display: 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'marginBottom': 20}}> 
                            <Menu  className = 'text-info' style={{float: 'right'}} onClick={this.handleClick} mode="horizontal">
                                    <Menu.Item  key="viewtasks" icon={<MailOutlined />}>
                                    View Tasks
                                    </Menu.Item>

                                    {this.props.role === 'admin' && <Menu.Item key="assigntask" icon={<AppstoreAddOutlined />}>
                                    Assign Task
                                    </Menu.Item>}

                                    {this.props.role === 'admin' && <Menu.Item key="adduser" icon={<PlusOutlined />}>
                                    Add User
                                    </Menu.Item>}

                                    <Menu.Item  key="messages" icon={<MessageOutlined />}>
                                    Messages
                                    </Menu.Item>

                                    <SubMenu key="settings" icon={<SettingOutlined />} title="Settings">
                                        <Menu.Item key="changetaskstatus"> Change Task Status </Menu.Item>
                                        <Menu.Item key="paystatus"> View Payment </Menu.Item>
                                        <Menu.Item key="logout"> Logout</Menu.Item>
                                    </SubMenu>
                                </Menu>
                    </Row>
                </div>
                
            </React.Fragment>
        );
    }
}