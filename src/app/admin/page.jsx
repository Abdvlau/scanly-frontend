"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const AdminDashboardPage = () => {

    const removeToken = () => {
        localStorage.removeItem('token');
    };

    const router = useRouter();

    const [loading, setLoading] = useState(true); // State to track loading status
    const [loggedIn, setLoggedIn] = useState(false); // State to track login status
    const [attendanceRecords, setAttendanceRecords] = useState([]); // State to store attendance records

    const isLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return false; // No token found, user is not logged in
        }
    
        try {
            const response = await fetch('https://hnagxgsp3y.us-east-1.awsapprunner.com/auth/protected', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setLoggedIn(true);
                setLoading(false);
                fetchAllAttendanceRecords(); // Fetch all attendance records after login
                return true; // User is logged in
            } else {
                // If response status is not 200, remove token and return false
                removeToken(); // Delete token
                setLoading(false);
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network error
            setLoading(false);
            return false;
        }
    };

    const fetchAllAttendanceRecords = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/signin');
            return;
        }

        try {
            const response = await fetch('https://hnagxgsp3y.us-east-1.awsapprunner.com/attendance/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAttendanceRecords(data.attendances); // Assume the response has a property 'attendances'
            } else {
                console.error('Failed to fetch attendance records:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // State for selected course and date
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    // Handler for course change
    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
    };

    // Handler for date change
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    // Filter attendance records by selected course and date
    const filteredRecords = attendanceRecords.filter(record => {
        return (selectedCourse === '' || record.course === selectedCourse) &&
               (selectedDate === '' || record.date === selectedDate);
    });

    // Check if user is logged in
    useEffect(() => {
        isLoggedIn();
    }, []);

    // If loading, display loading indicator
    if (loading) {
        return <div>Loading...</div>;
    }

    // If not logged in, redirect to signin page
    if (!loggedIn) {
        router.push('/signin');
        return null;
    }

    const AttendanceRecords = () => (
        <div className="bg-[#ffffff19] p-6 mb-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-400">Attendance Records</h2>
            <div className="flex items-center space-x-4 mb-4">
                <div>
                    <label htmlFor="course" className="text-gray-400">Course:</label>
                    <select id="course" value={selectedCourse} onChange={handleCourseChange} className="border border-gray-300 rounded p-2 bg-blue-950 text-gray-400">
                        <option value="">-- All Courses --</option>
                        <option value="microeconomics">Microeconomics</option>
                        <option value="macroeconomics">Macroeconomics</option>
                        <option value="econometrics">Econometrics</option>
                        {/* Add more courses as needed */}
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="text-gray-400">Date:</label>
                    <input type="date" id="date" value={selectedDate} onChange={handleDateChange} className="border border-gray-300 rounded p-2" />
                </div>
            </div>
            <table className="min-w-full bg-blue-950">
                <thead>
                    <tr>
                        <th className="text-left py-2 px-4 bg-gray-800 text-gray-400">Enrollment ID</th>
                        <th className="text-left py-2 px-4 bg-gray-800 text-gray-400">User ID</th>
                        <th className="text-left py-2 px-4 bg-gray-800 text-gray-400">Course</th>
                        <th className="text-left py-2 px-4 bg-gray-800 text-gray-400">Date</th>
                        <th className="text-left py-2 px-4 bg-gray-800 text-gray-400">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map((record, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 text-gray-400">{record.enrollment_id}</td>
                            <td className="py-2 px-4 text-gray-400">{record.user_id}</td>
                            <td className="py-2 px-4 text-gray-400">{record.course}</td>
                            <td className="py-2 px-4 text-gray-400">{record.date}</td>
                            <td className="py-2 px-4 text-gray-400">{record.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className='space-y-6'>
            <div className="text-center">
                <h1 className="lg:text-4xl md:mb-0 flex justify-center text-2xl font-bold mb-4">
                    <span className="italic text-gray-400"></span><span className="ml-1 text-gray-400 ">Welcome To the Admin Dashboard</span>
                </h1>
            </div>
            {/* Render the Attendance Records component */}
            <AttendanceRecords />
        </div>
    );
}

export default AdminDashboardPage;
