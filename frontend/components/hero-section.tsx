"use client";
import { useRouter } from "next/navigation";
import { BackgroundLines } from "./ui/background-lines";
import { Button } from "./ui/button";

const HeroSection = () => {
    const router = useRouter()
    return (
        <BackgroundLines className="flex flex-col items-center mt-6 lg:mt-20" >
            <div className="text-5xl sm:text-6xl lg:text-7xl text-center tracking-wide flex flex-col gap-2">
                <h1 className="font-mono">
                    CodeSnip Vault
                </h1>
                <span className="md:text-3xl text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    your code, organized
                </span>
            <p className="mt-5 text-lg text-center text-neutral-500 max-w-4xl">
                Save, search, and share your code snippets with ease. A secure and
                developer-friendly vault built for productivity and collaboration.
            </p>
            </div>
            <div className="flex justify-center mt-10 md:gap-8 gap-2 ">
                <Button className="px-16 py-8 relative cursor-pointer text-lg" variant="outline" size="lg" onClick={() => router.push("/signup")}>
                        Sign up
                </Button>
                <Button className="px-16 py-8 relative cursor-pointer text-lg" variant="default" size="lg" onClick={() => router.push("/login")}>
                        Login
                </Button>
            </div>

            <div className="flex mt-10 justify-center">
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

        </BackgroundLines>
    );
};

export default HeroSection;