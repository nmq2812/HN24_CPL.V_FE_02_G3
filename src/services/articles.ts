export async function fetchArticles(
    tag?: string, 
    author?: string, 
    favorited?: string, 
    limit?: number, 
    offset?: number
  ) {
    const queryParams = new URLSearchParams();
  limit = 20; offset = 0;
    if (tag) queryParams.append('tag', tag);
    if (author) queryParams.append('author', author);
    if (favorited) queryParams.append('favorited', favorited);
    queryParams.append('limit', limit.toString());
    queryParams.append('offset', offset.toString());
  
    try {
      const response = await fetch(`https://node-express-conduit.appspot.com/api/articles?${queryParams.toString()}`, {
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
  