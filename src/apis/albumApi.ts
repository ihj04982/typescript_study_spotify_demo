import axios from "axios";

export const getNewReleases = async (url: string) => {
  try {
    const response = await axios.get("/browse/new-releases");
  } catch (error) {}
};
