import React, { forwardRef } from 'react';
import styles from './styles/Post.module.css';

const Post = forwardRef(({ post }, ref) => {
  const postBody = (
    <>
      <h6>Title: {post.title}</h6>
      <small>{post.id}</small>
      <div className={styles.body}>{post.body}</div>
    </>
  );
  const content = ref ? (
    <article className={styles.post} ref={ref}>
      {postBody}
    </article>
  ) : (
    <article className={styles.post}>{postBody}</article>
  );
  return content;
});

export default Post;
