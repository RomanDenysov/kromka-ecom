import { cn } from "../utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/tooltip";

export function Hint(props: { children: React.ReactNode, className?: string, tooltip: string }) {
    const { children, className, tooltip } = props
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent className={cn('font-semibold px-1', className)}>{tooltip}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}