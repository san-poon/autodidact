import { useState } from "react";
import { cn } from "@/lib/utils";
import LessonEditor from "./LessonEditor";
import Menu from "@/components/ui/Menu";
import LessonPreview from "./LessonPreview";
import PathsEditor from "./PathsEditor";
import PathsPreview from "./PathsPreview";

export default function Editor() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    }


    return (
        <div>
            <div className="flex justify-between lg:justify-end mx-2 md:mx-8">
                <div className=" flex-1">
                    <Menu isOpen={isMenuOpen} onClick={handleMenuToggle} />
                </div>
                {/* <DetailsEditor /> */}
            </div>
            {isMenuOpen ? (
                <section className="flex-1 items-center jusitify-center">
                    <PathsEditor />
                </section>
            ) : (
                <section className="flex space-x-4 justify-evenly">
                    <div className="mx-2 w-1/2">
                        <LessonEditor />
                    </div>
                    <div className="mx-2 w-1/2">
                        <LessonPreview />
                    </div>
                </section>
            )}

        </div>
    );
}