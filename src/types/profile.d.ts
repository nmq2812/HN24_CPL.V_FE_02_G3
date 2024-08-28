interface Profile {
    username: string;
    bio: string;
    image: string;
    admin: boolean;
    following: boolean;
}

interface ProfileResponse {
    profile: Profile;
}