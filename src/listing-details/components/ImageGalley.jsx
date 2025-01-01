/* eslint-disable react/prop-types */

function ImageGalley({ carDetail }) {
    if (!carDetail?.images?.length) {
        return (
            <div className="w-full h-[500px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                No Image Available
            </div>
        )
    }

    return (
        <div className="border border-black rounded-xl"> 
            <img
                src={carDetail.images[0]}
                alt={carDetail.listingTitle || "Car Image"}
                className='w-full h-[500px] p-3  object-cover rounded-xl'
            />
        </div>
    )
}

export default ImageGalley