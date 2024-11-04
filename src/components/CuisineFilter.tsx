import { cuisineList } from "@/config/restaurant-options-config"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { Label } from "./ui/label"
import { ChangeEvent } from "react";
import { Button } from "./ui/button";
type Props = {
    onChange: (cuisines: string[]) => void
    selectedCuisines: string[]
    isExpanded: boolean,
    onExpandedClick: () => void
}

const CuisineFilter = ({ isExpanded, selectedCuisines, onChange, onExpandedClick }: Props) => {
    const handleCuisineReset = () => onChange([])
    const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("Bien even la ", event)
        const clickedCuisine = event.target.value
        const isChecked = event.target.checked

        const newCuisineList = isChecked
            ? [...selectedCuisines, clickedCuisine]
            : selectedCuisines.filter((cuisine) => cuisine != clickedCuisine)

        onChange(newCuisineList)
    }
    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">Filter by Cuisine</div>
                <div onClick={handleCuisineReset} className="underline cursor-pointer text-blue-500 text-md font-semibold mb-2">Reset filter</div>
            </div>

            <div className="space-y-2 flex flex-col">
                {cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine) => {
                    const isSelected = selectedCuisines.includes(cuisine)

                    return (
                        <div className="flex">
                            <input
                                id={`cuisine_${cuisine}`}
                                type="checkbox"
                                className="hidden"
                                value={cuisine}
                                checked={isSelected}
                                onChange={handleCuisineChange}
                            />
                            <Label
                                className={`flex flex-1 cursor-pointer text-sm rounded-full font-semibold p-3
                                ${isSelected ? "border border-green-600 text-green-500" : "border broder-slate-300"}`}
                                htmlFor={`cuisine_${cuisine}`}
                            >
                                {isSelected && <Check size={20} strokeWidth={3} />}
                                {cuisine}
                            </Label>
                        </div>
                    )
                })}
                <Button
                    variant="link"
                    className="mt-4 flex-1"
                    onClick={onExpandedClick}
                >
                    {isExpanded ?
                        (
                            <span className="flex flex-row items-center">
                                View less <ChevronUp />
                            </span>
                        )
                        :
                        (
                            <span className="flex flex-row items-center">
                                View more <ChevronDown />
                            </span>
                        )
                    }
                </Button>
            </div>
        </>
    )
}

export default CuisineFilter; 