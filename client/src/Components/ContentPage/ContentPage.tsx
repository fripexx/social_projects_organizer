import React, {FC, ReactNode} from 'react';

interface ContentPageProps {
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