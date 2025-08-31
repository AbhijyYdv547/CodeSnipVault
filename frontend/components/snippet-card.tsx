import { Product } from "./shared/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Share2Icon } from "lucide-react";
import { BadgeDemo } from "./snippet-badege";

interface SnippetCardProps {
    product: Product
}

export default function SnippetCard({ product }: SnippetCardProps) {
    return (
        <Card key={product.id} className="flex flex-col justify-between cursor-pointer">
            <CardHeader>
                <div className="p-3">
                    <CardTitle>{product.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <CardDescription>{product.description.slice(0,80)}...</CardDescription>
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