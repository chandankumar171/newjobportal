import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    
    // Local state to track the selected status for each applicant row
    const [statuses, setStatuses] = useState({});

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });

            if (res.data.success) {
                toast.success(res.data.message);
                
                // Update the state for the specific row
                setStatuses(prev => ({
                    ...prev,
                    [id]: status  // Store status only for the clicked row
                }));
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span>NA</span>
                                )}
                            </TableCell>
                            <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="float-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {shortlistingStatus.map((status, index) => (
                                            <div 
                                                key={index} 
                                                onClick={() => statusHandler(status, item?._id)} 
                                                className={`flex w-fit items-center my-2 cursor-pointer ${
                                                    statuses[item._id] === status ? 
                                                    (status === "Accepted" ? "text-red-600 font-semibold" : "text-green-600 font-semibold") : ""
                                                }`}
                                            >
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
