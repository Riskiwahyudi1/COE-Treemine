import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [glowUser, setGlowUser] = useState(false);
    const [glowPassword, setGlowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', { username, password });
        // Add your login logic here
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#0c1022] text-[#00ccff]">
            <div className="relative w-[400px] h-[470px] bg-[#040717] rounded-[50px_5px] flex items-center justify-center overflow-hidden mt-[70px]">
                <div className="absolute inset-0 before:content-[''] before:absolute before:w-[170%] before:h-[170%] before:bg-[conic-gradient(transparent,transparent,transparent,#ee00ff)] before:animate-[rotate_6s_linear_infinite] after:content-[''] after:absolute after:w-[170%] after:h-[170%] after:bg-[conic-gradient(transparent,transparent,transparent,#00ccff)] after:animate-[rotate_6s_linear_infinite] after:animation-delay-[-3s]"></div>
                <div className="absolute inset-[5px] bg-[#0c1022] rounded-[50px_5px] z-10 p-[50px_40px]">
                    <h2 className="text-4xl font-semibold text-center mb-10">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-8">
                            <Camera className={`absolute left-2 top-2 ${glowUser ? 'text-shadow-[0_0_10px_#00ccff]' : ''}`} size={20} />
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full h-[30px] bg-transparent border-b border-[#00ccff] text-xl pl-10 text-[#00ccff] focus:outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setGlowUser(true)}
                                onBlur={() => setGlowUser(false)}
                            />
                        </div>
                        <div className="relative mb-16">
                            <Camera className={`absolute left-2 top-2 ${glowPassword ? 'text-shadow-[0_0_10px_#00ccff]' : ''}`} size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full h-[30px] bg-transparent border-b border-[#00ccff] text-xl pl-10 text-[#00ccff] focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setGlowPassword(true)}
                                onBlur={() => setGlowPassword(false)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full h-[40px] border border-[#00ccff] rounded-[50px] bg-[#0c1022] text-[22px] tracking-[2px] flex items-center justify-center hover:bg-[#00ccff] hover:text-[#0c1022] transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                    <div className="flex justify-between mt-8">
                        <a href="#" className="text-[18px] hover:underline">Forgot Password?</a>
                        <a href="#" className="text-[18px] hover:underline">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;