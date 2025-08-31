import { Snippet } from "./shared/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Share2Icon } from "lucide-react";
import { BadgeDemo } from "./snippet-badege";

interface SnippetCardProps {
    snippet: Snippet
}

export default function SnippetCard({ snippet }: SnippetCardProps) {
    return (
        <Card key={snippet.id} className="flex flex-col justify-between cursor-pointer">
            <CardHeader>
                <div className="p-3">
                    <CardTitle>{snippet.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <CardDescription>{snippet.description.slice(0,80)}...</CardDescription>
                <BadgeDemo/>
            </CardContent>
            <CardFooter>
                <Button>
                    <Share2Icon className="size-4"/>
                    Share Snippet
                </Button>
            </CardFooter>
        </Card>
    );
}