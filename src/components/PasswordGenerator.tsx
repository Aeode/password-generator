import { useState, useCallback } from 'react';
import { generatePassword, validateOptions } from '../utils/generatePassword';
import { calculateStrength } from '../utils/passwordStrength';
import type { PasswordOptions } from '../types';
import styles from './PasswordGenerator.module.css';

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = useCallback(() => {
    if (!validateOptions(options)) {
      setError('Select at least one character type');
      return;
    }
    setError('');
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  }, [options]);

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  const handleOptionChange = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const strength = calculateStrength(password);

  const strengthColors = {
    weak: '#ef4444',
    fair: '#f59e0b',
    good: '#22c55e',
    strong: '#10b981',
  };

  // Generate initial password on mount
  if (!password) {
    handleGenerate();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Password Generator</h1>

      <div className={styles.passwordDisplay}>
        <input
          type="text"
          value={password}
          readOnly
          className={styles.passwordInput}
          placeholder="Click generate"
          onClick={handleCopy}
          title="Click to copy password"
        />
        <button
          onClick={handleCopy}
          className={styles.copyButton}
          disabled={!password}
        >
          Copy
        </button>
      </div>

      {password && (
        <div className={styles.strengthBar}>
          <div className={styles.strengthLabel}>
            Strength: <strong>{strength.label}</strong>
          </div>
          <div className={styles.strengthTrack}>
            <div
              className={styles.strengthFill}
              style={{
                width: `${(strength.score / 7) * 100}%`,
                backgroundColor: strengthColors[strength.level],
              }}
            />
          </div>
        </div>
      )}

      <div className={styles.options}>
        <div className={styles.option}>
          <label>Length: {options.length}</label>
          <input
            type="range"
            min={8}
            max={32}
            value={options.length}
            onChange={(e) => handleOptionChange('length', parseInt(e.target.value))}
          />
        </div>

        <div className={styles.option}>
          <label>
            <input
              type="checkbox"
              checked={options.includeUppercase}
              onChange={(e) => handleOptionChange('includeUppercase', e.target.checked)}
            />
            Uppercase (A-Z)
          </label>
        </div>

        <div className={styles.option}>
          <label>
            <input
              type="checkbox"
              checked={options.includeLowercase}
              onChange={(e) => handleOptionChange('includeLowercase', e.target.checked)}
            />
            Lowercase (a-z)
          </label>
        </div>

        <div className={styles.option}>
          <label>
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={(e) => handleOptionChange('includeNumbers', e.target.checked)}
            />
            Numbers (0-9)
          </label>
        </div>

        <div className={styles.option}>
          <label>
            <input
              type="checkbox"
              checked={options.includeSymbols}
              onChange={(e) => handleOptionChange('includeSymbols', e.target.checked)}
            />
            Symbols (!@#$%)
          </label>
        </div>
      </div>

      <button onClick={handleGenerate} className={styles.generateButton}>
        Generate Password
      </button>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}