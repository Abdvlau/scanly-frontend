"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

const SignUpRegistrationForm = () => {
    const [formData, setFormData] = useState({
        enrollment_id: '',
        username: '',
        password: '',
    });

    const [registrationError, setRegistrationError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState('');

    const router = useRouter();

    useEffect(() => {
        // Code inside useEffect only runs on the client side
        // You can initialize state or do other client-side operations here
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://hnagxgsp3y.us-east-1.awsapprunner.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setRegistrationSuccess('Registration successful. Please sign in.'); // Set success message
                setRegistrationError(''); // Clear any previous error message
            } else {
                const data = await response.json();
                setRegistrationError(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network error
            setRegistrationError('Network error occurred');
        }
    };

    return (
        <main className="bg-white min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md">
                <aside className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-center text-black font-light text-4xl bg-yellow rounded-t-xl m-0 py-4">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
                        <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
                        <input type="text" name="enrollment_id" placeholder="Enrollment Id" value={formData.enrollment_id} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
                        {registrationError && <div className="text-red-500 mb-4">{registrationError}</div>}
                        {registrationSuccess && <div className="text-green-500 mb-4">{registrationSuccess}</div>}
                        <div className="flex justify-between items-center">
                            <Link href="/signin" legacyBehavior>
                                <a className="text-blue-900">Already registered?</a>
                            </Link>
                            <button type="submit" className="bg-blue-900 text-white rounded p-2">Register</button>
                        </div>
                    </form>
                </aside>
            </div>
        </main>
    );
};

export default SignUpRegistrationForm;
