
import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex w-full flex-wrap gap-2">
                <Badge>Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
            </div>
        </div>
    )
}
