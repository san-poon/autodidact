'use client';

import { useState } from "react";
import LearningPathTitle from "./LearningPathTitle";
import PathsTree from "./PathsTree";
import LearningPathTabs from "./LearningPathTabs";
import DetailsEditor from "./DetailsEditor";
import { cn } from "@/lib/utils";
import LessonEditor from "./LessonEditor";
import Menu from "@/components/ui/Menu";
import { usePaths } from "./PathsContext";
import { ActivePathContext } from "./ActivePathContext";

export default function LearningPathEditor() {
    const [activePathID, setActivePathID] = useState('ROOT'); // Default active path.
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const paths = usePaths();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handlePathClick = (pathID: string) => {
        if (activePathID === pathID) return;
        else setActivePathID(pathID);
    }

    // Root represents the title of the learning path and
    // make sure not to place delete button rendering it.
    const root = paths["ROOT"];
    const rootChildIDs = root?.childIDs;

    return (
        <div className="min-h-[78vh] w-full">
            <LearningPathTabs>
                <div className="flex justify-between lg:justify-end mx-2 md:mx-8">
                    <Menu className="lg:hidden" isOpen={isMenuOpen} onClick={handleMenuToggle} />
                    <DetailsEditor />
                </div>
                <section className=" min-h-[60vh] lg:flex">
                    <section className={cn("lg:w-1/3", isMenuOpen ? 'block' : "hidden lg:block")}>
                        <div className="flex justify-center my-4">
                            <LearningPathTitle />
                        </div>
                        <ul >
                            {rootChildIDs.length > 0 && rootChildIDs.map((id: string) => (
                                <PathsTree
                                    key={id}
                                    pathID={id}
                                    level={1}
                                    activePathID={activePathID}
                                    onPathClick={handlePathClick}
                                />
                            ))}
                        </ul>
                    </section>
                    <section className={cn(
                        " mx-1 md:mx-12 lg:mx-24 lg:w-2/3", isMenuOpen ? "hidden lg:block" : "block"
                    )}>
                        <ActivePathContext.Provider value={activePathID}>
                            <LessonEditor />
                        </ActivePathContext.Provider>
                    </section>
                </section>
            </LearningPathTabs>
        </div>
    );
}