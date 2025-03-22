/*import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user); // Get user from Redux
    const handleClick = () => {
        if (!user) {
            toast.warn("Please login first!", { position: "top-center", autoClose: 2000 });

            // Delay navigation to allow toast to be seen
            setTimeout(() => {
                navigate("/login");
            }, 2000);

            return;
        }

        navigate(`/description/${job._id}`);
    };


    return (
        <div onClick={handleClick} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.company?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards */






import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user);

    const handleClick = () => {
        if (!user) {
            toast.warn("Please login first!", { position: "top-center", autoClose: 2000 });

            setTimeout(() => {
                navigate("/login");
            }, 2000);

            return;
        }

        navigate(`/description/${job._id}`);
    };

    return (
        <div 
            onClick={handleClick} 
            className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer 
            transition-all duration-300 hover:shadow-lg w-full md:w-[300px] lg:w-[350px]"
        >
            {/* Company Info */}
            <div>
                <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">{job?.company?.location}</p>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600 truncate">{job?.description}</p>
            </div>

            {/* Job Details - Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
