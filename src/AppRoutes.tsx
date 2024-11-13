import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./auth/ProtectedRoute"
import Layout from "./layouts/layout"
import AuthCallBackPage from "./pages/AuthCallBackPage"
import DetailPage from "./pages/DetailPage"
import HomePage from "./pages/HomePage"
import ManageRestaurantPage from "./pages/ManageRestaurantPage"
import SearchPage from "./pages/SearchPage"
import UserProfilePage from "./pages/UserProfilePage"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <Layout showHero>
                    <HomePage />
                </Layout>} />
            <Route path="/auth-callback" element={<AuthCallBackPage />} />

            <Route path="/search/:city" element={<Layout showHero={false}><SearchPage /></Layout>} />
            <Route path="/detail/:restaurantId" element={<Layout showHero={false}><DetailPage /></Layout>} />

            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={
                    <Layout>
                        <UserProfilePage />
                    </Layout>} />

                <Route path="/manage-restaurant" element={
                    <Layout>
                        <ManageRestaurantPage />
                    </Layout>} />
            </Route>


        </Routes>
    )
}