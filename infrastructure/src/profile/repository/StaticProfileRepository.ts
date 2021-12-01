import {ProfileRepository} from "./ProfileRepository";
import {Profile, ProfileSearchQuery} from "skillset";

export class StaticProfileRepository implements ProfileRepository {

    private readonly profiles: Profile[] = [
        {
            name: 'Alexander Howson',
            role: 'Software Craftsperson in Training',
            skills: ['C#', 'Java', 'Rust'],
            imageUrl: 'https://www.codurance.com/hubfs/Picture.jpg'
        },
        {
            name: 'Amandeep Panesar',
            role: 'Software Craftsperson in Training',
            skills: ['Docker', 'Serverless', 'React', 'Java'],
            imageUrl: 'https://www.codurance.com/hubfs/IMG_5435-2.jpg'
        },
        {
            name: 'Darío Fernández',
            role: 'Software Craftsperson in Training',
            skills: ['Javascript', 'React', 'Design'],
            imageUrl: 'https://www.codurance.com/hubfs/Dario_Fernandez.png'
        },
        {
            name: 'Jordan Colgan',
            role: 'Software Craftsperson in Training',
            skills: ['Angular', 'Kotlin', 'Typescript', 'React', 'Java'],
            imageUrl: 'https://www.codurance.com/hubfs/jordan-colgan-photo.jpg'
        },
        {
            name: 'Simon Rosenberg',
            role: 'Software Craftsperson in Training',
            skills: ['React', 'Typescript', 'Java'],
            imageUrl: 'https://www.codurance.com/hubfs/picture%20(1).jpg'
        },
        {
            name: 'Samuel Steel',
            role: 'Software Craftsperson in Training',
            skills: ['React', 'Javascript', 'Java'],
            imageUrl: 'https://www.codurance.com/hubfs/Sam.jpeg'
        }
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