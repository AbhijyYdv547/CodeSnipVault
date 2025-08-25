"use client";
import Image from "next/image";
import { WorkflowBox } from "./ui/feature-box";


const Workflow = () => {
    return (
        <section
            id="workflow"
            className="py-24 bg-background text-foreground border-b border-border"
        >
            <div className="text-center space-y-4 px-4">
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                    App&apos;s{" "}
                    <span className="text-zinc-500">workflow</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
                    From snippet creation to sharing — CodeSnipVault helps you store, organize,
                    and collaborate on code efficiently.
                </p>
            </div>


            <div className="mt-16 flex flex-col items-center gap-12 px-6 sm:px-12 max-w-7xl mx-auto">

                <div className="flex-1 flex justify-center">
                    <div className="rounded-lg border border-zinc-500 shadow-sm shadow-zinc-400 overflow-hidden">
                        <Image
                            src="/mermaid-chart.png"
                            alt="Workflow"
                            width={600}
                            height={400}
                            className="object-contain"
                        />
                    </div>
                </div>


            </div>
            <WorkflowBox/>
        </section>
    );
};

export default Workflow;
