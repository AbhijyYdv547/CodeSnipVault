"use client";
import React from 'react'
import { FeatureBox } from './ui/feature-box'

const FeaturesSection = () => {
  return (
      <section
          className="w-full max-w-6xl flex flex-col items-center text-center py-24 px-6 border-b border-border"
          id="features"
      >
          <div
              className="text-center space-y-4 px-4"
          >
              <span className="uppercase text-xs tracking-widest text-zinc-500 font-semibold">
                  Features
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                  Supercharge Your <span className="text-zinc-500">Snippet Workflow</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
                  Save, organize, and collaborate on your code snippets with ease —
                  CodeSnipVault turns scattered pieces of code into a powerful,
                  searchable, and shareable library.
              </p>
          </div>
          <FeatureBox />
      </section>
  )
}

export default FeaturesSection