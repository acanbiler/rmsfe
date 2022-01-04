import React from "react";
import {Button, Form, Table} from "semantic-ui-react";
import produce from "immer";
import _ from "lodash";

class UserList extends React.Component {
    state = {
        newUser: false,
        user: null
    }

    handleFormChange = (_e, { name, value }) => {
        this.setState(
            produce(draft => {
                _.set(draft, name, value);
            })
        );
    };

    render() {
        const { tableData, addUser } = this.props;

        const { user } = this.state;

        const { handleFormChange } = this;

        const headerRow = ['Name', 'Role']

        const renderBodyRow = ({ name, role }, i) => ({
            key: name || `row-${i}`,
            cells: [
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
                <Button
                    primary
                    content="New User"
                    onClick={() => this.setState({newUser: !this.state.newUser})}
                />
                {this.state.newUser && (
                    <Form style={{ marginTop: '1em' }}>
                        <Form.Field>
                            <Form.Input
                                label="Name"
                                name="name"
                                value={_.get(user, 'name', '')}
                                onBlur={(_e, name, value) => handleFormChange(null, {name, value})}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                label="Password"
                                name="password"
                                value={_.get(user, 'password', '')}
                                onBlur={(_e, name, value) => handleFormChange(null, {name, value})}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                label="Role"
                                name="role"
                                value={_.get(user, 'role', '')}
                                onBlur={(_e, name, value) => handleFormChange(null, {name, value})}
                            />
                        </Form.Field>
                        <Form.Button
                            floated='right'
                            secondary
                            content="Add User"
                            onClick={() => addUser(user)}
                        />
                    </Form>
                )}
            </>
        );
    }
}

export default UserList;