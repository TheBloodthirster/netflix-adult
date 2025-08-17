import database from './database';

export const contentAPI = {
  getAllContent: async () => ({ data: await database.getAllContent() }),
  getContentByType: async (type) => ({ data: await database.getContentByType(type) }),
  getContentByLanguage: async (language) => ({ data: await database.getContentByLanguage(language) }),
};

export const userAPI = {
  createUser: async (userData) => ({ data: await database.createUser(userData) }),
  getUserByWorkId: async (workid) => ({ data: await database.getUserByWorkId(workid) }),
  getUserList: async (userId) => ({ data: await database.getUserList(userId) }),
  addToUserList: async (userId, contentId) => ({ data: await database.addToUserList(userId, contentId) }),
  removeFromUserList: async (userId, contentId) => ({ data: await database.removeFromUserList(userId, contentId) }),
  getWatchHistory: async (userId) => ({ data: await database.getWatchHistory(userId) }),
  updateWatchHistory: async (userId, contentId, watchTime, totalTime) => 
    ({ data: await database.updateWatchHistory(userId, contentId, watchTime, totalTime) }),
};

export const getCurrentUser = () => {
  const ONEDAY_CONFIG = window.ONEDAY_CONFIG || window.parent?.ONEDAY_CONFIG;
  return ONEDAY_CONFIG?.user || null;
};

export const initializeUser = async () => {
  const currentUser = getCurrentUser();
  if (!currentUser || !currentUser.workid) {
    return null;
  }

  try {
    let user;
    try {
      const response = await userAPI.getUserByWorkId(currentUser.workid);
      user = response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        const response = await userAPI.createUser({
          workid: currentUser.workid,
          name: currentUser.name || '用户',
          headImg: currentUser.headImg || '',
          email: currentUser.email || '',
        });
        const newUserResponse = await userAPI.getUserByWorkId(currentUser.workid);
        user = newUserResponse.data;
      } else {
        throw error;
      }
    }
    
    return user;
  } catch (error) {
    console.error('初始化用户失败:', error);
    return null;
  }
};

export default { contentAPI, userAPI };
