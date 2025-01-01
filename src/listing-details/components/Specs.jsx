import CarSpecification from '@/constants/CarSpecification'
import {
    FaCalendarAlt,
    FaCar,
    FaCarSide,
    FaCheckCircle,
    FaCircle,
    FaCogs,
    FaDoorClosed,
    FaGasPump,
    FaIndustry,
    FaPalette,
    FaRoad,
    FaTachometerAlt, FaWrench
} from 'react-icons/fa'

const iconMap = {
    FaCar,
    FaCheckCircle,
    FaIndustry,
    FaCarSide,
    FaCalendarAlt,
    FaRoad,
    FaCogs,
    FaGasPump,
    FaTachometerAlt,
    FaWrench,
    FaCircle,
    FaPalette,
    FaDoorClosed
}

function Specs({ carDetail }) {
    if (!carDetail) {
        return <div className="p-10 rounded-xl border shadow-md mt-7 text-gray-500">Loading car specifications...</div>
    }

    return (
        <div className='p-10 rounded-xl border border-black shadow-md mt-7'>
            {
                CarSpecification.map((item, index) => {
                    const Icon = iconMap[item.icon]
                    return (
                        <div key={index} className='mt-5 flex items-center justify-between'>
                            <h2 className='flex gap-2 items-center'>
                                <Icon className="text-gray-600" />
                                {item.label}
                            </h2>
                            <h2>{carDetail[item.name] || 'N/A'}</h2>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Specs