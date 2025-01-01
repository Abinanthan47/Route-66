/* eslint-disable no-undef */
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useUser } from '@clerk/clerk-react'
import { eq } from 'drizzle-orm'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { db } from '../../config'
import { CarImages, CarListing } from '../../config/schema'
import carDetails from '../constants/carDetails.json'
import features from '../constants/features.json'
import Service from './../../Service'
import DropdownField from './components/DropdownField'
import InputField from './components/InputField'
import TextAreaField from './components/TextAreaField'
import UploadImages from './components/UploadImages'
import Header from '@/Header'

function AddListing() {

    const [formData, setFormData] = useState([]);
    const [featuresData, setFeaturesData] = useState([]);
    const [triggerUploadImage, setTriggerUploadImage] = useState();
    const [loading, setLoading] = useState(false);
    const [carInfo, setCarInfo] = useState([]);
    const [searchParams] = useSearchParams(false);
    const navigate = useNavigate();
    const { user } = useUser();

    const mode = searchParams.get('mode');
    const recordId = searchParams.get('id');

    useEffect(() => {
        if (mode == 'edit') {
            GetListingDetail();
        }
    }, []);

    const GetListingDetail = async () => {

        const result = await db.select().from(CarListing)
            .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.id, recordId))


        const resp = Service.FormatResult(result)
        console.log(resp);
        setCarInfo(resp[0]);
        setFormData(resp[0]);
        setFeaturesData(resp[0].features);

    }

    /**
* Use to capture user input from form
* @param {*} name
* @param {*} value
*/
    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
        console.log(formData);
    }

    const handleFeatureChange = (name, value) => {
        setFeaturesData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);
        if (mode == 'edit') {
            const result = await db.update(CarListing).set({
                ...formData,
                features: featuresData,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName,
                userImageUrl:user?.imageUrl,
                postedOn: moment().format('DD/MM/yyyy')
            }).where(eq(CarListing.id,recordId)).returning({id:CarListing.id});
            navigate('/profile')
            setLoading(false);
        } else {
            try {
                const result = await db.insert(CarListing).values({
                    ...formData,
                    features: featuresData,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    userName:user?.fullName,
                    userImageUrl:user?.imageUrl,
                    postedOn: moment().format('DD/MM/yyyy')
                }).returning({ id: CarListing.id });
                if (result) {
                    console.log("Data saved");
                    setTriggerUploadImage(result[0]?.id);
                    navigate("/profile");
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    }
    return (
        <div>
            <Header/>
            <div className='px-10 md:px-20 my-10'>
                <h2 className='font-medium text-4xl'>Add New Listing</h2>
            </div>
            <form className="p-10 border rounded-xl mt-10" onSubmit={onSubmit}>

                <div className='p-10 border rounded-xl mt-10'>
                    <h2 className='font-medium text-xl mb-6'>Car Details</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {carDetails.carDetails.map((item, index) => (
                            <div key={index}>
                                <label className=''>{item?.label} {item.required && <span className='text-red-500'>*</span>}</label>
                                {item.fieldType == 'text' || item.fieldType == 'number' ? <InputField item={item} handleInputChange={handleInputChange} carInfo={carInfo} /> : item.fieldType == 'dropdown' ?
                                    <DropdownField item={item} handleInputChange={handleInputChange} carInfo={carInfo} /> : item.fieldType == 'textarea' ?
                                        <TextAreaField item={item} handleInputChange={handleInputChange} carInfo={carInfo} /> : null}
                            </div>
                        ))}
                    </div>
                </div>
                <Separator className='my-6' />

                <div >
                    <h2 className='font-medium text-xl my-6'>Features</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                        {features.features.map((item, index) => (
                            <div key={index} className='flex gap-2 items-center'>
                                <Checkbox onCheckedChange={(value) => handleFeatureChange(item.name, value)}
                                    checked={featuresData?.[item.name]}
                                /> <h2>{item.label}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <UploadImages carInfo={carInfo} mode={mode} triggerUploadImage={triggerUploadImage} />

                <div className='mt-10 flex justify-end'>
                    <Button type="submit" onClick={(e) => onSubmit(e)} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default AddListing