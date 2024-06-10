"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const DashboardPage = () => {
    const removeToken = () => {
        localStorage.removeItem('token');
    };

    const router = useRouter();

    const [loading, setLoading] = useState(true); // State to track loading status
    const [loggedIn, setLoggedIn] = useState(false); // State to track login status
    const [username, setUsername] = useState(''); // State to store username
    const [enrollmentId, setEnrollmentId] = useState(''); // State to store enrollment ID
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
                setUsername(data.username);
                setEnrollmentId(data.enrollment_id);
                fetchAttendanceRecords(data.enrollment_id); // Fetch attendance records after login
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

    const fetchAttendanceRecords = async (enrollmentId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/signin');
            return;
        }

        try {
            const response = await fetch(`https://hnagxgsp3y.us-east-1.awsapprunner.com/attendance/enrollment/${enrollmentId}`, {
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

    // State for selected course, date, and time
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    // Handler for course change
    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
    };

    // Handler for date change
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    // Handler for time change
    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    // Handler for marking attendance
    const markAttendance = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/signin');
            return;
        }

        const attendanceData = {
            course: selectedCourse,
            date: selectedDate,
            time: selectedTime,
            status: "Marked"
        };

        try {
            const response = await fetch('https://hnagxgsp3y.us-east-1.awsapprunner.com/attendance/record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(attendanceData)
            });

            if (response.ok) {
                alert('Attendance marked successfully');
                fetchAttendanceRecords(enrollmentId); // Fetch updated attendance
            } else {
                console.error('Failed to mark attendance:', response.statusText);
                alert('Failed to mark attendance');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while marking attendance');
        }
    };

    // Handler for generating QR code
    const generateQRCode = () => {
        // Implement QR code generation logic here
    };

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

    const Attendance = () => (
        <div className="bg-[#ffffff19] p-6 mb-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-400">Take Attendance</h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex-1">
                    <label htmlFor="course" className="text-gray-400 block mb-2">Course:</label>
                    <select id="course" value={selectedCourse} onChange={handleCourseChange} className="border border-gray-300 rounded p-2 w-full bg-blue-950 text-gray-400">
                        <option value="">-- Select Course --</option>
                        <option value="AEROSPACE ENGINEERING">AEROSPACE ENGINEERING</option>
                        <option value="AIR ENGINEERING">AIR ENGINEERING</option>
                        <option value="MECHANICAL ENGINEERING">MECHANICAL ENGINEERING</option>
                        <option value="MECHATRONICS ENGINEERING">MECHATRONICS ENGINEERING</option>
                        <option value="GROUND ENGINEERING">GROUND ENGINEERING</option>
                        <option value="TELECOMMUNICATION ENGINEERING">TELECOMMUNICATION ENGINEERING</option>
                        <option value="AUTOMOTIVE ENGINEERING">AUTOMOTIVE ENGINEERING</option>
                        <option value="METALLURGICAL & MATERIALS ENGINEERING">METALLURGICAL & MATERIALS ENGINEERING</option>
                        <option value="CIVIL ENGINEERING">CIVIL ENGINEERING</option>
                        <option value="INFORMATION AND COMMUNICATION ENGINEERING">INFORMATION AND COMMUNICATION ENGINEERING</option>
                        <option value="PHYSICS">PHYSICS</option>
                        <option value="PHYSICS WITH ELECTRONICS">PHYSICS WITH ELECTRONICS</option>
                        <option value="MATHEMATICS">MATHEMATICS</option>
                        <option value="CHEMISTRY">CHEMISTRY</option>
                        <option value="STATISTICS">STATISTICS</option>
                        <option value="COMPUTER SCIENCE">COMPUTER SCIENCE</option>
                        <option value="CYBER SECURITY">CYBER SECURITY</option>
                        <option value="MARKETING">MARKETING</option>
                        <option value="BANKING & FINANCE">BANKING & FINANCE</option>
                        <option value="ECONOMICS">ECONOMICS</option>
                        <option value="INTERNATIONAL RELATIONS">INTERNATIONAL RELATIONS</option>
                        <option value="ACCOUNTING">ACCOUNTING</option>
                        <option value="BUSINESS ADMINISTRATION">BUSINESS ADMINISTRATION</option>
                        <option value="ELECTRICAL ENGINEERING">ELECTRICAL ENGINEERING</option>
                    </select>
                </div>
                <div className="flex-1">
                    <label htmlFor="date" className="text-gray-400 block mb-2">Date:</label>
                    <input type="date" id="date" value={selectedDate} onChange={handleDateChange} className="border border-gray-300 rounded p-2 w-full bg-blue-950 text-gray-400" />
                </div>
                <div className="flex-1">
                    <label htmlFor="time" className="text-gray-400 block mb-2">Time:</label>
                    <input type="time" id="time" value={selectedTime} onChange={handleTimeChange} className="border border-gray-300 rounded p-2 w-full bg-blue-950 text-gray-400" />
                </div>
                <div className="flex-1">
                    <button onClick={markAttendance} className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto">Take Attendance</button>
                </div>
            </div>
        </div>
    );

    // Render attendance records
    const AttendanceRecords = () => (
        <div className="bg-[#ffffff19] p-6 mb-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-400">Attendance Records</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-blue-950">
                    <thead>
                        <tr>
                            <th className="text-left py-2 px-4 bg-gray-800 text-gray-400">Course</th>
                            <th className="text-left py-2 px-4 bg-gray-800 text-gray-400">Date</th>
                            <th className="text-left py-2 px-4 bg-gray-800 text-gray-400">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceRecords.map((record, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 text-gray-400">{record.course}</td>
                                <td className="py-2 px-4 text-gray-400">{record.date}</td>
                                <td className="py-2 px-4 text-gray-400">{record.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className='space-y-6 p-4 sm:p-6 lg:p-8'>
            <div className="text-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-400">
                    <span className="italic">Welcome</span>
                    <span className="ml-1">To the Student Dashboard</span>
                </h1>
            </div>
            <div className="flex justify-between items-center space-x-4"></div>
            {/* Render the Attendance component */}
            <Attendance />
            {/* Render the Attendance Records component */}
            <AttendanceRecords />
        </div>
    );
}

export default DashboardPage;
