import React from "react";
import {Container, Header, Menu} from "semantic-ui-react";
import history from "../../utils/history";
import { toast } from "react-toastify";
import {endpoints} from "../../utils/enpoints";
import _ from "lodash";
import OrderList from "../component/OrderList";

class Server extends React.Component {
    state = {
        orderList: []
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

    addOrder = async order => {
        try {
            await endpoints.placeOrder(order);
            toast.success(`Order ID ${_.get(order, "orderId")} added.`);

            this.fetchOrderList();
        } catch (error) {
            toast.error("Couldn't add order");
        }
    }

    advanceOrder = async orderId => {
        try {
            await endpoints.advanceOrder(orderId);

            toast.success(`Order ID: ${orderId} advanced!`);
            this.fetchOrderList();
        } catch (error) {
            toast.error("Couldn't advance order")
        }
    }

    revertOrder = async orderId => {
        try {
            await endpoints.revertOrder(orderId);

            toast.success(`Order ID: ${orderId} reverted!`);
            this.fetchOrderList();
        } catch (error) {
            toast.error("Couldn't revert order")
        }
    }

    render() {
        const { orderList } = this.state;

        const { addOrder, advanceOrder, revertOrder } = this;

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
                <Container text style={{ marginTop: '7em' }}>
                    <Header as='h1'>Order List</Header>
                    <OrderList userType='server' tableData={orderList} actions={actions} />
                </Container>
            </div>
        );
    }
}

export default Server;