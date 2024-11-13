import { useGetMyUser } from "@/api/MyUserApi";
import UserProfileForm, { UseFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type Props = {
    onCheckout: (userFormData: UseFormData) => void,
    disabled: boolean,
    isLoading: boolean
}
const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()
    const { pathname } = useLocation()
    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser()


    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            }
        })
    }

    if (!isAuthenticated) {
        return (
            <Button
                className="bg-orange-500 flex-1"
                onClick={onLogin}
            >
                Log in to check out
            </Button>
        )
    }

    if (isAuthLoading || !currentUser || isLoading) {
        return <LoadingButton />
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-green-500 flex-1">
                    Go to checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <DialogHeader>
                    <DialogTitle>Detail order</DialogTitle>
                    <DialogDescription>
                        Make sure to check your item carefully when submit
                    </DialogDescription>
                </DialogHeader>
                <UserProfileForm
                    onSave={onCheckout}
                    isLoading={isGetUserLoading}
                    currentUser={currentUser}
                    title="Confirm Delivery Details"
                    buttonText="Continue to payment" />
            </DialogContent>
        </Dialog>
    );
}

export default CheckoutButton;