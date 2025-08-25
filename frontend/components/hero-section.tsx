"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const HeroSection = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-20" >
            <div className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide flex flex-col gap-2">
                <h1 className="font-mono">
                    CodeSnipVault
                </h1>
                <span className="md:text-3xl text-2xl bg-gradient-to-r from-zinc-800 to-gray-100 text-transparent bg-clip-text">
                    your code, organized
                </span>
            <p className="mt-5 text-lg text-center text-neutral-500 max-w-4xl">
                Save, search, and share your code snippets with ease. A secure and
                developer-friendly vault built for productivity and collaboration.
            </p>
            </div>
            <div className="flex flex-wrap justify-center mt-8 gap-6 z-0 md:flex-row flex-col">
                <Button className="md:px-20 md:py-9 px-14 py-6 md:font-semibold relative cursor-pointer" variant={"outline"} size="lg" onClick={() => router.push("/signup")}>
                        Sign up
                </Button>
                <Button className="md:px-20 md:py-9 px-14 py-6 md:font-semibold relative cursor-pointer" variant={"default"} size="lg" onClick={() => router.push("/login")}>
                   Login
                </Button>
            </div>

            <div className="md:flex mt-10 justify-center hidden">
                <video
                    autoPlay
                    loop
                    muted
                    className="rounded-lg w-1/2 border border-zinc-500 shadow-sm shadow-zinc-400 mx-2 my-4"
                >
                    <source src="/videos/video1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <video
                    autoPlay
                    loop
                    muted
                    className="rounded-lg w-1/2 border border-zinc-500 shadow-sm shadow-zinc-400 mx-2 my-4"
                >
                    <source src="/videos/video2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

        </div>
   );
};

export default HeroSection;