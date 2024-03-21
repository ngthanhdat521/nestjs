import { hashSync, compareSync } from 'bcrypt';

export class Brypt {
	public static readonly SALT_OR_ROUNDS = 10;

	public static async hashPassword(password: string): Promise<string> {
		const hash = await hashSync(password, Brypt.SALT_OR_ROUNDS);

		return hash;
	}

	public static async comparePassword(password: string, encrypted: string): Promise<boolean> {
		const isCorrect = await compareSync(password, encrypted);
		return isCorrect;
	}
}
