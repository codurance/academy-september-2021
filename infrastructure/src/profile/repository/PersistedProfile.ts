import {Profile, ProfileAvailability, ProfileSkill} from "skillset";

export class PersistedProfile implements Profile {
    name: string;
    email: string;
    imageUrl: string;
    role: string;
    location: string;
    availability: ProfileAvailability;
    skills: ProfileSkill[];

    constructor(profile: Profile) {
        this.name = profile.name;
        this.email = profile.email;
        this.imageUrl = profile.imageUrl;
        this.role = profile.role;
        this.skills = profile.skills;
        this.availability = profile.availability;
        this.location = profile.location;
    }

    public hasSkills(skills: string[]): boolean {
        const formattedSkills = this.formatSkills(skills);
        const formattedProfileSkills = this.formatProfileSkills();
        return formattedProfileSkills.some(profileSkill => formattedSkills.includes(profileSkill));
    }

    public isExactMatch(skills: string[]): boolean {
        const formattedSkills = this.formatSkills(skills);
        const formattedProfileSkills = this.formatProfileSkills();
        return formattedSkills.every(skill => formattedProfileSkills.includes(skill));
    }

    private formatSkills(skills: string[]): string[] {
        return skills.map((skill: string) => skill.toLowerCase());
    }

    private formatProfileSkills(): string[] {
        return this.skills.flatMap((skill: ProfileSkill) => skill.name.toLowerCase());
    }
}
