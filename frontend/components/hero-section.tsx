"use client";
import { useRouter } from "next/navigation";
import { BackgroundLines } from "./ui/background-lines";
import { Button } from "./ui/button";

const HeroSection = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-20" >
            <div className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide flex flex-col gap-2">
                <h1 className="font-mono">
                    CodeSnipVault
                </h1>
                <span className="md:text-3xl text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    your code, organized
                </span>
            <p className="mt-5 text-lg text-center text-neutral-500 max-w-4xl">
                Save, search, and share your code snippets with ease. A secure and
                developer-friendly vault built for productivity and collaboration.
            </p>
            </div>
            <div className="flex justify-center my-10 md:gap-8 gap-2">
                <button className="p-1 relative cursor-pointer" onClick={() => router.push("/signup")}>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                    <div className="px-8 py-2  bg-zinc-900 rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                        Sign up
                    </div>
                </button>
                <button className="p-1 relative cursor-pointer" onClick={() => router.push("/login")}>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                    <div className="px-8 py-2  bg-zinc-900 rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                        Login
                    </div>
                </button>
            </div>

            <div className="md:flex mt-10 justify-center hidden">
                <video
                    autoPlay
                    loop
                    muted
                    className="rounded-lg w-1/2 border border-blue-500 shadow-sm shadow-blue-400 mx-2 my-4"
                >
                    <source src="/videos/video1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <video
                    autoPlay
                    loop
                    muted
                    className="rounded-lg w-1/2 border border-blue-500 shadow-sm shadow-blue-400 mx-2 my-4"
                >
                    <source src="/videos/video2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

        </div>
   );
};

export default HeroSection;