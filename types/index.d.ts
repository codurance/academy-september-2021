declare module 'skillset' {
    export interface Profile {
        name: string;
        email: string;
        imageUrl: string;
        role: string;
        location: string;
        skills: ProfileSkill[];
        availability: ProfileAvailability;
    }

    export interface ProfileSearchQuery {
        skills: string[];
        hasRequestedAvailableOnly: boolean;
        hasRequestedExactMatches: boolean;
    }

    export interface ProfileSkill {
        name: string;
        level: number;
    }

    export interface ProfileAvailability {
        isAvailable: boolean;
        client?: string;
    }

    export interface UpdatedProfile {
        name: string;
        imageUrl: string;
        role: string;
        skills: ProfileSkill[];
        location: string;
        availability: ProfileAvailability;
    }
}