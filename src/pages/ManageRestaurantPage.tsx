import { useGetMyRestaurant, userCreateMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = userCreateMyRestaurant()
    const { restaurant } = useGetMyRestaurant()
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant()

    const isEditing = !!restaurant
    //Restaurant is null -> !null -> true -> !!null -> false -> Means run the createRestaurant
    //Restaurant have data -> !notNull -> false -> !!notNull ー＞ true -> Means run the updateRestaurant
    return (
        <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
        />
    )
}

export default ManageRestaurantPage;