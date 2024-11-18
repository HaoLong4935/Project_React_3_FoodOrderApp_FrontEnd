import { useGetMyRestaurant, useGetMyRestaurantOrders, userCreateMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = userCreateMyRestaurant()
    const { restaurant } = useGetMyRestaurant()
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant()
    const { orders } = useGetMyRestaurantOrders()
    const isEditing = !!restaurant
    //Restaurant is null -> !null -> true -> !!null -> false -> Means run the createRestaurant
    //Restaurant have data -> !notNull -> false -> !!notNull ー＞ true -> Means run the updateRestaurant
    return (
        <Tabs>
            <TabsList defaultValue="orders">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-5 bg-gray-50 pg-10 rounded-lg">
                <h2 className="text-2xl font-bold">
                    {/* Khi cu lay mot prop ma no khong o trong component nay thi nen co dau cham hoi de khong bi bug */}
                    {orders?.length} active orders
                </h2>
                {orders?.map((order) => (
                    <OrderItemCard order={order} />
                ))}
            </TabsContent>
            <TabsContent value="manage-restaurant">
                <ManageRestaurantForm
                    restaurant={restaurant}
                    onSave={isEditing ? updateRestaurant : createRestaurant}
                    isLoading={isCreateLoading || isUpdateLoading}
                />
            </TabsContent>
        </Tabs>

    )
}

export default ManageRestaurantPage;