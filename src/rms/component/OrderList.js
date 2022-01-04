import React from "react";
import {Button, Divider, Form, Header, Table} from "semantic-ui-react";
import produce from "immer";
import _ from "lodash";

const menuOptions = [
    { key: 1, text: 'Kebap', value :'Kebap' },
    { key: 2, text: 'Ayran', value :'Ayran' },
    { key: 3, text: 'Curry', value :'Curry' },
    { key: 4, text: 'Naan', value : 'Naan' },
    { key: 5, text: 'Lahmacun', value : 'Lahmacun' },
    { key: 6, text: 'Sushi', value : 'Sushi' },
    { key: 7, text: 'Noodle', value : 'Noodle' },
    { key: 8, text: 'Sake', value : 'Sake' },
    { key: 9, text: 'Chai', value : 'Chai' },
    { key: 10, text: 'Hot Chocolate', value : 'HotChocolate' },
    { key: 11, text: 'Sahlep', value : 'Sahlep' },
    { key: 12, text: 'Tea', value : 'Tea' },
    { key: 13, text: 'Pizza', value : 'Pizza' },
    { key: 14, text: 'Coffe', value : 'Coffe' },
    { key: 15, text: 'Turkish Cuisine', value : 'Turkish' },
    { key: 16, text: 'Indian Cuisine', value : 'Indian' },
    { key: 17, text: 'Asian Cuisine', value : 'Asian' },
]

class OrderList extends React.Component {
    state = {
        order: null,
        newOrder: false,
        orderIdToChange: 0
    }

    handleFormChange = (_e, { name, value }) => {
        this.setState(
            produce(draft => {
                _.set(draft, name, value);
            })
        );
    };

    render() {
        const { tableData, actions, userType } = this.props;

        const { order } = this.state;

        const { handleFormChange } = this;

        const headerRow = ['Order ID', 'Ordered Item', 'Status']

        const renderBodyRow = ({ id, orderId, orderedItem, status }, i) => ({
            key: id,
            cells: [
                orderId ? { key: 'orderId', content: orderId } : 'Unknown',
                orderedItem ? { key: 'orderedItem', content: orderedItem } : 'Unknown',
                status === 1 ? { key: 'status', content: 'Ordered' } :
                    status === 2 ? { key: 'status', content: 'Prepared' } :
                        status === 3 ? { key: 'status', content: 'Served' } : 'Unknown',
            ],
        })

        return (
            <>
                {userType === 'server' && (
                    <>
                        <Button
                            color="green"
                            content='New Order'
                            onClick={() => this.setState({newOrder: !this.state.newOrder})}
                        />
                        {this.state.newOrder && (
                            <Form style={{ marginTop: '1em' , marginBottom: '1em'}}>
                                <Form.Field>
                                    <Form.Input
                                        placeholder="Order ID"
                                        name="order.orderId"
                                        value={_.get(order, 'orderId', '')}
                                        onChange={(_e, {name, value}) => handleFormChange(null, {name, value: Number(value)})}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Dropdown
                                        placeholder="Choose from menu"
                                        options={menuOptions}
                                        selection
                                        value={_.get(order, 'orderedItem', '')}
                                        onChange={(_e, {value}) => handleFormChange(null, {name: 'order.orderedItem', value})}
                                    />
                                </Form.Field>
                                <Form.Button
                                    floated='right'
                                    primary
                                    content="Add Order"
                                    style = {{ marginBottom: '1em' }}
                                    onClick={() => actions.addOrder(order)}
                                />
                            </Form>
                        )}
                    </>
                )}
                <Table
                    celled
                    headerRow={headerRow}
                    renderBodyRow={renderBodyRow}
                    tableData={tableData}
                />
                <Divider hidden />
                <Header as='h3'>Change Order Status</Header>
                <Form>
                    <Form.Group widths = 'equal'>
                        <Form.Field>
                            <Form.Input
                                name='orderIdToChange'
                                placeholder='Order ID'
                                value={this.state.orderIdToChange}
                                onChange={(_e, { value}) => handleFormChange(null, {name: 'orderIdToChange', value})}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Button
                                content='Revert'
                                icon='left arrow'
                                labelPosition='left'
                                onClick={() => actions.revertOrder(this.state.orderIdToChange)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Button
                                content='Advance'
                                icon='right arrow'
                                labelPosition='right'
                                onClick={() => actions.advanceOrder(this.state.orderIdToChange)}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
            </>
        );
    }
}

export default OrderList;