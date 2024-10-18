import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./auth/ProtectedRoute"
import Layout from "./layouts/layout"
import AuthCallBackPage from "./pages/AuthCallBackPage"
import HomePage from "./pages/HomePage"
import UserProfilePage from "./pages/UserProfilePage"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <Layout showHero>
                    <HomePage />
                </Layout>} />
            <Route path="/auth-callback" element={<AuthCallBackPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={
                    <Layout>
                        <UserProfilePage />
                    </Layout>} />
            </Route>

        </Routes>
    )
}