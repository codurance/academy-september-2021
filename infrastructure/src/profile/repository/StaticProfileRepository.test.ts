import {ProfileSearchQuery} from "skillset";
import {StaticProfileRepository} from "./StaticProfileRepository";

describe('static profile repository', () => {
    const staticProfileRepository = new StaticProfileRepository();

   test('find matching profiles with skills', () => {
       const query: ProfileSearchQuery = {
           skills: ['TYPESCRIPT', 'ServerLess', 'kotlin']
       };

       const result = staticProfileRepository.search(query);

       expect(result.length).toEqual(3);
       expect(result[0].name).toBe('Jordan Colgan');
       expect(result[1].name).toBe('Simon Rosenberg');
       expect(result[2].name).toBe('Amandeep Panesar');
   });
});