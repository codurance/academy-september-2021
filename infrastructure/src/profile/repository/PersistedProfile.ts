import {Profile, ProfileSkill} from "skillset";

export class PersistedProfile implements Profile {
    currentClient: string;
    email: string;
    imageUrl: string;
    isAvailable: boolean;
    name: string;
    role: string;
    skills: ProfileSkill[];

    constructor(profile: Profile) {
        this.currentClient = profile.currentClient;
        this.email = profile.email;
        this.imageUrl = profile.imageUrl;
        this.isAvailable = profile.isAvailable;
        this.name = profile.name;
        this.role = profile.role;
        this.skills = profile.skills;
    }

    public hasSkills(skills: string[]): boolean {
        const formattedSkills = skills.map((skill: string) => skill.toLowerCase());
        const formattedProfileSkills = this.skills.flatMap((skill: ProfileSkill) => skill.name.toLowerCase());
        return formattedProfileSkills.some(profileSkill => formattedSkills.includes(profileSkill));
    }
}
