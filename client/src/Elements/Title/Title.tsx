import React, {ReactNode} from 'react';
import classes from "./Title.module.scss";

interface TitleProps {
    level: number;
    children: ReactNode;
    className?: string;

    [key: string]: any;
}

const Title: React.FC<TitleProps> = ({level, className, children, ...rest}) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    const classCollection = [classes.title];

    if (className) {
        classCollection.push(className);
    }

    switch (level) {
        case 1 :
            classCollection.push(classes.h1);
            break;
        case 2 :
            classCollection.push(classes.h2);
            break;
        case 3 :
            classCollection.push(classes.h3);
            break;
        case 4 :
            classCollection.push(classes.h4);
            break;
        case 5 :
            classCollection.push(classes.h5);
            break;
        case 6 :
            classCollection.push(classes.h6);
            break;
    }

    return (
        <Tag {...rest} className={classCollection.join(" ")}>
            {children}
        </Tag>
    );
};

export default Title;