import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "./components/ui/separator"
import Data from "./constants/Data"
import { SearchIcon } from "lucide-react"


function Search() {
    return (
        <div className='flex hidden  backdrop-blur  md:mt-[24rem] md:items-center p-2 md:p-3   md:justify-center w-full rounded-md md:rounded-full border-2 flex-col md:flex  md:flex-row gap-10 px-5  md:w-max mx-auto'>

            <Select>
                <SelectTrigger className="w-[180px] text-white outline-none  border-none ">
                    <SelectValue placeholder="Cars" className="" />
                </SelectTrigger>
                <SelectContent className='text-white bg-transparent outline-none border-none'>
                    {Data.cars.map((maker, index) => (
                        <SelectItem key={maker.id} value={maker.name}>{maker.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px] text-white outline-none border-none ">
                    <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent className='text-white bg-transparent outline-none border-none'>
                    {Data.prices.map((maker, index) => (
                        <SelectItem key={maker.id} value={maker.price}>{maker.price}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className='text-white ' />
            <Select>
                <SelectTrigger className="w-[180px] text-white outline-none border-none ">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className='text-white bg-transparent outline-none border-none'>
                    {Data.status.map((maker, index) => (
                        <SelectItem key={maker.id} value={maker.status}>{maker.status}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
<SearchIcon className=' text-white h-5 m-1'/>
        </div>
    )
}

export default Search