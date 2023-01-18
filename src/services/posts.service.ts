import { Api } from '../interceptors/axios.interceptor';

export const getPostsPage = async (pageParam: number = 1, options = {}) => {
  const response = await Api.get(`/posts?_page=${pageParam}`, options);
  return response.data;
};
