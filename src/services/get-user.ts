
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export async function getUser() {
  try {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error('Token is missing');
    }
    
    const response = await fetch('https://node-express-conduit.appspot.com/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data = await response.json();
    console.log(data.user);


    return data.user;
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(error.message || 'Something went wrong while logging in');
  }
}
