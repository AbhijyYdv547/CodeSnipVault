"use client";

import { problems, solutions } from "@/constants";

const AboutSection = () => {
    return (
        <section
            id="about"
            className="py-24 relative border-b border-border bg-background text-foreground"
        >
            <div
                className="text-center"
            >
                <h2 className="text-3xl sm:text-5xl font-mono tracking-tight">
                    Problem and Solution
                </h2>
            </div>

            <div className="flex md:flex-row flex-col justify-between">
                <div className="shadow-input mx-auto w-full max-w-md p-4 rounded-2xl md:p-8 bg-zinc-900">
                    <div className="flex items-center mb-2">
                        <div className="flex-1 text-center">
                            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
                                Problem
                            </h2>
                            <p className="mt-1 max-w-sm mx-auto text-sm text-neutral-800 dark:text-neutral-200 text-center">
                                Start your collaboration Journey
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        {problems.map((problem,index)=>(
                            <div key={index} className="flex items-center gap-1">
                                <span>{problem.icon}</span>
                                <span>{problem.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden md:block w-px bg-white mx-8" />
                <div className="shadow-input mx-auto w-full max-w-md p-4 rounded-2xl md:p-8 bg-zinc-300 text-neutral-800">
                    <div className="flex items-center mb-2">
                        <div className="flex-1 text-center">
                            <h2 className="text-xl font-bold text-center">
                                Solution
                            </h2>
                            <p className="mt-1 max-w-sm mx-auto text-sm text-center">
                                Start your collaboration Journey
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        {solutions.map((solution,index)=>(
                            <div key={index} className="flex items-center gap-1">
                                <span>{solution.icon}</span>
                                <span>{solution.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
