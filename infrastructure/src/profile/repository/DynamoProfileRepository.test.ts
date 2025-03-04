import {Profile, ProfileSearchQuery} from "skillset";
import {DynamoProfileRepository} from "./DynamoProfileRepository";
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import {GetItemInput, PutItemInput, ScanInput} from "aws-sdk/clients/dynamodb";

describe('dynamo database profile repository', () => {

    test('find matching profiles with skills', async () => {
        AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params: ScanInput, callback: Function) => { // eslint-disable-line @typescript-eslint/ban-types
            callback(null, mockedProfileTable());
        });
        const dynamoProfileRepository = new DynamoProfileRepository();
        const query: ProfileSearchQuery = {
            skills: ['TYPESCRIPT', 'ServerLess', 'kotlin'],
            hasRequestedAvailableOnly: false,
            hasRequestedExactMatches: false
        };

        const result = await dynamoProfileRepository.search(query);

        expect(result.length).toEqual(3);
        expect(result[0].name).toBe('Amandeep Panesar');
        expect(result[1].name).toBe('Jordan Colgan');
        expect(result[2].name).toBe('Simon Rosenberg');
    });

    test('find matching available only profiles with skills', async () => {
        AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params: ScanInput, callback: Function) => { // eslint-disable-line @typescript-eslint/ban-types
            callback(null, mockedProfileTable());
        });
        const dynamoProfileRepository = new DynamoProfileRepository();
        const query: ProfileSearchQuery = {
            skills: ['TYPESCRIPT', 'ServerLess', 'kotlin'],
            hasRequestedAvailableOnly: true,
            hasRequestedExactMatches: false
        };

        const result = await dynamoProfileRepository.search(query);

        expect(result.length).toEqual(1);
        expect(result[0].name).toBe('Jordan Colgan');
    });

    test('find matching profiles with an exact match of skills', async () => {
        AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params: ScanInput, callback: Function) => { // eslint-disable-line @typescript-eslint/ban-types
            callback(null, mockedProfileTable());
        });
        const dynamoProfileRepository = new DynamoProfileRepository();
        const query: ProfileSearchQuery = {
            skills: ['C#', 'jAVa'],
            hasRequestedAvailableOnly: false,
            hasRequestedExactMatches: true
        };

        const result = await dynamoProfileRepository.search(query);

        expect(result.length).toEqual(1);
        expect(result[0].name).toBe('Alexander Howson');
    });

    test('get one profile by email', async () => {
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('DynamoDB.DocumentClient', 'get', (params: GetItemInput, callback: Function) => { // eslint-disable-line @typescript-eslint/ban-types
            callback(null, {Item: mockedProfileTable().Items[0]});
        });
        const dynamoProfileRepository = new DynamoProfileRepository();
        const email = 'alexander.howson@codurance.com';

        const result = await dynamoProfileRepository.get(email);

        expect(result?.name).toBe('Alexander Howson');
    });

    test('save a new profile', async () => {
        let putItemInput: PutItemInput;
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('DynamoDB.DocumentClient', 'put', (params: PutItemInput, callback: Function) => { // eslint-disable-line @typescript-eslint/ban-types
            putItemInput = params;
            callback(null);
        });
        const dynamoProfileRepository = new DynamoProfileRepository();
        const profile: Profile = {
            skills: [{name: 'C#', level: 5}, {name: 'Java', level: 4}],
        } as Profile;

        await dynamoProfileRepository.save(profile);

        expect(putItemInput!.Item).toEqual(profile); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    });

    const mockedProfileTable = () => ({
        Items: [
            {
                name: 'Alexander Howson',
                email: 'alexander.howson@codurance.com',
                imageUrl: 'https://www.codurance.com/hubfs/Picture.jpg',
                role: 'Software Craftsperson in Training',
                skills: [
                    {name: 'C#', level: 4},
                    {name: 'Java', level: 3},
                    {name: 'Rust', level: 1}
                ],
                availability: {
                    isAvailable: false,
                    client: 'Academy'
                },
                notes: 'I love Greggs'
            },
            {
                name: 'Amandeep Panesar',
                email: 'amandeep.panesar@codurance.com',
                imageUrl: 'https://www.codurance.com/hubfs/IMG_5435-2.jpg',
                role: 'Software Craftsperson in Training',
                skills: [
                    {name: 'Docker', level: 5},
                    {name: 'Serverless', level: 2},
                    {name: 'React', level: 3},
                    {name: 'Java', level: 1},
                    {name: "JavaScript", level: 5}
                ],
                availability: {
                    isAvailable: false,
                    client: 'Academy'
                },
                notes: 'I haven\t had Greggs in a while'
            },
            {
                name: 'Darío Fernández',
                email: 'dario.fernandez@codurance.com',
                imageUrl: 'https://www.codurance.com/hubfs/Dario_Fernandez.png',
                role: 'Software Craftsperson in Training',
                skills: [
                    {name: 'JavaScript', level: 4},
                    {name: 'React', level: 3},
                    {name: 'Design', level: 5},
                    {name: 'Java', level: 1}
                ],
                availability: {
                    isAvailable: false,
                    client: 'Academy'
                },
                notes: 'I love donkeys, eating rabbits and S.O.L.I.D principles'
            },
            {
                name: 'Jordan Colgan',
                email: 'jordan.colgan@codurance.com',
                imageUrl: 'https://www.codurance.com/hubfs/jordan-colgan-photo.jpg',
                role: 'Software Craftsperson in Training',
                skills: [
                    {name: 'Angular', level: 5},
                    {name: 'Kotlin', level: 3},
                    {name: 'Android', level: 2},
                    {name: 'Typescript', level: 1},
                    {name: 'React', level: 2},
                    {name: 'Java', level: 1}
                ],
                availability: {
                    isAvailable: true,
                    client: undefined
                },
                notes: 'I love squats'
            },
            {
                name: 'Simon Rosenberg',
                email: 'simon.rosenberg@codurance.com',
                imageUrl: 'https://www.codurance.com/hubfs/picture%20(1).jpg',
                role: 'Software Craftsperson in Training',
                skills: [
                    {name: 'Java', level: 4},
                    {name: 'TypeScript', level: 4},
                    {name: 'React', level: 4}
                ],
                availability: {
                    isAvailable: false,
                    client: 'Academy'
                },
                notes: 'I love Semantic UI Grids'
            },
            {
                name: 'Samuel Steele',
                email: 'samuel.steele@codurance.com',
                imageUrl: 'https://www.codurance.com/hubfs/Sam.jpeg',
                role: 'Software Craftsperson in Training',
                skills: [
                    {name: 'Java', level: 3},
                    {name: 'PHP', level: 4},
                    {name: 'JavaScript', level: 3},
                    {name: 'React', level: 4}
                ],
                availability: {
                    isAvailable: false,
                    client: 'Academy'
                },
                notes: 'I love TypeScript'
            },
            {
                name: 'Niall Bambury',
                email: 'niall.bambury@codurance.com',
                imageUrl: 'https://www.codurance.com/hubfs/niall.jpg',
                role: ' Software Craftsperson',
                skills: [
                    {name: 'Java', level: 4},
                    {name: 'Spring', level: 5},
                    {name: 'JavaScript', level: 3},
                    {name: 'React', level: 4}
                ],
                availability: {
                    isAvailable: true,
                    client: undefined
                },
                notes: 'I was the facilitator for the 2021 academy'
            }
        ],
        Count: 5,
        ScannedCount: 5
    });
});