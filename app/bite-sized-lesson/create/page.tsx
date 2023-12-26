'use client';
import { useState, useRef, useEffect } from 'react';
import { TextBlockButton, ImageBlockButton, CodeBlockButton, QuizBlockButton, DeleteButton, CreateButton } from './components/button-with-logo';
import Image from 'next/image';
import Textarea from './components/textarea';
import { v4 as uuidv4 } from 'uuid';

interface lessonContentItem {
    id: string;
    contentType: 'text' | 'quiz' | 'image' | 'code';
    value: any;
}

const CreatePage = () => {
    const [menuState, setMenuState] = useState<null | string>(null);
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonContent, setLessonContent] = useState<lessonContentItem[]>([{
        id: uuidv4(),
        contentType: 'text',
        value: 'Introduce...Why this lesson exist.'
    }]);

    const menuRef = useRef(null);
    const handleMenuStateChange = (id: string) => setMenuState(id);
    // Collapse menu when clicked outside the dedicated `menuRef`
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
                setMenuState(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuState]);


    // Image handlers
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLessonContent([
                ...lessonContent,
                { id: uuidv4(), contentType: 'image', value: imageUrl }
            ]);
        }
    };

    // Handle changes in lesson title input
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setLessonTitle(event.target.value);
    }

    // Handle text content addition in lessonContent
    const handleAddTextField = () => {
        const newField: lessonContentItem = {
            id: uuidv4(),
            contentType: 'text',
            value: ''
        }

        setLessonContent([...lessonContent, newField]);
    }

    // Handle insertion of text field
    const handleInsertTextField = (index: number) => {
        const newLessonContent = [...lessonContent];

        newLessonContent.splice(index + 1, 0, {
            id: uuidv4(),
            contentType: 'text',
            value: ''
        });
    };

    const handleUpdateContent = (id: string, value: any) => {
        setLessonContent((prevContent) =>
            prevContent.map((field) =>
                field.id === id ? { ...field, value } : field
            )
        )
    }

    const handleDeleteContent = (id: string) => {
        setLessonContent((prevContent) => prevContent.filter((item) => item.id !== id));
    }

    return (
        <>
            <div className="md:w-2/3 mx-auto p-4">
                {/* Title Input */}
                <TitleInput title={lessonTitle} onTitleChange={handleTitleChange} />
            </div>
            <div className={`flex flex-col md:flex-row`}>
                {/* Left Side - Content Buttons */}
                <div className={` flex justify-center items-center w-full md:w-1/12 lg:w-1/3 md:h-full p-4 bg-neutral-100 dark:bg-neutral-900 rounded shadow transition sticky top-0 md:top-4 z-50`}>
                    {/* Content Buttons */}
                    <div className="flex md:flex-col md:space-y-6 justify-center">
                        <TextBlockButton onClick={handleAddTextField} />
                        <ImageBlockButton onClick={handleImageUpload} />
                        <input
                            type='file'
                            accept='image/*'
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className=" hidden" />
                        <QuizBlockButton />
                        <CodeBlockButton />
                    </div>

                </div>

                {/* Right Side - Input Fields/Forms */}
                <div className={`flex-shrink-0 w-full md:w-11/12 lg:w-2/3 px-4`}>
                    {/* Live Preview Goes Here */}
                    <div className="bg-white dark:bg-neutral-900 md:p-2 rounded shadow border-2 dark:border-neutral-800">
                        <TitlePreview title={lessonTitle} />
                        {lessonContent.map((item, index) => (
                            <div key={item.id} className=''>
                                <div className=" relative group/content md:m-2 dark:bg-neutral-900 rounded border-2 dark:border-neutral-700">
                                    <div>
                                        {item.contentType === 'text' && (
                                            <Textarea
                                                rows={2}
                                                className="rounded w-full p-1 md:p-2 appearance-none resize-none border-none focus:outline-none dark:bg-neutral-900"
                                                placeholder='Your paragraph or... Choose from menu'
                                                name={item.contentType}
                                                value={item.value}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateContent(item.id, e.target.value)}
                                            />
                                        )}
                                        {item.contentType === 'image' && (
                                            <Image src={item.value} width={350} height={350} alt='image' />
                                        )}
                                        <div className='relative group/toolbar my-3'>
                                            <DeleteButton className='absolute bottom-0 right-0 opacity-0 transition-opacity duration-300 group-hover/content:opacity-100 text-sm h-6 px-2 py-2 m-1'
                                                onClick={() => handleDeleteContent(item.id)} />
                                            <div className='opacity-0 text-xs p-1 absolute -bottom-6 -right-0 transition duration-300 ease-in-out group-hover/toolbar:opacity-100 z-10 bg-neutral-200 dark:bg-neutral-800 rounded'>
                                                Delete
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div ref={menuRef} className=" relative flex justify-center items-center opacity-25 hover:opacity-100 transition-opacity duration-700">
                                    <CreateButton onClick={() => handleMenuStateChange(item.id)} />
                                    {menuState === item.id && (
                                        <ul className='absolute z-20 bg-neutral-200 dark:bg-neutral-800 rounded-lg'>
                                            <li><TextBlockButton onClick={() => handleInsertTextField(index)} /> </li>
                                            <li><ImageBlockButton onClick={handleImageUpload} /></li>
                                            <input
                                                type='file'
                                                accept='image/*'
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                className=" hidden" />
                                            <li><QuizBlockButton /></li>
                                            <li><CodeBlockButton /></li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};


const TitlePreview = ({ title }: any) => {
    return (
        <>
            <h1 className=" text-2xl lg:text-4xl">{title}</h1>
        </>
    )
}

const TitleInput = ({ title, onTitleChange }: any) => {
    return (
        <>
            {/* Lesson Title input */}
            <input
                type="text"
                placeholder="Lesson Title"
                value={title}
                className="w-full p-2 mb-4 border-b-2 border-blue-500 outline-none rounded shadow"

                onChange={onTitleChange}
            />
        </>
    );
}


export default CreatePage;
