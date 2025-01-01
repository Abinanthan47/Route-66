/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Service from './../../../Service';

function OwnerDetails({ carDetail }) {
  const navigation = useNavigate();
  const { user } = useUser();
  const OnMessageButton = async () => {
    const userId = user.primaryEmailAddress.emailAddress.split('@')[0];
    const ownerUserId = carDetail?.createdBy.split('@')[0];
    try {

      await Service.CreateSendBirdUser(userId, user?.fullName, user?.imageUrl)
        .then(resp => {
          console.log(resp);
        })
    } catch (e) { }

    try {
      await Service.CreateSendBirdUser(ownerUserId, carDetail?.userName, carDetail?.userImageUrl)
        .then(resp => {
          console.log(resp);
        })
    } catch (e) { }
    try {
      await Service.CreateSendBirdChannel([userId, ownerUserId], carDetail?.listingTitle)
        .then(resp => {
          navigation('/profile');
        })
    } catch (e) { }

  }

  return (
    <div className='p-10  border border-black mt-7 rounded-xl shadow-md'>
      <h2 className='font-medium text-xl mb-3'>Car-Dealer</h2>
      <div className='flex gap-14 mt-7 '>
        <img src={carDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-full border-2 ' />
        <div>
          <h2 className='mt-2 font-medium text-xl'>{carDetail?.userName}</h2>
          <p className='mt-2 '>{carDetail?.createdBy}</p>


        </div>

      </div>
      <Button onClick={OnMessageButton} className='w-full mt-6'>Message Owner</Button>
    </div>
  )
}

export default OwnerDetails