import {Box, Text} from "@chakra-ui/react"

function ListingProgressBar({progress, remaining, threshold}) {
    return (
        <Box className="w-full">      
            <Box className="w-full h-2 bg-gray-200 rounded">
                <Box
                    className="h-full bg-blue-500 rounded transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></Box>
            </Box>
            <p>
                $<span className="font-bold">{remaining} remaining</span> of ${threshold} threshold
            </p> 
        </Box>
    );
}
export default function ListingView({index, listing}) {
    const freeShippingThreshold = listing.currentTotal + listing.minPurchaseRequired;
    const percentComplete = listing.currentTotal / freeShippingThreshold * 100;
    return (
        <div className="flex flex-col bg-gray-100 rounded p-4 rounded">

            {/* L0: TODO: Add image*/}
            <Box key={index} className="bg-gray-200 h-24 rounded flex items-center justify-center">
                <Text>{listing.store}</Text>
            </Box>


            {/* L1: Title + User Rating */}
            <Box className="flex justify-between pt-2">
                {/* TODO: Add star logo here */}
                <p className="font-bold">{listing.title}</p>
                <p>{listing.avgRating} ({listing.numReviews})</p>
            </Box>


            {/* L2: Description */}
            <p className="text-sm text-grey-400 pt-3 pb-2">{listing.description}</p>


            {/* L3: Progress Bar + Progress Info*/}
            <ListingProgressBar 
                progress={percentComplete} 
                remaining={listing.minPurchaseRequired}
                threshold={freeShippingThreshold}
            />
        </div>
    );
}
