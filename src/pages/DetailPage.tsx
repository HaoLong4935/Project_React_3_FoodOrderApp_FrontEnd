import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useParams } from "react-router-dom";
import { useState } from 'react'
import { Card, CardFooter } from "@/components/ui/card";
import OrderSummary from "@/components/OrderSummary";
import { MenuItem as MenuItemType } from "../types";
import CheckoutButton from "@/components/CheckoutButton";
import { UseFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";
export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

//TOP LEVEL COMPONENT
const DetailPage = () => {
    const { restaurantId } = useParams()
    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession()
    const { restaurant, isLoading } = useGetRestaurant(restaurantId)
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const sotredCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`)
        return sotredCartItems ? JSON.parse(sotredCartItems) : []
    })
    // Vi ta can luu lai data de dam bao khi reset van se co data de hien thi
    //Nen trong bien state ta can phai check xem la nguoi dung co data khong 
    //Neu co thi lay ra con khong thi intitial value cho no la mang rong []

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            //1. Kiem tra la da co trong gio hang chua 
            const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id)
            let updateCartItems;
            //2. Neu co thi update so luong 
            if (existingCartItem) {
                updateCartItems = prevCartItems.map((cartItem) =>
                    cartItem._id === menuItem._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
            }
            //3. Neu khong thi them vao mot item moi
            else {
                updateCartItems = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    }
                ]
            }
            //Khi dung set thi bat cu khoi code logic nao thuc hien trong set, 
            //Sau khi return thi ham set se cap nhat them gia tri vao

            //Luu y rang vi ta dang lam viec voi react nen sau khi trang web duoc reset
            //Thi ta se mat het gia tri truoc do, nen can phai luu vao phia browser roi return 
            //De khi reset lai thi van se co data de hien thi 
            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updateCartItems))
            return updateCartItems
        })
    }

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            //De xoa cai item do thi chi can loc lai danh sach cart item , cai nao co id chinh xac thi loai ra 
            const updatedCartItem = prevCartItems.filter((item) => cartItem._id !== item._id)

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItem))
            return updatedCartItem
        })
    }

    const onCheckout = async (userFormData: UseFormData) => {
        console.log("User Form data", userFormData);
        //Restaurant la mot data cua mot hook, va can phai kiem tra xem co ton tai khong de code chat che hon
        if (!restaurant) {
            return;
        }
        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string //Thuoc tinh email la optional nen can dinh nghia type 
            }
        };
        const data = await createCheckoutSession(checkoutData)
        //Sau khi gui data ve backend thi back end se tra lai 1 url 
        //Dong nay dinh nghia duong link ma web se chi dan user ve 
        window.location.href = data.url
    }

    if (isLoading || !restaurant) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={restaurant.imageUrl} alt=""
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">
                        Menu
                    </span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
                    ))}
                </div>

                <div className="">
                    <Card>
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                        />
                        <CardFooter>
                            {/* Khi nguoi dung chua them gi vao gio hang thi disabled nut go checkout */}
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                                isLoading={isCheckoutLoading}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default DetailPage;