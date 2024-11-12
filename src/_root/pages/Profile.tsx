import { FaCog } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useGetCurrentUserPosts,
  useGetUserDetails,
} from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Models } from "appwrite";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserContext();
  const { ref, inView } = useInView();
  const { data: userData } = useGetUserDetails(id || "");
  const {
    data: posts,
    isFetching: isFetchingPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetCurrentUserPosts(id || "");

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <div className="flex flex-1">
      <div className="profile-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">Profile</h2>
        <div className="profile-inner_container">
          <div className="flex w-full justify-between gap-5 items-center">
            <div className="flex flex-col items-center">
              <img
                src={
                  userData?.imageUrl || "/assets/icons/profile-placeholder.svg"
                }
                alt="user"
                width={150}
                height={150}
                className="rounded-full"
              />
              <p className="base-medium lg:body-bold text-light-1 mt-1">
                {userData?.name}
              </p>
              <p className="base-small text-light-1 mt-1">{userData?.bio}</p>
            </div>
            <div>
              {userData && user.id === userData.$id && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <FaCog className="h-10 w-10" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to={`/update-profile/${user.id}`}>
                        Edit Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={`/update-password/${user.id}`}>
                        Change Password
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-9 w-full max-w-5xl mt-10">
          <ul className="grid-container">
            {posts?.pages.map((item: any, index) => (
              <React.Fragment key={index}>
                {item.documents.map((doc: Models.Document) => (
                  <li key={doc.$id} className="relative min-w-80 h-80">
                    <Link to={`/posts/${doc.$id}`} className="grid-post_link">
                      <img
                        src={doc.imageUrl}
                        alt="post"
                        className="h-full w-full object-cover"
                      />
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>

          {isFetchingPosts && hasNextPage && (
            <div className="flex-center items-center w-full mt-2">
              <Loader />
            </div>
          )}
        </div>

        {hasNextPage && <div ref={ref} className="mt-10"></div>}
      </div>
    </div>
  );
};

export default Profile;
