import { useSearchParams } from 'react-router-dom';
import CarItem from '../CarItem';
import { useEffect, useState } from 'react';
import { db } from '../../config';
import { CarImages, CarListing } from '../../config/schema';
import { and, eq, like } from 'drizzle-orm';
import Service from '../../Service';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                let query = db.select().from(CarListing)
                    .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId));

                // Add filters based on search params
                const filters = [];
                if (searchParams.get('car')) {
                    filters.push(like(CarListing.model, `%${searchParams.get('car')}%`));
                }
                if (searchParams.get('status')) {
                    filters.push(eq(CarListing.condition, searchParams.get('status')));
                }
                if (searchParams.get('price')) {
                    // Handle price range logic here
                }

                if (filters.length > 0) {
                    query = query.where(and(...filters));
                }

                const result = await query;
                const formattedResults = Service.FormatResult(result);
                setResults(formattedResults);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchParams]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Search Results</h1>
            {loading ? (
                <div className="flex justify-center">Loading...</div>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((car) => (
                        <CarItem key={car.id} car={car} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    No cars found matching your criteria
                </div>
            )}
        </div>
    );
}

export default SearchResults; 