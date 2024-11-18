import OrderStatusDetail from '@/components/OrderStatusDetail';
import OrderStatusHeader from '@/components/OrderStatusHeader';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useGetMyOrders } from '../api/OrderApi';
const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders()

    if (isLoading) {
        return <>"Loading ..."</>
    }
    if (!orders || orders.length === 0) {
        return <>"No Orders found"</>
    }
    return (
        <div className='space-y-10'>
            {orders.map((order) => {
                return (
                    <div className='space-y-10 bg-gray-50 rounded'>
                        <OrderStatusHeader order={order} />
                        <div className='grid md:grid-cols-2 gap-10'>
                            <OrderStatusDetail order={order} />
                            <AspectRatio ratio={16 / 4}>
                                <img
                                    className='rounded-md object-cover h-full w-full'
                                    src={order.restaurant.imageUrl}
                                    alt="" />
                            </AspectRatio>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default OrderStatusPage;