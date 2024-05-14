import { promises as fs } from 'fs';

export class SharedModules {

    readFileAsync = async (path: string): Promise<any> => {
        try {
            const data = await fs.readFile(path, { encoding: 'utf8' });
            return data;

        } catch (error: any) {
            console.error(`Got an error trying to read the file: ${error.message}`);
            return null;
        }
    }

}