import { Session } from "../models/session.model";
import { User } from "../models/user.model";

export async function verifySession(sessionId: string){
    let session = await Session.find({
        payload: sessionId
    }).exec();

    if(session.length == 0)
        return {
            message: 'No Session Found!',
            success: false,
            data: null
        }
    else {
        let username = session[0].username;
        let user = await User.find({
            username: username
        }).exec();

        if(user.length == 0)
            return {
                message: 'User Not Found',
                data: null,
                success: false
            };
        
        return {
            message: "Session Found",
            data: null,
            success: true,
            user: session[0].username
        }
    }
}