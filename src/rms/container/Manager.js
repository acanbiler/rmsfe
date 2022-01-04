import React from "react";
import {Container, Divider, Grid, Header, List, Menu, Segment} from "semantic-ui-react";
import { toast } from "react-toastify";
import history from "../../utils/history";
import {request} from "../../utils/request";
import IngredientList from "../component/IngredientList";
import UserList from "../component/UserList";

const endpoints = {
    fetchIngredientList: () => request.get(`rms/ingredient/list`, {withCredentials: true}),
    fetchUserList: () => request.get(`rms/user/list`, {withCredentials: true}),
    addIngredient: ingredient => request.post(`rms/ingredient/add`, ingredient,{withCredentials: true}),
    addUser: user => request.post(`rms/user/add`, user,{withCredentials: true}),
}

class Manager extends React.Component {
    state = {
        activeMenu: 'ingredientList',
        ingredientList: [],
        userList: []
    }

    componentDidMount() {
        endpoints.fetchIngredientList().then(res => this.setState({ingredientList: res.data}));
        endpoints.fetchUserList().then(res => this.setState({userList: res.data}));
    }

    handleMenuClick = (_e, { name }) => this.setState({
        activeMenu: name
    });

    addUser = userData => {

    };

    handleAddIngredientClicked = name => {
        const ingredient = {
            name,
            quantity: 10,
        }

        endpoints.addIngredient(ingredient).then(res => toast.success(`10 adet ${name} eklendi`));
    };

    render() {
        const { activeMenu, ingredientList, userList } = this.state;

        const { handleMenuClick, handleAddIngredientClicked, addUser } = this;

        return (
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item header>
                            RMS - Management Panel
                        </Menu.Item>
                        <Menu.Item
                            as='a'
                            name='ingredientList'
                            active={activeMenu === 'ingredientList'}
                            onClick={handleMenuClick}
                        >
                            Ingredient List
                        </Menu.Item>
                        <Menu.Item
                            as='a'
                            name='userList'
                            active={activeMenu === 'userList'}
                            onClick={handleMenuClick}
                        >
                            User List
                        </Menu.Item>
                        <Menu.Item
                            as='a'
                            name='orderList'
                            active={activeMenu === 'orderList'}
                            onClick={handleMenuClick}
                        >
                            User List
                        </Menu.Item>
                        <Menu.Item
                            as='a'
                            name='logOut'
                            position='right'
                            onClick={() => history.push('/')}
                        >
                            Log Out
                        </Menu.Item>
                    </Container>
                </Menu>

                {activeMenu === 'ingredientList' && (
                    <Container text style={{ marginTop: '7em' }}>
                        <Header as='h1'>Ingredient List</Header>
                        <IngredientList tableData={ingredientList} action={handleAddIngredientClicked}/>
                    </Container>
                )}
                {activeMenu === 'userList' && (
                    <Container text style={{ marginTop: '7em' }}>
                        <Header as='h1'>User List</Header>
                        <UserList tableData={userList} />
                    </Container>
                )}

            </div>
        );
    }
}

export default Manager;