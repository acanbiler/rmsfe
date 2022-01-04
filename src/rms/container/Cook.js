import React from "react";
import {Container, Header, Menu} from "semantic-ui-react";
import history from "../../utils/history";
import IngredientList from "../component/IngredientList";
import {endpoints} from "../../utils/enpoints";
import OrderList from "../component/OrderList";
import {toast} from "react-toastify";
import _ from "lodash";
import produce from "immer";
import PizzaMenu from "../component/PizzaMenu";

class Cook extends React.Component {
    state = {
        activeMenu: 'orderList',
        ingredientList: [],
        orderList: [],
        pizza: null
    }

    componentDidMount() {
        this.fetchIngredientList();
        endpoints.fetchOrderList().then(res => this.setState({orderList: res.data}))
    }

    fetchIngredientList = () => {
        endpoints.fetchIngredientList().then(res => this.setState({ingredientList: res.data}));
    }
    handleMenuClick = (_e, { name }) => this.setState({
        activeMenu: name
    });

    consumeIngredient = async ingredient => {
        try {
            await endpoints.consumeIngredient(ingredient);

            toast.success(`${ingredient.name} is used`);
            this.fetchIngredientList();
        } catch (error) {
            toast.error("Couldn't consume.");
        }
    };

    handlePizzaChange = (_e, { name, value }) => {
        const { pizza } = this.state;

        this.setState(
            produce(draft => {_.set(draft, name, value);})
        );

        if (name === "pizza.size")
            this.setState(
                produce(draft => {
                    _.set(draft, "pizza.cheese", false);
                    _.set(draft, "pizza.pepperoni", false);
                    _.set(draft, "pizza.mushroom", false);
                    _.set(draft, "pizza.price", value *  20);
                })
            );
        if (name === "pizza.cheese" && value)
            this.setState(
                produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") +  5);})
            );
        if (name === "pizza.mushroom" && value)
            this.setState(
                produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") +  10);})
            );
        if (name === "pizza.pepperoni" && value)
            this.setState(produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") +  15);}));
        if (name === "pizza.cheese" && value === false)
            this.setState(produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") -  5);}));
        if (name === "pizza.mushroom" && value  === false)
            this.setState(produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") -  10);}));
        if (name === "pizza.pepperoni" && value  === false)
            this.setState(produce(draft => {_.set(draft, "pizza.price", _.get(pizza, "price") -  15);}));
    };

    order = async () => {
        const { pizza } = this.state;

        try {
            const res = await endpoints.bakePizza(_.omit(pizza, 'price'));

            this.setState({ pizza: res.data })
            toast.success(`Baked pizza with cost ${res.data.cost}`);
        } catch (error) {
            toast.error("Owen malfunction")
        }
    };

    render() {
        const { activeMenu, ingredientList, orderList, pizza } = this.state;

        const { handleMenuClick, consumeIngredient, handlePizzaChange, order } = this;

        const actions = { consumeIngredient };

        return (
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item header>
                            RMS - Cook Panel
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
                            name='ingredientList'
                            active={activeMenu === 'ingredientList'}
                            onClick={handleMenuClick}
                        >
                            Ingredients
                        </Menu.Item>
                        <Menu.Item
                            as='a'
                            name='pizzaMenu'
                            active={activeMenu === 'pizzaMenu'}
                            onClick={handleMenuClick}
                        >
                            Pizza Menu
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
                {activeMenu === 'orderList' && (
                    <Container text style={{ marginTop: '7em' }}>
                        <Header as='h1'>Order List</Header>
                        <OrderList userType='cook' tableData={orderList} />
                    </Container>
                )}
                {activeMenu === 'ingredientList' && (
                    <Container text style={{ marginTop: '7em' }}>
                        <Header as='h1'>Ingredient List</Header>
                        <IngredientList userType='cook' tableData={ingredientList} actions={actions}/>
                    </Container>
                )}
                {activeMenu === 'pizzaMenu' && (
                    <Container text style={{ marginTop: '7em' }}>
                        <Header as='h1'>Pizza Menu</Header>
                        <PizzaMenu handleFormChange={handlePizzaChange} pizza={pizza} order={order}/>
                    </Container>
                )}
            </div>
        );
    }
}

export default Cook;