import io from "socket.io-client";
import { BaseURL } from "./Constant";

export const CreateSocketConnection = () => {
    return io(BaseURL);
} 