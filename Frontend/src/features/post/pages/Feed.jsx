import React, { useEffect } from 'react';
// import '../../style.scss'   // global styles
import '../style/feed.scss';
import Post from '../components/Post';
import { usePost } from '../hook/usePost';

const Feed = () => {
  const { feed, loading, handleGetFeed } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, [handleGetFeed]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="feed-page">
      <div className="feed">
        {feed && feed.length > 0 ? (
          feed.map((item) => <Post key={item._id} user={item.user} post={item} />)
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </main>
  );
};

export default Feed
