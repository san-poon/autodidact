export type ContentTypeProps = 'text' | 'image' | 'code' | 'maths' | 'quiz' | 'text/note' | 'text/deep-dive' | 'text/pitfall' | 'title';

export interface LessonContentBlockProps {
    id: string;
    contentType: ContentTypeProps;
    value: any;
};

export type LessonContentProps = LessonContentBlockProps[];

export type AnOptionProps = {
    id: string,
    value: string,
    isCorrect: boolean
};

export type OptionsProps = AnOptionProps[];
export type QuizProps = {
    question: string,
    options: OptionsProps,
    explanation: string,
};
export type QuizBlockProps = {
    id: string,
    contentType: ContentTypeProps,
    value: QuizProps,
};