import React, {FC} from 'react';
import classes from "./Notes.module.scss";
import {NoteType} from "../../store/types/NoteType";
import Note, {ChangeCallback, DeleteCallback} from "../Note/Note";

interface NotesProps {
    notes: NoteType[],
    changeCallback?:ChangeCallback,
    deleteCallback?: DeleteCallback,
}

const Notes: FC<NotesProps> = ({notes, deleteCallback, changeCallback}) => {
    return (
        <div className={classes.notes}>

            {
                notes.map(note => {
                    return(
                        <Note
                            key={note.id}
                            note={note}
                            deleteCallback={deleteCallback}
                            changeCallback={changeCallback}
                        />
                    )
                })
            }

        </div>
    );
};

export default Notes;