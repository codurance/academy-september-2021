import {ProfileRepository} from "./ProfileRepository";
import {Profile, ProfileSearchQuery} from "skillset";
import {PersistedProfile} from "./PersistedProfile";
import AWS from "aws-sdk";

export class DynamoProfileRepository implements ProfileRepository {
    private client = new AWS.DynamoDB.DocumentClient({
        region: process.env.region ?? 'localhost',
        endpoint: 'http://localhost:8000'
    });

    async get(email: string): Promise<Profile | undefined> {
        const result = await this.client
            .get({
                TableName: process.env.PROFILES_TABLE!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                Key: {email},
            })
            .promise();

        return result.Item as Profile;
    }

    save(profile: Profile): Promise<void> {
        console.log(profile);
        return Promise.resolve(undefined);
    }

    async search(query: ProfileSearchQuery): Promise<Profile[]> {
        const result = await this.client
            .scan({
                TableName: process.env.PROFILES_TABLE! // eslint-disable-line @typescript-eslint/no-non-null-assertion
            })
            .promise();

        const persistedProfiles = result.Items?.map(item => new PersistedProfile(item as Profile));
        if (!persistedProfiles) return [];

        return persistedProfiles.filter(profile => profile.hasSkills(query.skills));
    }
}