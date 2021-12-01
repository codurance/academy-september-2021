import {ProfileRepository} from "./ProfileRepository";
import {Profile, ProfileSearchQuery} from "skillset";

export class StaticProfileRepository implements ProfileRepository {

    private readonly profiles: Profile[] = [
        {name: 'Alexander Howson', role: 'Software Craftsperson in Training', skills: ['C#', 'Java', 'Rust']},
        {
            name: 'Amandeep Panesar',
            role: 'Software Craftsperson in Training',
            skills: ['Docker', 'Serverless', 'React', 'Java']
        },
        {name: 'Darío Fernández', role: 'Software Craftsperson in Training', skills: ['Javascript', 'React', 'Design']},
        {
            name: 'Jordan Colgan',
            role: 'Software Craftsperson in Training',
            skills: ['Angular', 'Kotlin', 'Typescript', 'React', 'Java']
        },
        {name: 'Simon Rosenberg', role: 'Software Craftsperson in Training', skills: ['React', 'Typescript', 'Java']},
        {name: 'Samuel Steel', role: 'Software Craftsperson in Training', skills: ['React', 'Javascript', 'Java']}
    ];

    search(query: ProfileSearchQuery): Profile[] {
        let matchingProfiles: Profile[] = [];

        query.skills.forEach(skill => {
            const profilesWithSkill = this.profiles.filter(profile => profile.skills.includes(skill));
            matchingProfiles = [...new Set([...matchingProfiles, ...profilesWithSkill])]
        });

        return matchingProfiles;
    }
}