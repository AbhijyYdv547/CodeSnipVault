"use client";

import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function SnippetsFilter() {

    return (
        <div>
            <div>
            <Input 
                placeholder="Search" 
                className="w-full" 
            />
            </div>
            <div>
            <Select
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="JS/TS">Javascript/Typescript</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="CPP">C++</SelectItem>
                    <SelectItem value="GO">Golang</SelectItem>
                    <SelectItem value="PY">Python</SelectItem>
                    <SelectItem value="PHP">PHP</SelectItem>
                </SelectContent>
            </Select>
            </div>
        </div>
    );
}