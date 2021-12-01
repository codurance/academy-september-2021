import {ProfileRepository} from "./ProfileRepository";
import {Profile, ProfileSearchQuery} from "skillset";

export class StaticProfileRepository implements ProfileRepository {

    private readonly profiles: Profile[] = [
        {
            name: 'Alexander Howson',
            role: 'Software Craftsperson in Training',
            skills: ['C#', 'Java', 'Rust'],
            imageUrl: 'https://www.codurance.com/hubfs/Picture.jpg',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Amandeep Panesar',
            role: 'Software Craftsperson in Training',
            skills: ['Docker', 'Serverless', 'React', 'Java'],
            imageUrl: 'https://www.codurance.com/hubfs/IMG_5435-2.jpg',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Darío Fernández',
            role: 'Software Craftsperson in Training',
            skills: ['Javascript', 'React', 'Design'],
            imageUrl: 'https://www.codurance.com/hubfs/Dario_Fernandez.png',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Jordan Colgan',
            role: 'Software Craftsperson in Training',
            skills: ['Angular', 'Kotlin', 'Typescript', 'React', 'Java'],
            imageUrl: 'https://www.codurance.com/hubfs/jordan-colgan-photo.jpg',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Simon Rosenberg',
            role: 'Software Craftsperson in Training',
            skills: ['React', 'Typescript', 'Java'],
            imageUrl: 'https://www.codurance.com/hubfs/picture%20(1).jpg',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Samuel Steel',
            role: 'Software Craftsperson in Training',
            skills: ['React', 'Javascript', 'Java'],
            imageUrl: 'https://www.codurance.com/hubfs/Sam.jpeg',
            isAvailable: false,
            currentClient: 'Academy'
        },
        {
            name: 'Niall Bambury',
            role: ' Software Craftsperson ',
            skills: ['Java', 'Sprint', 'Javascript', 'React'],
            imageUrl: 'https://www.codurance.com/hubfs/niall.jpg',
            isAvailable: true,
            currentClient: 'On the bench'
        },
    ];

    search(query: ProfileSearchQuery): Profile[] {
        let matchingProfiles: Profile[] = [];

        query.skills.forEach(skill => {
            const formattedSkill = skill.toLowerCase();
            const profilesWithSkill = this.profiles.filter(profile => {
                    const formattedSkills = profile.skills.map(skill => skill.toLowerCase());
                    return formattedSkills.includes(formattedSkill);
                }
            );
            matchingProfiles = [...new Set([...matchingProfiles, ...profilesWithSkill])]
        });

        return matchingProfiles;
    }
}