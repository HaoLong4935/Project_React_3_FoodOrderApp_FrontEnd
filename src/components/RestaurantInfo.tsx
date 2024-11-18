import { Restaurant } from "@/types";
import { Dot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type Props = {
    restaurant: Restaurant
}

const RestaurantInfo = ({ restaurant }: Props) => {
    return (
        <Card className="border-slate-100">
            <CardHeader>
                <CardTitle>
                    {restaurant.restaurantName}
                </CardTitle>
                <CardDescription>
                    {restaurant.city} , {restaurant.country}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {restaurant.cuisines.map((item, index) => (
                    <span className="flex ">
                        <span>{item}</span>
                        {index < restaurant.cuisines.length - 1 && <Dot />}
                    </span>
                ))}
            </CardContent>
        </Card>
    )
}

export default RestaurantInfo;