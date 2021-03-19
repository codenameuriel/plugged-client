export { changePage, firstPage } from './pageManager';
export {
  getNews,
  clearNews,
  getDashboardNews,
  getSources,
  saveNewsStory,
  removeFromCollection,
  clearTopicNews
} from './news';
export { login, signup, clearAuthError } from './auth';
export { clearParams, setSearchTopic, setCategoryParam } from './params';
export { subscribeToCategories } from './subscription';