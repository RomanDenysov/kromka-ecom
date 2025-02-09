import { getNameInitials } from '~/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './components/avatar';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './components/tooltip';

const AvatarStack = ({
    avatar,
    name,
    email,
}: {
    avatar?: string | null;
    name?: string;
    email: string;
}) => {

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <Avatar className="size-9 bg-secondary ring-1 ring-background">
                        {avatar && <AvatarImage src={avatar} alt={name ?? ''} />}
                        <AvatarFallback delayMs={600} className="text-xs font-medium">
                            {name ? getNameInitials(name) : 'No name'}
                        </AvatarFallback>
                    </Avatar>
                </TooltipTrigger>
                <TooltipContent collisionPadding={4}>
                    <p className="font-medium text-xs">{email}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export { AvatarStack };
