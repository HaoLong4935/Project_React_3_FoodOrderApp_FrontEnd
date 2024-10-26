import { Restaurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (!response.ok) {
            throw new Error("Failed to create user")
        }
        return response.json()
    }

    const {
        data: restaurant,
        isLoading,
    } = useQuery("fetchMyRestaurant", getMyRestaurantRequest);

    return { restaurant, isLoading }
}

export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        })

        if (!response.ok) {
            throw new Error("Failed to update user")
        }
        return response.json()
    }

    const {
        mutate: updateRestaurant,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(updateMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant update success")
    }
    if (isError) {
        toast.error("Restaurant update failed")
    }

    return {
        updateRestaurant,
        isLoading
    }
}

export const userCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        })

        if (!response.ok) {
            throw new Error("Failed to create user")
        }
        return response.json()
    }

    //Sau khi gui du lieu ve phia backend va backend tra lai data la response.json()
    //Can lay data do, su dung redux de luu vao 

    const {
        mutate: createRestaurant,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant create success")
    }
    if (isError) {
        toast.error("Restaurant create failed")
    }

    return {
        createRestaurant,
        isLoading
    }
}