import React, { useCallback, useRef, useState } from 'react';
import { usePosts } from '../../hooks';
import Post from '../Post/Post';
import styles from './styles/infinitescroll.module.css';

const InfiniteScroll = () => {
  const [pageNum, setPageNum] = useState(1);
  const { error, hasNextPage, isError, isLoading, results } = usePosts(pageNum);

  const intObserver = useRef();

  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('We are near to the last');
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p>Error: {error.message}</p>;

  const content = results.map((post, index) => {
    if (results.length === index + 1)
      return <Post ref={lastPostRef} key={index} post={post} />;
    return <Post key={index} post={post} />;
  });

  return (
    <section className={styles.infinitescroll}>
      {results.map((post, index) => (
        <Post key={index} post={post} index={index} />
      ))}
      {content}
      {isLoading && <div className={styles.load}>Loading more posts</div>}
    </section>
  );
};

export default InfiniteScroll;
