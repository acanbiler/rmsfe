import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import produce from "immer";
import _ from "lodash";
import { toast } from "react-toastify";
import { request } from "../../utils/request";
import history from "../../utils/history";

const endpoints = {
    fetchUserType: (username, password) => request.get(`rms/user/${username}/${password}`, {withCredentials: true})
}

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    handleFormChange = (_e, { name, value }) => {
        this.setState(
            produce(draft => {
                _.set(draft, name, value);
            })
        );
    };

    handleLoginClicked = () => {
        const { username, password } = this.state;

        if (username === '')
            toast.error("Username cannot be empty.");
        if (password === '')
            toast.error("Password cannot be empty");
        endpoints.fetchUserType(username, password)
            .then(res => {
                switch (res.data) {
                    case 'manager':
                        history.push('/manager-panel');
                        break;
                    case 'cook':
                        history.push('/cook-panel');
                        break;
                    case 'server':
                        history.push('/server-panel');
                        break;
                    default:
                        break;
                }
            }).catch(_err => toast.error("Kullanıcı bulunamadı!"));
    };

    render() {
        const { username } = this.state;

        const { handleFormChange, handleLoginClicked } = this;

        return (
            <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Name'
                                value={username}
                                onChange={(_e, { value }) => handleFormChange(null, { name: 'username', value })}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={(_e, { value }) => handleFormChange(null, { name: 'password', value })}
                            />
                            <Button color='teal' fluid size='large' onClick={handleLoginClicked}>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;