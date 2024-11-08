import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod"
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant name is required"
    }),
    city: z.string({
        required_error: "City name is required"
    }),
    country: z.string({
        required_error: "Country name is required"
    }),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "Must be a valid number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated delivery time  is required",
        invalid_type_error: "Must be a valid number"
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Please Select at least one item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "Name is Required"),
        price: z.coerce.number().min(1, "Price is required")
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image Url or image File must be provided",
    path: ["imageFile"],
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    restaurant?: Restaurant
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean
}

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }]
        }
    })

    useEffect(() => {
        if (!restaurant) {
            return;
        }
        //Price lowest domination of 100 = 100 pence = 1GBP
        const deliveryPriceFormatted = parseInt(
            (restaurant.deliveryPrice / 100).toFixed(2)
        )
        //Lưu ý, khi dùng vòng map , nếu bạn làm việc với một object
        //Và muốn cập nhật giá trị mới cho object đó thì phải mở bằng ngoặc nhọn 
        //Vì ngoặc nhọn rồi truyền trong đó là khối code với dấu {} thì map sẽ hiểu là 
        //Bạn muốn làm việc với một object mới 
        const menuItemsFormatted = restaurant.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2)),
        }))

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted
        }

        form.reset(updatedRestaurant)
    }, [form, restaurant])

    const onSubmit = (formDataJson: RestaurantFormData) => {
        const formData = new FormData()
        formData.append("restaurantName", formDataJson.restaurantName)
        formData.append("city", formDataJson.city)
        formData.append("country", formDataJson.country)
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString())
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString())
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        })
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name)
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString())
        })
        if (formDataJson.imageFile) {
            formData.append(`imageFile`, formDataJson.imageFile)
        }

        onSave(formData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10">
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
            </form>
        </Form>
    )
}

export default ManageRestaurantForm;