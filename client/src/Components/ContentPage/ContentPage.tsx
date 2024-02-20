import React, {FC, HTMLAttributes, ReactNode} from 'react';

interface ContentPageProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode;
    [key: string]: any;
}

const ContentPage:FC<ContentPageProps> = ({children, ...contentPageProps}) => {
    return (
        <div {...contentPageProps}>
            {children}
        </div>
    );
};

export default ContentPage;