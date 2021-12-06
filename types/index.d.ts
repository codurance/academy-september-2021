declare module 'skillset' {
    export interface Profile {
        name: string;
        email: string;
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