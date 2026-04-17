export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function generatePassword(options: PasswordOptions): string {
  let charset = '';
  const requiredChars: string[] = [];

  if (options.includeUppercase) {
    charset += UPPERCASE;
    requiredChars.push(UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]);
  }
  if (options.includeLowercase) {
    charset += LOWERCASE;
    requiredChars.push(LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]);
  }
  if (options.includeNumbers) {
    charset += NUMBERS;
    requiredChars.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
  }
  if (options.includeSymbols) {
    charset += SYMBOLS;
    requiredChars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }

  if (charset.length === 0) {
    return '';
  }

  const remainingLength = options.length - requiredChars.length;
  const password = [...requiredChars];

  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password.push(charset[randomIndex]);
  }

  // Shuffle the password
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
}