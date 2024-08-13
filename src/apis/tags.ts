import axios from "../libs/axios";

const getTags = async (): Promise<string[]> => {
  try {
    const response = await axios.get(
      "https://node-express-conduit.appspot.com/api/tags"
    );
    return response.data.tags;
  } catch (error) {
    console.error("Error fetching the tags:", error);
    return [];
  }
};

export default getTags;
