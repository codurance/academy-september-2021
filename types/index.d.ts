declare module 'skillset' {
    export interface Profile {
        name: string;
        email: string;
        role: string;
        skills: ProfileSkill[];
        imageUrl: string;
        isAvailable: boolean;
        currentClient: string;
    }

    export interface ProfileSearchQuery {
        skills: string[];
        isAvailable: boolean;
    }

    export interface ProfileSkill {
        name: string;
        level: number;
    }

    export interface UpdatedProfile {
        skills: ProfileSkill[];
    }
}