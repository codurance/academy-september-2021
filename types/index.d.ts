declare module 'skillset' {
    export interface Profile {
        name: string;
        role: string;
        skills: string[];
        imageUrl: string;
        isAvailable: boolean;
        currentClient: string;
    }

    export interface ProfileSearchQuery {
        skills: string[];
    }
}