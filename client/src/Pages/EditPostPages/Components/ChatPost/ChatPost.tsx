import React, {FC, useEffect, useState} from 'react';
import classes from "../../EditInstagramPublication/EditInstagramPublication.module.scss";
import Chat from "../../../../Components/Chat/Chat";
import {useSocket} from "../../../../context/Socket-Context";
import {useAppDispatch} from "../../../../store/hooks/redux";
import {setPublication} from "../../../../store/reducers/InstagramPublicationSlice";
import {Socket} from "socket.io-client";
import {PostBase} from "../../../../store/types/PostType";
import {BasicUserInfo, UserType} from "../../../../store/types/UserType";
import {TeamMemberType} from "../../../../store/types/TeamMemberType";

interface ChatPostProps {
    post: PostBase | null;
    className?: string;
    user: UserType | null;
    team: TeamMemberType[]
}

const ChatPost: FC<ChatPostProps> = ({post, className, team, user}) => {
    const dispatch = useAppDispatch()
    const socket = useSocket()
    const [teamChat, setTeamChat] = useState<BasicUserInfo[]>([]);
    const [socketConnected, setSocketConnected] = useState<boolean>(false)

    useEffect(() => {
        if (post && !socketConnected) {
            const socketRoom: Socket = socket.emit('joinRoom', {room: post.id, model: "Post"});
            setSocketConnected(socketRoom.connected);
        }
        return () => {
            if (post) {
                socket.emit("leaveRoom", {room: post.id, model: "Post"});
                dispatch(setPublication(null));
            }
        }
    }, [post]);
    useEffect(() => {
        setTeamChat(team.map(item => item.user))
    }, [team]);

    return (
        <>
            {post && user ? (
                <Chat
                    className={className}
                    chat={post.id}
                    socket={socket}
                    model={'Post'}
                    currentUser={user}
                    team={teamChat}
                />
            ) : (
                <span className={classes.withoutChat}>Для того щоб розпочати чат потрібно зберегти публікацію</span>
            )}
        </>
    );
};

export default ChatPost;