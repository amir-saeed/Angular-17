import dotenv from "dotenv";
import path from "path";

export const manageEnvironment = async () => {
    const mode = process.env.NODE_ENV || 'development';
    const envFile = `.env.${mode}`;
    const envPath = path.resolve(process.cwd(), envFile);
    dotenv.config({ path: envPath });
}