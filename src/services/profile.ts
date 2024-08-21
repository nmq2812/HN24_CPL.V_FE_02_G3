export async function profiles(
    username?: string
  ) {
    const queryParams = new URLSearchParams();
    if (username) queryParams.append('username', username);
  
    try {
      const response = await fetch(`https://node-express-conduit.appspot.com/api/profiles${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
  
      const data = await response.json();
      return data.articles;
    } catch (error) {
      throw new Error('Something went wrong while fetching articles');
    }
  }
  