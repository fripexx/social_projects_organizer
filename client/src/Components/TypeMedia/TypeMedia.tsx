import React, {FC, useEffect} from 'react';
import iconPhoto from "../../assets/images/icons/photo-icon.svg";
import iconVideo from "../../assets/images/icons/video-icon.svg";
import iconDocument from "../../assets/images/icons/document-icon.svg";
import {ReactSVG} from "react-svg";

interface TypeMediaProps extends React.HTMLProps<HTMLDivElement> {
    type: string,
}

const TypeMedia:FC<TypeMediaProps> = ({type, ...rest}) => {
    const [icon, setIcon] = React.useState<string>()

    useEffect(() => {
        switch (type) {
            case "image":
                setIcon(iconPhoto);
                break;

            case "video":
                setIcon(iconVideo);
                break;

            default:
                setIcon(iconDocument);
                break;
        }
    }, [type]);

    return (
        <div {...rest}>
            {icon &&
                <ReactSVG src={icon}/>
            }
        </div>
    );
};

export default TypeMedia;