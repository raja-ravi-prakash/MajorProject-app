import { User } from '../models/user.model';
import { UserGroup } from '../models/userGroup.model';

export const createUserGroup = async (userGroup: any) => {
    const users = userGroup.users;
    for(let item of users)
    {
        const user = await User.findOne({username: item});
        if(!user)
        {
            throw `User ${item} does not exist`;
        }
    }
    return await UserGroup.create(userGroup);
}

export const updateUserGroup = async (userGroup: any) => {
    return await UserGroup.findByIdAndUpdate(userGroup._id, userGroup);
}

export const getUserGroup = async (userGroup: any) => {
    return await UserGroup.findById(userGroup);
}

export const deleteUserGroup = async (userGroupId: string) => {
    return await UserGroup.findByIdAndDelete(userGroupId);
}
export const getAllUserGroups = async () =>{
    return await UserGroup.find({});
}