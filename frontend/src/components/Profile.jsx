import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-md'>
                <div className='flex flex-col md:flex-row items-center md:items-start justify-between'>
                    <div className='flex flex-col md:flex-row items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div className="text-center md:text-left">
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p className="text-gray-600">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="mt-4 md:mt-0" variant="outline">
                        <Pen />
                    </Button>
                </div>
                <div className='my-5 space-y-3'>
                    <div className='flex items-center gap-3'>
                        <Mail />
                        <span className="truncate">{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Contact />
                        <span className="truncate">{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-semibold text-lg'>Skills</h1>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {user?.profile?.skills.length !== 0 
                            ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) 
                            : <span>NA</span>}
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {isResume 
                        ? <a target='_blank' href={user?.profile?.resume} className='text-blue-500 hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> 
                        : <span>NA</span>}
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl p-5 shadow-md'>
                <h1 className='font-bold text-lg mb-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;