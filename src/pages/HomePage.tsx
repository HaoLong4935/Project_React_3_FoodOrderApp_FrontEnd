import landingImage from "../assets/landing.png"
import downloadImage from "../assets/appDownload.png"
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate()
    const handleSearchSubmit = (searchFormValue: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValue.searchQuery}`
        })
    }

    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-orange-600"> Tuck into a takeway today </h1>
                <span className="text-xl">Food is just a click away!</span>
                <SearchBar placeholder="Search by city or town" onSubmit={handleSearchSubmit} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} alt="" />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">Order takeway even faster!</span>
                    <span>Download the MearnEats App for faster ordering and personalised recommendations</span>
                    <img src={downloadImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default HomePage;