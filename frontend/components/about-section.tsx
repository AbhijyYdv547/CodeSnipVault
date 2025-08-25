"use client";

import { problems, solutions } from "@/constants";

const AboutSection = () => {
    return (
        <section
            id="about"
                className="relative py-24 border-b border-border bg-background text-foreground flex flex-col gap-5"
        >
            <div
                className="text-center space-y-4 px-4"
            >
                <span className="uppercase text-xs tracking-widest text-zinc-500 font-semibold">
                    Problems & Solutions
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                    From <span className="text-zinc-500">Scattered Snippets</span> to Organized Vaults
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
                    Don&apos;t struggle just do CodeSnip Vault
                </p>
            </div>


            <div className="flex md:flex-row flex-col gap-5">
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

)};

export default AboutSection;
