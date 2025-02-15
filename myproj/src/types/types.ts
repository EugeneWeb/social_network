export type ProfileType = {
    username: string;
    email: string;
    exercises_id: string[];
} & UserType;

export type UserType = {
    location: {
        city: string;
        country: string;
    };
    desc: {
        birthday: string;
        education: string;
    };
    _id: string;
    fullname: string;
    status: string;
    photoUrl: string;
    backgroundUrl: string;
    __v: number;
    friends: string[];
    following: string[];
    posts_id: string[];
    chats: string[]
};


export type MessageType = {
    _id: number
    timestamp: string
    message: string
    from_userId: string
    to_userId: string
}

export type FriendType = {
    name: string;
    path: string;
};
export type DialogType = {
    id: number;
    name: string;
    path: string;
};

export type PostType = {
    _id: string
    path: string;
    text: string;
    likesCount: number;
};

export type ApiItemsType<ObjType> = {
    items: ObjType[];
    totalCount: number;
    resultCode: number;
    message?: string;
    info?: {[propName: string]: any}
};

export type FilterType = {
    term: string | null;
    friend: string | null;
};


