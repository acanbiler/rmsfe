import React from "react";
import {Container, Header, Menu} from "semantic-ui-react";
import history from "../../utils/history";
import { toast } from "react-toastify";
import {endpoints} from "../../utils/enpoints";
import _ from "lodash";
import OrderList from "../component/OrderList";
import Baverages from "../component/Baverages";
import produce from "immer";

class Server extends React.Component {
    state = {
        activeMenu: 'orderList',
        orderList: [],
        baverage: '',
        baverageState: '',
        coffee: {
            mocha: false,
            milk: false,
            whip: false
        },
    }

    componentDidMount() {
        this.fetchOrderList();
    }

    fetchOrderList = async () => {
        try {
            const res = await endpoints.fetchOrderList();

            this.setState({orderList: res.data});
        } catch (error) {
            toast.error("Couldn't get orders!");
        }
    }

    handleMenuClick = (_e, { name }) => this.setState({
        activeMenu: name
    });

    handleBaverageSelected = (_e, { name, value }) => {
        this.setState(
            produce(draft => {_.set(draft, name, value);})
        );
    };

    prepareBaverage = () => {
        const { baverage, coffee } = this.state;
        if (baverage !== 'coffee') {
            endpoints.prepareBaverage(baverage)
                .then(res => this.setState({ baverageState: res.data }))
                .catch(err => this.setState({ baverageState: "Baverage spilled." }));
        } else {
            endpoints.prepareCoffee(coffee)
                .then(res => this.setState({ baverageState: res.data }))
                .catch(err => this.setState({ baverageState: "Baverage spilled." }));
        }
    };

    addOrder = async order => {
        try {
            await endpoints.placeOrder(order);
            toast.success(`Order ID ${_.get(order, "orderId")} added.`);

            this.fetchOrderList();
        } catch (error) {
            toast.error("Couldn't add order");
        }
    };

    advanceOrder = async orderId => {
        try {
            const res = await endpoints.advanceOrder(orderId);

            if (res.data)
                toast.success(`Order ID: ${orderId} advanced!`);
            else
                toast.info(`Order ID: ${orderId} cannot be advanced anymore!`);
            this.fetchOrderList();
        } catch (error) {
            toast.error("Couldn't advance order")
        }
    };

    revertOrder = async orderId => {
        try {
            const res = await endpoints.revertOrder(orderId);

            if (res.data)
                toast.success(`Order ID: ${orderId} reverted!`);
            else
                toast.info(`Order ID: ${orderId} cannot be reverted anymore!`);
            this.fetchOrderList();
        } catch (error) {
            toast.error("Couldn't revert order")
        }
    };

    render() {
        const { orderList, activeMenu, baverage, baverageState, coffee } = this.state;

        const {
            addOrder,
            advanceOrder,
            revertOrder,
            handleMenuClick,
            handleBaverageSelected,
            prepareBaverage,
        } = this;

        const actions = {
            addOrder,
            advanceOrder,
            revertOrder
        };

        return (
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item header>
                            RMS - Server Panel
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
                            name='baveragesList'
                            active={activeMenu === 'baveragesList'}
                            onClick={handleMenuClick}
                        >
                            Baverages
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
                        <OrderList userType='server' tableData={orderList} actions={actions} />
                    </Container>
                )}
                {activeMenu === 'baveragesList' && (
                    <Container text style={{ marginTop: '7em' }}>
                        <Header as='h1'>Baverages</Header>
                        <Baverages
                            baverage={baverage}
                            baverageState={baverageState}
                            handleFormChange={handleBaverageSelected}
                            prepareBaverage={prepareBaverage}
                            coffee={coffee}
                        />
                    </Container>
                )}
            </div>
        );
    }
}

export default Server;