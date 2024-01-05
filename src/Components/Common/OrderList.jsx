import React, {useState, useEffect} from 'react';
import OrderCard from '../Card/OrderCard';
import PageManager from './PageManager';
import SearchBar from './SearchBar';
import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';

const OrderList = ({ orders, pageItems, type }) => {

    const [filteredOrders, setFilteredOrders] = useState(orders);

    const { pageManager, currentItems: currentOrders } = PageManager(filteredOrders, pageItems);

    const { handleFetch: getStatuses, data: statuses, error: statusesError } = useAPIFetch({
        url: getUrl({ endpoint: "STATUS" })
    })

    useEffect(() => {
        getStatuses();
    }, [])

    return (
        <div>
            <SearchBar items={orders} setItems={setFilteredOrders} placeholder={"Search orders..."} />
            <div className="row">
                { !statusesError &&
                    currentOrders.map((order) => (
                    <div key={order.id} className="col-md-4 mb-3">
                        <OrderCard order={order} type={type} statuses={statuses}/>
                    </div>
                ))}
            </div>
            { pageManager }
        </div>
    );
};

export default OrderList;
