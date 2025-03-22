import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { setAllJobs } from '@/redux/jobSlice';
import { toast } from 'sonner';

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    //const { allAppliedJobs } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => { 
        console.log('Filtering jobs...');
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    //  Function to handle job deletion
    const deleteJobHandler = async (jobId) => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });
    
            if (res.data.success) {
                toast.success("Job deleted successfully");
                
                // Update state after deletion
                const updatedJobs = filterJobs.filter(job => job._id !== jobId);
                setFilterJobs(updatedJobs);
                dispatch(setAllJobs(updatedJobs));
            } else {
                toast.error("Failed to delete job");
            }
        } catch (error) {
            console.error("Error deleting job:", error);
            toast.error(error.response?.data?.message || "Error deleting job");
        }
    };    
    
    

    return (
        <div>
            <Table>
                <TableCaption>A list of your recently posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => deleteJobHandler(job._id)} className='flex items-center gap-2 w-fit cursor-pointer text-red-500'>
                                                <Trash className='w-4' />
                                                <span>Delete</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminJobsTable;
