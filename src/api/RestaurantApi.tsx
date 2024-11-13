import { SearchState } from "@/pages/SearchPage"
import { Restaurant, RestaurantSearchResponse } from "@/types"
import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetRestaurant = (restaurantId?: string) => {
    //Vi la get nen khong can co tham so
    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`)

        if (!response) {
            //Vi khong phai la backend nen dung throw new Error chu khong phai res.status
            throw new Error("Failed to get detail restaurant")
        }
        return response.json()
    }
    const { data: restaurant, isLoading } = useQuery(
        "fetchRestaurant",
        getMyRestaurantRequest,
        { enabled: !!restaurantId }
    ) //Function chi duoc thuc thi khi co du lieu bien restaurantId

    return {
        restaurant,
        isLoading
    }
}

//City is optional beacause when the program first load , the data is going to be undefined or null
export const useSeachRestaurant = (searchState: SearchState, city?: string) => {
    //Vi la get nen khong can co tham so
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const params = new URLSearchParams()
        params.set("searchQuery", searchState.searchQuery)
        params.set("page", searchState.page.toString())
        params.set("selectedCuisines", searchState.selectedCuisines.join(","))
        params.set("sortOption", searchState.sortOption)

        const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`)
        if (!response.ok) {
            throw new Error("Failed to search restaurant")
        }
        return response.json()
    }
    const { data: results, isLoading } = useQuery(
        ["searchRestaurant", searchState],
        createSearchRequest,
        { enabled: !!city }
    )

    return {
        results,
        isLoading
    }
}