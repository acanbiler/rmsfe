import React from "react";
import {Container, Header, Menu} from "semantic-ui-react";
import { toast } from "react-toastify";
import history from "../../utils/history";
import IngredientList from "../component/IngredientList";
import UserList from "../component/UserList";
import {endpoints} from "../../utils/enpoints";
import OrderList from "../component/OrderList";

class Manager extends React.Component {
    state = {
        activeMenu: 'ingredientList',
        ingredientList: [],
        userList: [],
        orderList: []
    }

    componentDidMount() {
        this.fetchIngredientList();
        this.fetchOrderList();
        this.fetchUserList();
    };

    fetchOrderList = () => {
        endpoints.fetchOrderList().then(res => this.setState({orderList: res.data}));
    };

    fetchIngredientList = () => {
        endpoints.fetchIngredientList().then(res => this.setState({ingredientList: res.data}));
    };

    fetchUserList = () => {
        endpoints.fetchUserList().then(res => this.setState({userList: res.data}));
    };

    handleMenuClick = (_e, { name }) => this.setState({
        activeMenu: name
    });

    addUser = async userData => {
        try {
            await endpoints.addUser(userData);
            toast.success(`User with name: ${userData.name} added.`)
            this.fetchUserList();
        } catch (error) {
            toast.error("Couldn't add user");
        }
    };

    deleteUser = async userId => {
        try {
            await endpoints.deleteUser(userId);
            toast.success(`User with id: ${userId} added.`)
            this.fetchUserList();
        } catch (error) {
            toast.error("Couldn't delete user");
        }
    };

    addIngredient = async ingredient => {
        try {
            await endpoints.addIngredient(ingredient);

            toast.success(`Added ${ingredient.name}`);
            this.fetchIngredientList();
        } catch (error) {
            toast.error("Couldn't add ingredient")
        }
    };

    handleIncreaseIngredientClicked = async name => {
        const ingredient = {
            name,
            quantity: 10,
        }

        try {
            await endpoints.increaseIngredient(ingredient);

            toast.success(`Added 10 ${name}s`);
            this.fetchIngredientList();
        } catch (error) {
            toast.error("Couldn't increase ingredient")
        }
    };

    render() {
        const { activeMenu, ingredientList, userList, orderList } = this.state;

        const { handleMenuClick, addIngredient, handleIncreaseIngredientClicked, addUser, deleteUser } = this;

        const actions = {
            addUser,
            deleteUser
        };

        const ingrActions = {
            addIngredient,
            handleIncreaseIngredientClicked
        };

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
                            Ingredients
                        </Menu.Item>
                        <Menu.Item
                            as='a'
                            name='userList'
                            active={activeMenu === 'userList'}
                            onClick={handleMenuClick}
                        >
                            Users
                        </Menu.Item>
                        <Menu.Item
                            as='a'
                            name='orderList'
                            active={activeMenu === 'orderList'}
                            onClick={handleMenuClick}
                        >
                            Orders
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
                        <IngredientList userType='manager' tableData={ingredientList} actions={ingrActions}/>
                    </Container>
                )}
                {activeMenu === 'userList' && (
                    <Container text style={{ marginTop: '7em' }}>
                        <Header as='h1'>User List</Header>
                        <UserList tableData={userList} actions={actions} />
                    </Container>
                )}
                {activeMenu === 'orderList' && (
                    <Container text style={{ marginTop: '7em' }}>
                        <Header as='h1'>Order List</Header>
                        <OrderList userType='manager' tableData={orderList} />
                    </Container>
                )}
            </div>
        );
    }
}

export default Manager;