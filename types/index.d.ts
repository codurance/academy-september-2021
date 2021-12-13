declare module 'skillset' {
    export interface Profile {
        name: string;
        email: string;
        role: string;
        skills: ProfileSkill[];
        imageUrl: string;
        isAvailable: boolean;
        currentClient?: string;
    }

    export interface ProfileSearchQuery {
        skills: string[];
        hasRequestedAvailableOnly: boolean;
    }

    export interface ProfileSkill {
        name: string;
        level: number;
    }

    export interface UpdatedProfile {
        isAvailable: boolean;
        currentClient?: string;
        role: string;
        skills: ProfileSkill[];
    }
}