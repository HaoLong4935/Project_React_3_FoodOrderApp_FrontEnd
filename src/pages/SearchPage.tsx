import { useSeachRestaurant } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string
    page: number;
    selectedCuisines: string[],
    sortOption: string,
}

const SearchPage = () => {
    const { city } = useParams()
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch"
    })
    const { results, isLoading } = useSeachRestaurant(searchState, city)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const setSortOtion = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1
        }))
    }

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }))
    }

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page
        }))
    }

    const setSearchQuery = (searchFromData: SearchForm) => {
        setSearchState((prevState) => (
            {
                ...prevState,
                searchQuery: searchFromData.searchQuery,
                page: 1, //When user search a new query , bring the navigation to 1
            }
        ))
    }

    const resetSearch = () => {
        setSearchState((prevState) => (
            {
                ...prevState,
                searchQuery: ""
            }
        ))
    }

    if (isLoading) {
        <span>Loading...</span>
    }
    //Edge case
    if (!results?.data || !city) {
        return <span>No resutls found</span>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
                />
            </div>
            <div id="main content" className="flex flex-col gap-5 p-4 sm:p-8 md:p-4 lg:p-0">
                <SearchBar
                    //searchQuery={searchState.searchQuery} để có thể presist data, mỗi khi render lại không bị mất data
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeholder="Search by cuisine or restaurant name"
                    onReset={resetSearch} />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={results.pagination.total} city={city} />
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOtion(value)} />
                </div>
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant} />
                ))}
                <PaginationSelector
                    page={results.pagination.page}
                    pages={results.pagination.pages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}

export default SearchPage;