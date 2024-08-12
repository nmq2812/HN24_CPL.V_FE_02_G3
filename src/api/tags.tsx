import axios from "axios";

const getTags = async (): Promise<string[]> => {
    try {
        const response = await axios.get("https://api.realworld.io/api/tags");
        console.log(response.data.tags);
        return response.data.tags;
    } catch (error) {
        console.error("Error fetching the tags:", error);
        return ["error"];
    }
};

export default getTags;
