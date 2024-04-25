import { Button } from '@/components/ui/button';
import { Trash2Icon, PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { PencilSquareIcon } from '@/components/icons';

export function DeleteButton({ onClick, className }: { onClick: () => void, className: string }) {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={onClick}
                        className={cn(
                            "transition duration-200 ease-in-out transform active:scale-75",
                            className
                        )}
                    >
                        <Trash2Icon className='h-3 w-3' />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={2} className=" bg-red-200 dark:bg-red-500/40">
                    <p >Delete Hierarchy?</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function AddButton({ onClick, className, children }: { onClick: () => void, className: string, children: React.ReactNode }) {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={onClick}
                        className={cn(
                            "transition duration-500 ease-in-out transform active:scale-75",
                            className
                        )}
                    >
                        <PlusIcon className='h-3 w-3' />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={2}>
                    {children}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function EditContentButton({ onClick, className, children }: { onClick: () => void, className?: string, children: React.ReactNode }) {
    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size="icon"
                        onClick={onClick}
                        className={cn(
                            "transition duration-500 ease-in-out transform active:scale-75",
                            className
                        )}
                    >
                        <PencilSquareIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={2}>
                    {children}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}