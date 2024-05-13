import Link from "next/link";
import { auth } from '@/auth';
import ThemeToggler from "./theme-toggler";
import Logo from "../../components/logo";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { MenuIcon } from "@/components/icons";
import UserMenu from './UserMenu';

export default async function Header() {
    const session = await auth();
    const user = session?.user;
    let isUserSignedin: boolean;
    if (user) {
        isUserSignedin = true;
    } else isUserSignedin = false;

    return (

        <header className="z-50 sticky top-0">
            <nav className="duration-300 backdrop-filter backdrop-blur-lg backdrop-saturate-200 transition-shadow bg-opacity-90 items-center w-full flex justify-between bg-white dark:bg-wash-800 dark:bg-opacity-95 px-1.5 lg:pe-2.5 lg:ps-4 z-50 dark:shadow-wash-780 shadow">
                <div className="flex items-center justify-between w-full h-16 gap-0 sm:gap-3">
                    <Link href="/" title="Master the craft, Together. Contribute and Learn...">
                        <div className="flex items-center justify-center duration-300 p-2 transition-transform hover:scale-105 rounded-full">
                            <Logo />
                        </div>
                    </Link>
                    <div className="md:space-x-2">
                        <Button>
                            <Link href="/create/learning-path" title="Create from a part of the lesson to whole new learning-path.">
                                Create
                            </Link>
                        </Button>
                        <Button>
                            <Link href="/learn/quiz/mcqs" title="Learn JS through quizzes">
                                Learn
                            </Link>
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        <UserMenu isUserSignedin={isUserSignedin} />
                        <ThemeToggler />
                    </div>
                </div>
            </nav>
        </header >
    )
}

function MobileMenu() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>
                    <MenuIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit text-sm leading-loose rounded-xl">
                <div className="flex flex-col">
                    <Link href="/create/lesson" className="">
                        Create a Lesson
                    </Link>
                    <Link href="/learn/quiz/mcqs">
                        Play Js Quiz
                    </Link>
                    <Link href="/create/category-hierarchy">
                        Create Learning Path
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    )
}