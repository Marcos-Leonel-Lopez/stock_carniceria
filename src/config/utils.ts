import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//move to auth service later
// async function createHash(password: string): Promise<string> {
// 	const saltRounds = 10;
// 	try {
// 		const hashedPassword = await bcrypt.hash(password, saltRounds);
// 		return hashedPassword;
// 	} catch (error) {
// 		console.error('Error hashing password:', error);
// 		throw error;
// 	}
// }
// async function compareHash(password: string, hash: string): Promise<boolean> {
// 	try {
// 		const isMatch = await bcrypt.compare(password, hash);
// 		return isMatch;
// 	} catch (error) {
// 		console.error('Error comparing password:', error);
// 		throw error;
// 	}
// }
//export { createHash, compareHash };

export default __dirname;
