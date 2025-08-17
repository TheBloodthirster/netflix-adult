import { useState, useEffect } from 'react';
import { contentAPI, userAPI, initializeUser } from '../services/api';

export const useContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await contentAPI.getAllContent();
        setContent(response.data);
        setError(null);
      } catch (err) {
        console.error('获取内容失败:', err);
        setError(err.message);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error, refetch: () => fetchContent() };
};

export const useContentByType = (type) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!type) return;

    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await contentAPI.getContentByType(type);
        setContent(response.data);
        setError(null);
      } catch (err) {
        console.error(`获取${type}内容失败:`, err);
        setError(err.message);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [type]);

  return { content, loading, error };
};

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initUser = async () => {
      try {
        setLoading(true);
        const userData = await initializeUser();
        setUser(userData);
        setError(null);
      } catch (err) {
        console.error('初始化用户失败:', err);
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  return { user, loading, error };
};

export const useUserList = (userId) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserList = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await userAPI.getUserList(userId);
      setUserList(response.data);
      setError(null);
    } catch (err) {
      console.error('获取用户片单失败:', err);
      setError(err.message);
      setUserList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [userId]);

  const addToList = async (contentId) => {
    if (!userId) return false;

    try {
      await userAPI.addToUserList(userId, contentId);
      await fetchUserList();
      return true;
    } catch (err) {
      console.error('添加到片单失败:', err);
      return false;
    }
  };

  const removeFromList = async (contentId) => {
    if (!userId) return false;

    try {
      await userAPI.removeFromUserList(userId, contentId);
      await fetchUserList();
      return true;
    } catch (err) {
      console.error('从片单移除失败:', err);
      return false;
    }
  };

  return { 
    userList, 
    loading, 
    error, 
    addToList, 
    removeFromList, 
    refetch: fetchUserList 
  };
};

export const useWatchHistory = (userId) => {
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWatchHistory = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await userAPI.getWatchHistory(userId);
      setWatchHistory(response.data);
      setError(null);
    } catch (err) {
      console.error('获取观看历史失败:', err);
      setError(err.message);
      setWatchHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchHistory();
  }, [userId]);

  const updateWatchProgress = async (contentId, watchTime, totalTime) => {
    if (!userId) return false;

    try {
      await userAPI.updateWatchHistory(userId, contentId, watchTime, totalTime);
      await fetchWatchHistory();
      return true;
    } catch (err) {
      console.error('更新观看进度失败:', err);
      return false;
    }
  };

  return { 
    watchHistory, 
    loading, 
    error, 
    updateWatchProgress, 
    refetch: fetchWatchHistory 
  };
};
