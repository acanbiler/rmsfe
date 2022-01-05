import React from "react";
import {Checkbox, Form, Label, Radio, TextArea} from "semantic-ui-react";
import _ from "lodash";

class Baverages extends React.Component {
    render() {
        const { handleFormChange, baverage, baverageState, prepareBaverage, coffee } = this.props;

        return (
            <>
                <Form>
                    <Form.Group>
                        <label>Select from baverages: </label>
                        <Form.Field>
                            <Radio
                                label='Tea'
                                name='baverage'
                                value='tea'
                                checked={baverage === 'tea'}
                                onChange={handleFormChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Sahlep'
                                name='baverage'
                                value='sahlep'
                                checked={baverage === 'sahlep'}
                                onChange={handleFormChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Hot Chocolate'
                                name='baverage'
                                value='hotchocolate'
                                checked={baverage === 'hotchocolate'}
                                onChange={handleFormChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Coffee'
                                name='baverage'
                                value='coffee'
                                checked={baverage === 'coffee'}
                                onChange={handleFormChange}
                            />
                        </Form.Field>
                    </Form.Group>
                    {baverage === 'coffee' && (
                        <>
                            <Label pointing="below" style={{ marginBottom: '1em' }}>
                                Ingredients
                            </Label>
                            <Form.Field>
                                <Checkbox
                                    label='Milk'
                                    value='milk'
                                    checked={_.get(coffee, "milk")}
                                    onChange={(_e, { checked }) => handleFormChange(null, { name: 'coffee.milk', value: checked })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    label='Mocha'
                                    value='mocha'
                                    checked={_.get(coffee, "mocha")}
                                    onChange={(_e, { checked }) => handleFormChange(null, { name: 'coffee.mocha', value: checked })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    label='Whip'
                                    value='whip'
                                    checked={_.get(coffee, "whip")}
                                    onChange={(_e, { checked }) => handleFormChange(null, { name: 'coffee.whip', value: checked })}
                                />
                            </Form.Field>
                        </>
                    )}
                    <Form.Button
                        size="large"
                        secondary
                        onClick={prepareBaverage}
                        color='orange'
                        disabled={baverage === ""}
                        style={{
                            marginBottom: '0.5em',
                        }}
                    >
                        Prepare Baverage
                    </Form.Button>
                </Form>
                {baverage !== '' && (
                    <TextArea
                        style={{ minHeight: 100, minWidth:300 }}
                        placeholder='Baverage state...'
                        value={baverageState}
                    />
                )}
            </>
        );
    }
}

export default Baverages;