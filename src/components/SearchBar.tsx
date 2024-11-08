import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"

const formSchema = z.object({
    searchQuery: z.string({ required_error: "Restaurnat name is required" })
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
    onSubmit: (formData: SearchForm) => void,
    placeholder: string,
    onReset?: () => void
    searchQuery?: string,
}

const SearchBar = ({ onSubmit, onReset, placeholder, searchQuery }: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery
        }
    })

    const handleReset = () => {
        form.reset({
            searchQuery: "",
        })
        //If on reset have a value then run the function
        if (onReset) {
            onReset()
        }
    }

    useEffect(() => {
        form.reset({ searchQuery })
    }, [form, searchQuery])

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}
                className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 
                ${form.formState.errors.searchQuery && "border-red-500"}`}
            >
                <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block" />

                <FormField control={form.control} name="searchQuery"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input {...field}
                                    className="border-none shadow-none text-xl focus-visible:ring-0"
                                    placeholder={placeholder} />
                            </FormControl>
                        </FormItem>)
                    }
                />


                <Button onClick={handleReset} type="button" variant="outline" className="rounded-full">
                    Clear
                </Button>

                <Button type="submit" className="rounded-full bg-orange-500 ">Search</Button>
            </form>
        </Form>
    )
}

export default SearchBar;