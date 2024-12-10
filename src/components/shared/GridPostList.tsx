import { Models } from "appwrite";
import PostStats from "./PostStats";
import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";
import PostDetails from "./PostDetails";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();
  const [postId, setPostId] = useState("");

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <span
            className="w-full cursor-pointer"
            onClick={() => setPostId(post.$id)}
          >
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </span>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2">
                <img
                  src={post.creator.imageUrl}
                  alt="creator"
                  className="h-8 w-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}

      {postId && (
        <PostDetails
          show={postId ? true : false}
          postId={postId}
          onClose={() => setPostId("")}
        />
      )}
    </ul>
  );
};

export default GridPostList;
