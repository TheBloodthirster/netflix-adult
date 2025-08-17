import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TVShows from './pages/TVShows';
import Movies from './pages/Movies';
import NewAndPopular from './pages/NewAndPopular';
import MyList from './pages/MyList';
import BrowseByLanguage from './pages/BrowseByLanguage';
import TagSystem from './pages/TagSystem';
import VideoPlayer from './pages/VideoPlayer';
import SearchResults from './pages/SearchResults';
import UserProfile from './pages/UserProfile';
import ContentDetail from './pages/ContentDetail';
import DownloadManager from './pages/DownloadManager';
import AccountSettings from './pages/AccountSettings';
import HelpCenter from './pages/HelpCenter';
import Recommendations from './pages/Recommendations';
import Trending from './pages/Trending';
import ForYou from './pages/ForYou';
import CreatorStudio from './pages/CreatorStudio';
import Upload from './pages/Upload';
import Analytics from './pages/Analytics';
import Subscription from './pages/Subscription';
import Billing from './pages/Billing';
import GiftCards from './pages/GiftCards';
import Referral from './pages/Referral';

function App() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/new-and-popular" element={<NewAndPopular />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/browse-by-language" element={<BrowseByLanguage />} />
        <Route path="/tags" element={<TagSystem />} />
        <Route path="/watch/:id" element={<VideoPlayer />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/content/:id" element={<ContentDetail />} />
        <Route path="/downloads" element={<DownloadManager />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/for-you" element={<ForYou />} />
        <Route path="/creator-studio" element={<CreatorStudio />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/referral" element={<Referral />} />
      </Routes>
    </div>
  );
}

export default App;
