import { Button } from '@/components/ui/button'
import { Tag } from 'lucide-react'
import React from 'react'

function Pricing({carDetail}) {
  return (
    <div className='p-10 rounded-xl border border-black shadow-md'>
        <h2>Our Price</h2>
        <h2 className='font-medium text-4xl'>${carDetail?.sellingPrice}</h2>
        <Button className='w-full mt-7' size='lg'><Tag />Make an Offer Price</Button>
    </div>
  )
}

export default Pricing