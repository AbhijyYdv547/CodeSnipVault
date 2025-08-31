import { JSX } from "react"

export interface Snippet{
    map(arg0: (snippet: Snippet) => JSX.Element): import("react").ReactNode
    id: number,
    title:string,
    price:number,
    description:string,
    category:{
        id:string,
        name:string,
        image:string
    },
    images:string[]

}