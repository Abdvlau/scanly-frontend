"use client"
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiBaseUri = process.env.NEXT_PUBLIC_API_BASE_URI;

        try {
            const response = await fetch(`https://hnagxgsp3y.us-east-1.awsapprunner.com/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('Login successful:', data);
                // Redirect or perform further actions
                 router.push('/dashboard');
            } else {
                console.error('Login failed:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main className="bg-white min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md">
                <aside className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-center text-black font-light text-4xl bg-yellow rounded-t-xl m-0 py-4">Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="w-full p-2 mb-4 border rounded"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-2 mb-4 border rounded"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div className="flex justify-between items-center">
                            <Link href="/signup" className="text-blue-900">Not yet registered?</Link>
                            <button type="submit" className="bg-blue-900 text-white rounded p-2">Sign In</button>
                        </div>
                    </form>
                </aside>
            </div>
        </main>
    );
};

export default LoginForm;
