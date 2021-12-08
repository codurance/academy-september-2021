import {ProfileRepository} from "./ProfileRepository";
import {Profile, ProfileSearchQuery} from "skillset";
import {PersistedProfile} from "./PersistedProfile";
import AWS from "aws-sdk";

export class DynamoProfileRepository implements ProfileRepository {
    private client;

    constructor() {
        const { ENV } = process.env;
        const connectionOptions = ENV === 'dev'
            ? { region: 'localhost', endpoint: 'http://localhost:8000' }
            : undefined;

        this.client = new AWS.DynamoDB.DocumentClient(connectionOptions);
    }

    async get(email: string): Promise<Profile | undefined> {
        const result = await this.client
            .get({
                TableName: process.env.PROFILES_TABLE!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                Key: {email},
            })
            .promise();

        return result.Item as Profile;
    }

    async save(profile: Profile): Promise<void> {
        await this.client
            .put({
                TableName: process.env.PROFILES_TABLE!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                Item: profile,
            })
            .promise();
    }

    async search(query: ProfileSearchQuery): Promise<Profile[]> {

        const result = await this.client
            .scan({
                TableName: process.env.PROFILES_TABLE! // eslint-disable-line @typescript-eslint/no-non-null-assertion
            })
            .promise();

        let persistedProfiles = result.Items?.map(item => new PersistedProfile(item as Profile));
        if (!persistedProfiles) return [];

        if (query.isAvailable) {
            persistedProfiles = persistedProfiles.filter(profile => profile.isAvailable);
        }

        return persistedProfiles.filter(profile => profile.hasSkills(query.skills));
    }
}