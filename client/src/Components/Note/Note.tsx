import React, {FC, useEffect, useState, useRef, Ref} from 'react';
import classes from "./Note.module.scss";
import {NoteType} from "../../store/types/NoteType";
import dumpIcon from "../../assets/images/icons/dump-icon.svg";
import {useAppSelector} from "../../store/hooks/redux";
import {PhotoType} from "../../store/types/FileType";
import Logo from "../Logo/Logo";

export type ChangeCallback = (noteId: string, text: string) => void;
export type DeleteCallback = (noteId: string) => void;

interface NoteProps {
    note: NoteType,
    changeCallback?: ChangeCallback,
    deleteCallback?: DeleteCallback,
    showPhoto?: boolean
}

interface StylesType {
    [key: string]: string
}

const Note: FC<NoteProps> = ({note, changeCallback, deleteCallback, showPhoto}) => {
    const user = useAppSelector(state => state.UserReducer.user);
    const project = useAppSelector(state => state.ProjectReducer.project);
    const {id, text, author} = note;

    // Refs
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const noteCardRef = useRef<HTMLDivElement>(null);
    const notePopupRef = useRef<HTMLDivElement>(null);

    // States
    const [textNote, setText] = useState<string>(text);
    const [changeHeight, setChangeHeight] = useState<boolean>(true)
    const [editState, setEditState] = useState<"show" | "hide" | null>(null)
    const [showDelete, setShowDelete] = useState<boolean>(false)
    const [authorPhoto, setAuthorPhoto] = useState<PhotoType | null>(null)

    const setPopupStyles = (elem:React.RefObject<HTMLDivElement>, styles: StylesType): void => {
        if(elem.current) Object.assign(elem.current.style, styles);
    };
    const showEdit = (e: React.MouseEvent<HTMLTextAreaElement>): void => {
        e.preventDefault();
        setEditState("show");
    }
    const hideEdit = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setEditState("hide");
    }
    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        e.preventDefault();
        const value = e.currentTarget.value;

        setText(value);
        if(changeCallback) changeCallback(id, value)
        setChangeHeight(true);
    }
    const deleteHandler = (e: React.MouseEvent<HTMLDivElement>):void => {
        e.preventDefault();
        if(deleteCallback) deleteCallback(id);
    }

    useEffect(() => {
        if (changeHeight && textAreaRef.current) {
            const roundedHeight = Math.ceil(textAreaRef.current.scrollHeight / 20) * 20;

            if(roundedHeight > 140) {
                textAreaRef.current.style.height = 'auto';
                textAreaRef.current.style.height = `${roundedHeight}px`;
            } else {
                textAreaRef.current.style.height = '140px';
            }

            setChangeHeight(false)
        }
    }, [changeHeight]);
    useEffect(() => {
        if(noteCardRef.current && editState !== null) {

            // Початкові значення положення та розмірів попапу
            const width = noteCardRef.current.offsetWidth;
            const height = noteCardRef.current.offsetHeight;
            const clientRect = noteCardRef.current.getBoundingClientRect();

            if(editState === "show" && noteCardRef.current && notePopupRef.current) {

                // Відображаємо попап та встановлюємо на початкове місце
                setPopupStyles(notePopupRef, {
                    'display': 'flex',
                    'position': 'fixed',
                    'width': `${width}px`,
                    'height': `${height}px`,
                    'top': `${clientRect.top}px`,
                    'right': `${clientRect.right}px`,
                    'bottom': `${clientRect.bottom}px`,
                    'left': `${clientRect.left}px`
                })

                // Скриваємо карточку
                setPopupStyles(noteCardRef, {'visibility': 'hidden'});

                // Відображаємо фон затемнення
                document.body.setAttribute('data-backdrop', 'true');

                setTimeout(() => {
                    if(notePopupRef.current) {

                        // Виносимо попап в центр вікна
                        setPopupStyles(notePopupRef, {
                            'transition': 'all 0.2s ease-in-out',
                            'top': `calc(50% - var(--open-height, 500px) / 2)`,
                            'left': `calc(50% - var(--open-width, 700px) / 2)`,
                            'width': 'var(--open-width, 700px)',
                            'max-width': 'var(--open-width, 700px)',
                            'height': 'var(--open-height, 500px)',
                            'max-height': 'var(--open-height, 500px)',
                            'padding-top': '51px',
                        })

                        // Змінюємо стан на активний для того щоб застосувались стилі
                        notePopupRef.current.setAttribute('data-open', 'true');
                    }
                }, 100)
            }

            if(editState === "hide" && noteCardRef.current) {
                if(notePopupRef.current) {

                    // Змінюємо стан на активний для того щоб скасувались стилі
                    notePopupRef.current.removeAttribute('data-open');

                    // Повертаємо на початкове місце
                    setPopupStyles(notePopupRef, {
                        'width': `${width}px`,
                        'height': `${height}px`,
                        'max-height': '400px',
                        'top': `${clientRect.top}px`,
                        'right': `${clientRect.right}px`,
                        'bottom': `${clientRect.bottom}px`,
                        'left': `${clientRect.left}px`,
                        'padding-top': '10px',
                    })
                    setPopupStyles(noteCardRef, {'visibility': 'hidden'});

                    // Скриваємо фон затемнення
                    document.body.setAttribute('data-backdrop', 'false');

                    // Призводимо до початкового стану після заверщення анімації
                    setTimeout(() => {

                        // Показуємо карточку
                        if(noteCardRef.current) setPopupStyles(noteCardRef, {'visibility': 'unset'});

                        // Скриваємо попап
                        setTimeout(() => {
                            if(notePopupRef.current) notePopupRef.current.removeAttribute('style')
                        }, 100)
                    }, 150)
                }

                setEditState(null);
            }
        }
    }, [editState]);
    useEffect(() => {
        if (user && author !== null) {
            if ((typeof author === "object" && author.id === user.id) || (project && project.administrator === user.id)) {
                setShowDelete(true);
            }
        }
    }, [user, author]);
    useEffect(() => {
        if(showPhoto && author !== null && typeof author === "object" && author.photo !== null) setAuthorPhoto(author.photo)
    }, [author]);

    return (
        <div className={classes.container}>

            <div className={[classes.note, classes.noteCard].join(' ')} ref={noteCardRef}>

                <textarea
                    onClick={showEdit}
                    ref={textAreaRef}
                    className={classes.text}
                    value={textNote}
                    readOnly={true}
                />

                <div className={classes.footer}>

                    {authorPhoto &&
                        <Logo photo={authorPhoto} size={31} showBorder={false}/>
                    }

                    <div className={classes.delete} onClick={deleteHandler}>
                        <img src={dumpIcon} alt=""/>
                    </div>

                </div>

            </div>

            <div className={[classes.note, classes.notePopup].join(" ")} ref={notePopupRef}>

                <div className={classes.close} onClick={hideEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="15px" width="15px" viewBox="0 0 490 490"><polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/></svg>
                </div>

                <textarea
                    className={classes.text}
                    value={textNote}
                    onChange={changeHandler}
                />

                <div className={classes.footer}>

                    {authorPhoto &&
                        <Logo photo={authorPhoto} size={31} showBorder={false}/>
                    }

                    {showDelete &&
                        <div className={classes.delete} onClick={deleteHandler}>
                            <img src={dumpIcon} alt=""/>
                        </div>
                    }

                </div>

            </div>

        </div>
    );
};

export default Note;