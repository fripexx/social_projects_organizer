import React, {FC, useEffect, useState} from 'react';
import classes from "../../EditInstagramPublication/EditInstagramPublication.module.scss";
import Chat from "../../../../Components/Chat/Chat";
import {useSocket} from "../../../../context/Socket-Context";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {Socket} from "socket.io-client";
import {PostBase} from "../../../../store/types/PostType";
import {BasicUserInfo, UserType} from "../../../../store/types/UserType";
import {TeamMemberType} from "../../../../store/types/TeamMemberType";

interface ChatPostProps {
    post: PostBase;
    className?: string;
    user: UserType;
    team: TeamMemberType[]
}

const ChatPost: FC<ChatPostProps> = ({post, className, team, user}) => {
    const socket = useSocket()
    const [teamChat, setTeamChat] = useState<BasicUserInfo[]>([]);
    const [socketConnected, setSocketConnected] = useState<boolean>(false)

    useEffect(() => {
        if (!socketConnected) {
            const socketRoom: Socket = socket.emit('joinRoom', {room: post.id, model: "Post"});
            setSocketConnected(socketRoom.connected);
        }
        return () => {
            socket.emit("leaveRoom", {room: post.id, model: "Post"});
        }
    }, []);
    useEffect(() => {
        setTeamChat(team.map(item => item.user))
    }, [team]);

    return (
        <>
            {/*{post && post.status !== "unpublish" && user ? (*/}
                <Chat
                    className={className}
                    chat={post.id}
                    socket={socket}
                    model={'Post'}
                    currentUser={user}
                    team={teamChat}
                />
            {/*// ) : (*/}
            {/*//     <span className={classes.withoutChat}>Для того щоб розпочати чат потрібно зберегти публікацію</span>*/}
            {/*// )}*/}
        </>
    );
};

export default ChatPost;