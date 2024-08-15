export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch('https://node-express-conduit.appspot.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data = await response.json();
    return data.user;
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(error.message || 'Something went wrong while logging in');
  }
}
