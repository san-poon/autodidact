'use client';
import { useState, useRef, useEffect } from 'react';
import { TextBlockButton, ImageBlockButton, CodeBlockButton, QuizBlockButton, DeleteButton, CreateButton, ContentTypeButton } from './components/button-with-icon';
import Image from 'next/image';
import { Textarea } from './components/content-blocks';
import { v4 as uuidv4 } from 'uuid';
import { AddContentCombobox, TextCombobox } from './components/content-type-combobox';
import { getImageUrlFromUser } from './utils';
import { contentTypeProps, LessonContentBlockProps, LessonContentProps } from './types';


const initialContent: LessonContentProps = [{
    id: uuidv4(),
    contentType: 'text',
    value: 'Captivating Introduction. Every textarea acts like a basic markdown. But when it comes to adding some important section like caution, warning, show details (which are of text content type) will need different section. '
}]

const CreatePage = () => {
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonContent, setLessonContent] = useState<LessonContentProps>(initialContent);

    // Handle changes in lesson title input
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setLessonTitle(event.target.value);
    };

    const handleImageUploadClick = async () => {
        try {
            const imageUrl = await getImageUrlFromUser();
            setLessonContent([
                ...lessonContent,
                { id: uuidv4(), contentType: 'image', value: imageUrl }
            ]);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    // Handle text content addition in lessonContent
    const handleAddTextField = () => {
        const newField: LessonContentBlockProps = {
            id: uuidv4(),
            contentType: 'text',
            value: ''
        }

        setLessonContent([...lessonContent, newField]);
    }

    // Handle insertion of text field
    const handleInsertContentBlock = (index: number, contentType: string) => {
        // based on content type, content value must be different
        const newContent = (): LessonContentBlockProps => {
            switch (contentType) {
                case 'text': {
                    return {
                        id: uuidv4(),
                        contentType: 'text',
                        value: "",
                    };
                }
                case 'image': {

                }
                default: {
                    throw Error('Not a valid content-type: ' + contentType);
                }
            };
        }

        const insertAt = index + 1;
        const nextLessonContent: LessonContentProps = [
            // Items before the insertion point:
            ...lessonContent.slice(0, insertAt),
            // New item:
            newContent(),
            ...lessonContent.slice(insertAt)
        ];
        setLessonContent(nextLessonContent);
    };

    const handleUpdateContentType = (id: string, contentType: contentTypeProps) => {
        setLessonContent(lessonContent.map((content) => {
            if (content.id === id) {
                return { ...content, contentType: contentType }
            } else return content
        }))
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
                <div className={` flex justify-center items-center w-full md:w-1/12 lg:w-1/3 md:h-full p-4 rounded shadow transition sticky top-0 md:top-44 z-50`}>
                    {/* Content Buttons */}
                    <div className="flex md:flex-col md:space-y-6 justify-center">
                        <TextBlockButton onClick={handleAddTextField} />
                        <ImageBlockButton onClick={handleImageUploadClick} />
                        {/* <ImageBlockButton onClick={handleImageButtonClick} />
                        <input
                            type='file'
                            accept='image/*'
                            ref={fileInputRef}
                            onChange={handleAddImageChange}
                            className=" hidden" /> */}
                        <QuizBlockButton />
                        <CodeBlockButton />
                    </div>

                </div>

                {/* Right Side - Input Fields/Forms */}
                <div className={`flex-shrink-0 w-full md:w-11/12 lg:w-2/3 px-4`}>
                    <div className="bg-white dark:bg-neutral-900 md:p-2 rounded shadow border-2 dark:border-neutral-800">
                        <h1 className=" text-2xl md:text-4xl">{lessonTitle}</h1>
                        {lessonContent.map((item, index) => (
                            <div key={item.id}>
                                <div className=" relative group/content md:m-2 dark:bg-neutral-900 rounded border-2 dark:border-neutral-700">
                                    <div>
                                        {/* Conditionally render based on 'contentType' */}
                                        {
                                            (
                                                item.contentType === 'text'
                                                || item.contentType === 'text/note'
                                                || item.contentType === 'text/deep-dive'
                                                || item.contentType === 'text/pitfall'
                                            )
                                            && (
                                                <div>
                                                    <div className='flex items-center justify-end opacity-0 transition-opacity duration-300 group-hover/content:opacity-100 my-0'>
                                                        <TextCombobox id={item.id} onTextTypeChange={handleUpdateContentType} />
                                                    </div>
                                                    <Textarea
                                                        rows={1}
                                                        className=" w-full px-2 appearance-none resize-none border-none focus:outline-none dark:bg-neutral-900"
                                                        placeholder='Your paragraph or... Choose from menu'
                                                        name={item.contentType}
                                                        value={item.value}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateContent(item.id, e.target.value)}
                                                    />
                                                </div>
                                            )
                                        }
                                        {item.contentType === 'image' && (
                                            <div className='flex items-center justify-center'>
                                                <Image src={item.value} width={250} height={250} alt='image' />
                                            </div>
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
                                {/* ContentType Combobox */}
                                <div className='flex justify-center items-center opacity-70 md:opacity-25 hover:opacity-100 transition-opacity duration-700'>
                                    <AddContentCombobox index={index} onInsertContentField={handleInsertContentBlock} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

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
