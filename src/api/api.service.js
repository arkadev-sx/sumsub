import axios from "axios";
export const apiService = {
  async giphy(query, offset, limit) {
    return axios
      .get(
        `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=WxdyYLhMuub9clDtbglE0bJkSBExzePj&limit=${limit}&offset=${offset}`
      )
      .then((res) => res.data);
  },
};
//
