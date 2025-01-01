/* eslint-disable react/prop-types */
import { Separator } from '@/components/ui/separator';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { CircleX, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { storage } from '../../../config/firebase.config';
import { db } from '../../../config/index';
import { CarImages } from '../../../config/schema';

function UploadImages({ triggerUploadImage, carInfo, mode }) {
    const [selectedFile, setSelectedFile] = useState([]);
    const [EditCarImageList, setEditCarImageList] = useState([]);

    useEffect(() => {
        if (mode === 'edit' && carInfo?.images) {
            setEditCarImageList([])
            carInfo.images.forEach((image) => {
                setEditCarImageList(prev => [...prev, image?.imageUrl]);
                console.log(image);
            });
        }
    }, [carInfo]);

    useEffect(() => {
        if (triggerUploadImage) {
            handleUploadImages();
        }
    }, [triggerUploadImage])

    const onFileSelected = (event) => {
        const files = event.target.files;

        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            setSelectedFile((prev) => [...prev, file])
        }
    }

    const onImageRemove = (image, index) => {
        const result = selectedFile.filter((item) => item != image);
        setSelectedFile(result);
    }

    const handleUploadImages = async () => {
        const imageUrls = []; // Array to hold image URLs

        for (const file of selectedFile) {
            const fileName = Date.now() + '-' + file.name;
            const storageRef = ref(storage, 'car-images/' + fileName);

            try {
                const snapshot = await uploadBytes(storageRef, file);
                const downloadUrl = await getDownloadURL(snapshot.ref);
                imageUrls.push(downloadUrl); // Add URL to the array
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        // After uploading all images, save the URLs to the database
        await Promise.all(imageUrls.map(async (url) => {
            await db.insert(CarImages).values({
                imageUrl: url,
                carListingId: triggerUploadImage // Ensure this is set correctly
            });
        }));
    };

    return (
        <div>
            <Separator className='my-3' />
            <h2 className='font-medium text-xl  my-4'>Upload Car Images</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>

                {mode == 'edit' &&
                    EditCarImageList.map((image, index) => (
                        <div key={index}>
                            <CircleX className='absolute m-3 h-6 text-white' onClick={() => onImageRemove(image, index)} />
                            <img src={image} className='w-full h-[130px] object-cover' />
                        </div>
                    ))

                }

                {selectedFile.map((image, index) => (
                    <div key={index}>
                        <CircleX className='absolute m-3 h-6 text-white' onClick={() => onImageRemove(image, index)} />
                        <img src={URL.createObjectURL(image)} className='w-full h-[130px] object-cover' />
                    </div>
                ))}
                <label htmlFor='upload-images'>
                    <div className='border rounded-xl p-10 border-dotted flex justify-center items-center cursor-pointer border-gray-500 bg-gray-100'>
                        <Plus className='text-gray-600 ' />
                    </div>
                </label>
                <input type='file' multiple={true} id='upload-images' onChange={onFileSelected} className='opacity-0' />
            </div>

        </div>

    )
}

export default UploadImages