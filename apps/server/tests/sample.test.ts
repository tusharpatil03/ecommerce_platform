import { describe, it, expect } from 'vitest';
import { generateJwtToken } from '../src/utilities/auth';

const payload = {
  userId: '1234',
  email: 'tushar@gmail.com',
};

describe('JWT testing', () => {
  it('should greet the user', () => {
    expect(generateJwtToken(payload)).toBeDefined();
  });
});
