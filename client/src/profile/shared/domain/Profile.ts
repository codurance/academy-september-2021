export interface Profile {
    name: string;
    role: string;
    imageUrl: string;
    isAvailable: boolean;
    currentClient: string;
    skill: {
        searchedSkill: string,
        searchedSkillRating: string
    };
}
