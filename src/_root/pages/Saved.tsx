import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";
import { useInView } from "react-intersection-observer";

const Saved = () => {
  const { user } = useUserContext();
  const { ref, inView } = useInView();

  const {
    data: posts,
    isFetching: isFetchingSavedPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetSavedPosts(user.id);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Saved Posts</h2>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl mt-10">
        <ul className="grid-container">
          {posts?.pages.map((item: any, index) => (
            <React.Fragment key={index}>
              {item.documents.map((doc: any) => (
                <li key={doc.$id} className="relative min-w-80 h-80">
                  <Link
                    to={`/posts/${doc.post.$id}`}
                    className="grid-post_link"
                  >
                    <img
                      src={doc.post.imageUrl}
                      alt="post"
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="grid-post_user">
                    <div className="flex items-center justify-start gap-2">
                      <img
                        src={doc.post.creator.imageUrl}
                        alt="creator"
                        className="h-8 w-8 rounded-full"
                      />
                      <p className="line-clamp-1">{doc.post.creator.name}</p>
                    </div>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>

        {isFetchingSavedPosts && hasNextPage && (
          <div className="flex-center items-center w-full mt-2">
            <Loader />
          </div>
        )}
      </div>

      {hasNextPage && <div ref={ref} className="mt-10"></div>}
    </div>
  );
};

export default Saved;
