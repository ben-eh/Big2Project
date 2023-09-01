import fs from 'fs';

const writeStringToFile = async ( path: string,
    data: string,
): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(path, data, 'utf-8', (err: any) => {
            if (err) reject(err);
            resolve();
        });
    });
}

const readStringFromFile = async ( path: string ): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, { encoding: "utf8" }, (err: any, data: any) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

export const jsonFileToObject = async <Type>(path: string): Promise<Type> => {
    try {
        const jsonString: string = await readStringFromFile(path);
        return JSON.parse(jsonString);
    } catch (error) {
        throw new Error('Could not read json file');
    }
}

export const objectToJsonFile = async <Type>(path: string, data: Type): Promise<void> => {
    try {
        const jsonString: string = JSON.stringify(data);
        await writeStringToFile(path, jsonString);
    } catch (error) {
        throw new Error('Could not write json file');
    }
}