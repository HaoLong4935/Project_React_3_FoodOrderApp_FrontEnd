import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { convertRoutesToDataRoutes } from "@remix-run/router/dist/utils";
import { Delete, DeleteIcon, Trash2 } from "lucide-react";
import RestaurantInfo from "./RestaurantInfo";
import { Badge } from "./ui/badge";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[],
    removeFromCart: (cartItem: CartItem) => void
}

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
    const getTotalCost = () => {
        const totalMoney = cartItems.reduce((total, cartItem) =>
            total + cartItem.price * cartItem.quantity,
            0
        )
        const totalDeliery = totalMoney + restaurant.deliveryPrice
        return (totalDeliery / 100).toFixed(2)
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your order</span>
                    <span>${getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item) => (
                    <div className="flex justify-between">
                        <span >
                            <Badge variant="outline" className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash2 color="#FF0000"
                                className="mr-1 cursor-pointer hover:bg-red-200 hover:rounded-sm hover:p-1"
                                onClick={() => removeFromCart(item)}
                            />
                            ${((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    )
}

export default OrderSummary;