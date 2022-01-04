import {request} from "./request";

export const endpoints = {
    fetchIngredientList: () => request.get(`rms/ingredient/list`, {withCredentials: true}),
    addIngredient: ingredient => request.post(`rms/ingredient/add`, ingredient,{withCredentials: true}),
    increaseIngredient: ingredient => request.post(`rms/ingredient/increase`, ingredient,{withCredentials: true}),
    consumeIngredient: ingredient => request.post(`rms/ingredient/consume`, ingredient,{withCredentials: true}),
    fetchUserList: () => request.get(`rms/user/list`, {withCredentials: true}),
    addUser: user => request.post(`rms/user/add`, user,{withCredentials: true}),
    deleteUser: userId => request.post(`rms/user/delete/${userId}`,{withCredentials: true}),
    fetchOrderList: () => request.get(`rms/order/list`, {withCredentials: true}),
    placeOrder: order => request.post(`rms/order/place`, order, {withCredentials: true}),
    advanceOrder: orderId => request.post(`rms/order/advance/${orderId}`, {withCredentials:true}),
    revertOrder: orderId => request.post(`rms/order/revert/${orderId}`, {withCredentials:true}),
    bakePizza: pizza => request.post(`rms/order/pizza`, pizza, {withCredentials: true})
}
