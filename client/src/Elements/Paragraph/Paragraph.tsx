import React, {FC, ReactNode} from 'react';
import classes from "./Paragraph.module.scss";

interface ParagraphProps {
    children: ReactNode;
    className?: string;

    [key: string]: any;
}

const Paragraph: FC<ParagraphProps> = ({className, ...rest}) => {
    const classCollection = [classes.paragraph];

    if (className) {
        classCollection.push(className);
    }
    return (
        <p {...rest} className={classCollection.join(" ")}>

        </p>
    );
};

export default Paragraph;