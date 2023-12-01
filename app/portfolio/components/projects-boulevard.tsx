import Image from "next/image";
import Logo from "@/app/images/logo.png";
import Link from "next/link";

// Projects Boulevard Component
export default function ProjectsBoulevard() {
    const projects = [
        { name: 'PlayLearnForge', description: 'Your gamified learning wonderland', imageSrc: Logo, projectUrl: "/" },
        // Add more projects as needed
    ];

    const projectClass = projects.length === 1 ? "col-span-full flex items-center justify-center" : "md:col-span-1 lg:col-span-1";

    return (
        <div className="p-2 mt-6">
            <h2 className="text-2xl font-bold dark:text-gray-200 mb-4">Projects</h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${projectClass}`}>
                {projects.map((project) => (
                    <div className={`rounded-lg overflow-hidden shadow-md dark:bg-gray-800 dark:text-white ${projectClass}`} key={project.name}>
                        <div className="relative h-40">
                            <Link href={project.projectUrl}>
                                <Image
                                    src={project.imageSrc}
                                    alt={project.name}
                                    className="rounded-md w-auto h-full p-2 transition-transform transform hover:scale-105"
                                />
                            </Link>
                        </div>
                        <div className="p-4">
                            <Link href={project.projectUrl}>
                                <h3 className="text-xl font-semibold">{project.name}</h3>
                            </Link>
                            <p className="mt-2">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
