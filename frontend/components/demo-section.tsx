import React from 'react'

const DemoSection = () => {
    return (
        <section
            id="demo"
            className="py-24 bg-background text-foreground border-b border-border"
        >
            <div className="flex flex-col mt-10 justify-center items-center">
                <div className="rounded-lg w-3/4 border border-blue-500 shadow-sm shadow-blue-400 mx-2 my-4 overflow-hidden">
                    <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src=""
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default DemoSection