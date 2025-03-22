import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user); // Get user from Redux

    const searchJobHandler = () => {

        if (!user) {
                    toast.warn("Please login first!", { position: "top-center", autoClose: 2000 });
                    // Delay navigation to allow toast to be seen
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
        
                    return;
                }

        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Portal Website</span>
                <h1 className='text-5xl font-bold'>Find, Apply & <br /> Land Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Explore thousands of job oppertunities tailored to your skills and aspirations. Start your career journey today!</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Enter job title to start your search'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection