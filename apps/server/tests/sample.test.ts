import { describe, it, expect } from 'vitest';
import axios from 'axios';

const URL = 'http://localhost:8000';

describe('User Authentication', () => {
  const email: string = `tush${Math.floor(Math.random() * 100) + 1}@gmail.com`;
  const password: string = 'tushar1234';

  it('user should able to signup', async () => {
    const SignupRes = await fetch(`${URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await SignupRes.json();

    expect(data).toMatchObject({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  it('user should not able signup twice', async () => {
    const res = await fetch(`${URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log(res);

    // Check status code first
    expect(res.status).toBe(400);
  });

  it('user should able to login', async () => {
    const res = await fetch(`${URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    expect(data).toMatchObject({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });
});
