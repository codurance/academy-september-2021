import {Profile, ProfileAvailability, ProfileSkill} from "skillset";

export class PersistedProfile implements Profile {
    name: string;
    email: string;
    imageUrl: string;
    role: string;
    availability: ProfileAvailability;
    skills: ProfileSkill[];


    constructor(profile: Profile) {
        this.name = profile.name;
        this.email = profile.email;
        this.imageUrl = profile.imageUrl;
        this.role = profile.role;
        this.skills = profile.skills;
        this.availability = profile.availability;
    }

    public hasSkills(skills: string[]): boolean {
        const formattedSkills = skills.map((skill: string) => skill.toLowerCase());
        const formattedProfileSkills = this.skills.flatMap((skill: ProfileSkill) => skill.name.toLowerCase());
        return formattedProfileSkills.some(profileSkill => formattedSkills.includes(profileSkill));
    }
}
