// Description: This file contains cryptography about passwords.
import bcrypt from "bcrypt";

/**
 * Compares a password with its corresponding hash.
 * @param {string} password - The password to compare.
 * @param {string} hash - The hash to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the password matches the hash.
 */

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Hashes a password using bcrypt.
 * @param password - The password to be hashed.
 * @returns A Promise that resolves to the hashed password.
 * @throws Error if the bcrypt_salt environment variable is missing.
 */
export const hashPassword = async (password: string) => {
  const salt = process.env.bcrypt_saltRound;
  if (!salt) {
    throw new Error("Missing bcrypt_salt environment variable");
  }
  return await bcrypt.hash(password, Number(salt));
};
