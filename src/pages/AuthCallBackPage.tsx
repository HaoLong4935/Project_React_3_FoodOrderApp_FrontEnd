import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallBackPage = () => {
    const navigate = useNavigate()
    const { user } = useAuth0()
    const { createUser } = useCreateMyUser()
    const hasCreatedUser = useRef(false)
    useEffect(() => {
        // console.log("Current user", user);
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            //Gọi backend tạo account User và cập nhật lại giá trị hasCreated để tránh re-render
            createUser({ auth0Id: user.sub, email: user.email })
            hasCreatedUser.current = true
        }
        navigate("/")
    }, [createUser, navigate, user])

    return <>Loading...</>
}

export default AuthCallBackPage;