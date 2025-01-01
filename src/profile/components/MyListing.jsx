import CarItem from '@/CarItem';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { desc, eq, and } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from './../../../config';
import { CarImages, CarListing } from './../../../config/schema';
import Service from './../../../Service';
import { AiOutlineDelete } from "react-icons/ai";
import { MdModeEdit } from 'react-icons/md';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function MyListing() {
    const [carList, setCarList] = useState([]);
    const [selectedListingId, setSelectedListingId] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        user && GetUserCarListing();
    }, [user]);

    const GetUserCarListing = async () => {
        try {
            const result = await db.select().from(CarListing)
                .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
                .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(CarListing.id));

            const resp = Service.FormatResult(result);
            setCarList(resp);
        } catch (error) {
            console.error("Error fetching car listings:", error);
        }
    };

    const DeleteUserCarListing = async (listingId) => {
        if (!listingId) {
            console.error("Listing ID is required for deletion.");
            return;
        }

        try {
            const result = await db
                .delete(CarListing)
                .where(
                    and(
                        eq(CarListing.id, listingId),
                        eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress)
                    )
                );

            setCarList((prevList) => prevList.filter((item) => item.id !== listingId));
            console.log("Car listing deleted successfully:", result);
        } catch (error) {
            console.error("Error deleting car listing:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between my-6 items-center">
                <h2 className="font-medium text-4xl">My Listing</h2>
                <Link to="/add-listing">
                    <Button>+ Add New Listing</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {carList.map((item, index) => (
                    <div key={index}>
                        <CarItem car={item} />
                        <div className="p-1 mt-1 flex justify-end gap-3">
                            <Link to={'/add-listing?mode=edit&id=' + item?.id}>
                                <Button variant="outline" className="h-7 border-black w-7">
                                    <MdModeEdit className="h-3 text-gray-800" />
                                </Button>
                            </Link>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button
                                        variant="outline"
                                        className="h-7 border-black w-7"
                                        onClick={() => setSelectedListingId(item?.id)}
                                    >
                                        <AiOutlineDelete className="text-red-600" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-red-500">Are you sure to Delete?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the listing from your account
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => DeleteUserCarListing(selectedListingId)}>
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyListing;
