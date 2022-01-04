import React from "react";
import {Button, Form, Table} from "semantic-ui-react";
import _ from "lodash";
import produce from "immer";

class IngredientList extends React.Component {
    state = {
        newIngredient: false,
        ingredient: null,
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

        const { ingredient } = this.state;

        const { handleFormChange } = this;

        const ingredientOptions = tableData.map(i => ({key: i.id, text:i.name, value:i.name}));

        const headerRow = ['Name', 'Quantity', 'Increase']

        const renderBodyRow = ({ name, quantity, add }, i) => ({
            key: name || `row-${i}`,
            cells: [
                name || 'No name specified',
                quantity ? { key: 'quantity', icon: 'attention', content: quantity } : 'Unknown',
                <Button
                    attached='top'
                    content="Increase"
                    onClick={() => actions.handleIncreaseIngredientClicked(name)}
                    disabled={userType !== 'manager'}
                />,
            ],
        })

        return (
            <>
                {userType === 'manager' && (
                    <>
                    <Button
                        color="green"
                        content='New Ingredient'
                        onClick={() => this.setState({newIngredient: !this.state.newIngredient})}
                    />
                        {this.state.newIngredient && (
                            <Form style={{ marginTop: '1em' , marginBottom: '1em'}}>
                                <Form.Field>
                                    <Form.Input
                                        placeholder="Name"
                                        name='ingredient.name'
                                        value={_.get(ingredient, 'name', '')}
                                        onChange={(_e, {name, value}) => handleFormChange(null, {name, value})}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        placeholder="Quantity"
                                        name='ingredient.quantity'
                                        defaultValue={_.get(ingredient, 'quantity', '')}
                                        onChange={(_e, {name, value}) => handleFormChange(null, {name, value: Number(value)})}
                                    />
                                </Form.Field>
                                <Form.Button
                                    floated='right'
                                    primary
                                    content="Add Igredient"
                                    style = {{ marginBottom: '1em' }}
                                    onClick={() => actions.addIngredient(ingredient)}
                                />
                            </Form>
                        )}
                    </>
                )}
                {userType === 'cook' && (
                    <>
                        <Button
                            color="red"
                            content='Consume Ingredient'
                            onClick={() => this.setState({consumeIngredient: !this.state.consumeIngredient})}
                        />
                        {this.state.consumeIngredient && (
                            <Form style={{ marginTop: '1em' , marginBottom: '1em'}}>
                                <Form.Field>
                                    <Form.Dropdown
                                        placeholder="Choose"
                                        options={ingredientOptions}
                                        selection
                                        value={_.get(ingredient, 'name', '')}
                                        onChange={(_e, {name, value}) => handleFormChange(null, {name: 'ingredient.name', value})}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        placeholder="Quantity"
                                        name='ingredient.quantity'
                                        defaultValue={_.get(ingredient, 'quantity', '')}
                                        onChange={(_e, {name, value}) => handleFormChange(null, {name, value: Number(value)})}
                                    />
                                </Form.Field>
                                <Form.Button
                                    floated='right'
                                    primary
                                    content="Use"
                                    style = {{ marginBottom: '1em' }}
                                    onClick={() => actions.consumeIngredient(ingredient)}
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
            </>

        );
    }
}

export default IngredientList;