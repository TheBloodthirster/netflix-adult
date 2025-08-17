import { useState, useEffect, useCallback } from 'react';

export function useInfiniteScroll(initialData = [], itemsPerPage = 12) {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (initialData.length > 0) {
      const firstPage = initialData.slice(0, itemsPerPage);
      setDisplayedItems(firstPage);
      setHasMore(initialData.length > itemsPerPage);
      setPage(1);
    }
  }, [initialData, itemsPerPage]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    setTimeout(() => {
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newItems = initialData.slice(startIndex, endIndex);
      
      if (newItems.length > 0) {
        setDisplayedItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        setHasMore(endIndex < initialData.length);
      } else {
        setHasMore(false);
      }
      
      setIsLoading(false);
    }, 800);
  }, [initialData, page, itemsPerPage, isLoading, hasMore]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop 
        >= document.documentElement.offsetHeight - 1000) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    displayedItems,
    hasMore,
    isLoading,
    loadMore
  };
}
