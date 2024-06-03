import io, {Socket} from 'socket.io-client';

const ioServer = (): Socket => {
    return io(`${process.env.REACT_APP_API_URL}`, {
        query: {
            token: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export default ioServer;