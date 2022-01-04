import React from "react";
import {Button, Form, Table} from "semantic-ui-react";
import produce from "immer";
import _ from "lodash";

const roleOptions = [
    { key: 1, text: 'Manager', value :1 },
    { key: 2, text: 'Cook', value :2 },
    { key: 3, text: 'Server', value :3 },
]
class UserList extends React.Component {
    state = {
        newUser: false,
        user: null,
        userIdToDelete: ''
    }

    handleFormChange = (_e, { name, value }) => {
        this.setState(
            produce(draft => {
                _.set(draft, name, value);
            })
        );
    };

    render() {
        const { tableData, actions } = this.props;

        const { user } = this.state;

        const { handleFormChange } = this;

        const headerRow = ['Id', 'Name', 'Role']

        const renderBodyRow = ({ id, name, role }, i) => ({
            key: id,
            cells: [
                id,
                name || 'No name specified',
                role ? { key: 'role', content: role === 1 ? 'manager' : role === 2 ? 'cook' : 'server'} : 'Unknown',
            ],
        })

        return (
            <>
                <Table
                    celled
                    headerRow={headerRow}
                    renderBodyRow={renderBodyRow}
                    tableData={tableData}
                />
                <>
                    <Form style={{ marginTop: '1em' }}>
                        <Form.Group widths='equal'>
                            <Form.Input
                                placeholder='User ID'
                                name="userIdToDelete"
                                value={this.state.userIdToDelete}
                                onChange={(_e, {name, value}) => handleFormChange(null, {name, value})}
                            />
                            <Form.Button
                                color='red'
                                content="Delete User"
                                onClick={() => actions.deleteUser(this.state.userIdToDelete)}
                            />
                        </Form.Group>
                    </Form>
                </>
                <Button
                    primary
                    content="New User"
                    onClick={() => this.setState({newUser: !this.state.newUser})}
                />
                {this.state.newUser && (
                    <Form style={{ marginTop: '1em' }}>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <Form.Input
                                    placeholder="Name"
                                    name="user.name"
                                    value={_.get(user, 'name', '')}
                                    onChange={(_e, {name, value}) => handleFormChange(null, {name, value})}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    placeholder="Password"
                                    name="user.password"
                                    value={_.get(user, 'password', '')}
                                    onChange={(_e, {name, value}) => handleFormChange(null, {name, value})}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Dropdown
                                    placeholder="Choose role"
                                    name="role"
                                    options={roleOptions}
                                    selection
                                    value={_.get(user, 'role', '')}
                                    onChange={(_e, {value}) => handleFormChange(null, {name:'user.role', value})}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Button
                            floated='right'
                            secondary
                            content="Add User"
                            onClick={() => actions.addUser(user)}
                        />
                    </Form>
                )}
            </>
        );
    }
}

export default UserList;