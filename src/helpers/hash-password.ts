import * as bcrypt from 'bcrypt';
import * as process from 'node:process';

export class HashPassword {
  private static saltRounds = process.env.CRYPT_SALT;

  static async hashPassword(password: string): Promise<string> {
    const saltValue = await bcrypt.genSalt(parseInt(this.saltRounds));
    const hashedPassword = await bcrypt.hash(password, saltValue);
    return hashedPassword;
  }

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default HashPassword;
