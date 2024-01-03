import React, {useState} from 'react';
import OrderCard from '../Card/OrderCard';
import PageManager from './PageManager';
import SearchBar from './SearchBar';

const OrderList = ({ orders, pageItems, type }) => {

    const [filteredOrders, setFilteredOrders] = useState(orders);

    const { pageManager, currentItems: currentOrders } = PageManager(filteredOrders, pageItems);

    return (
        <div>
            <SearchBar items={orders} setItems={setFilteredOrders} placeholder={"Search orders..."} />
            <div className="row">
                {currentOrders.map((order) => (
                <div key={order.id} className="col-md-4 mb-3">
                    <OrderCard order={order} type={type}/>
                </div>
                ))}
            </div>
            { pageManager }
        </div>
    );
};

export default OrderList;
