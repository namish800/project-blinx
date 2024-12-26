import bcrypt from 'bcrypt'; 


export function verifyPassword(plaintextPassword: string, hashedPassword: string): boolean {
  // Compare the provided plaintext password with the stored hash
  return bcrypt.compareSync(plaintextPassword, hashedPassword);
}
