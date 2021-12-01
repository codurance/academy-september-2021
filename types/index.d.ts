declare module 'skillset' {
    export interface Profile {
        name: string;
        role: string;
        skills: string[];
        imageUrl: string;
    }

    export interface ProfileSearchQuery {
        skills: string[];
    }
}