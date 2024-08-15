interface Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

interface ProfileResponse {
    profile: Profile;
}

