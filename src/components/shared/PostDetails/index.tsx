import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import PostStats from "../PostStats";

type PostDetailsProps = {
  show: boolean;
  postId: string;
  onClose: () => void;
};

const PostDetails = ({ show = false, postId, onClose }: PostDetailsProps) => {
  const { user } = useUserContext();
  const { data: post, isPending } = useGetPostById(postId ? postId : "");

  const handleDeletePost = () => {};

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="bg-dark-2">
        <DialogHeader>
          <DialogTitle>Post Details</DialogTitle>
        </DialogHeader>

        <div className="w-full">
          {isPending ? (
            <Loader />
          ) : (
            <div className="w-full">
              <div className="w-full bg-gray-900 rounded-xl flex justify-center items-center">
                <img
                  src={
                    post?.imageUrl || "/assets/icons/profile-placeholder.svg"
                  }
                  alt="post"
                  className="w-full max-h-[300px] rounded-xl object-contain"
                />
              </div>

              <div className="flex flex-col gap-5 lg:gap-7 flex-1 items-start py-8 rounded-[30px]">
                <div className="flex-between w-full">
                  <Link
                    to={`/profile/${post?.creator.$id}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={
                        post?.creator?.imageUrl ||
                        "/assets/icons/profile-placeholder.svg"
                      }
                      alt="creator"
                      className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                    />
                    <div className="flex flex-col">
                      <p className="base-medium lg:body-bold text-light-1">
                        {post?.creator.name}
                      </p>
                      <div className="flex-center gap-2 text-light-3">
                        <p className="subtle-semibold lg:small-regular">
                          {multiFormatDateString(post?.$createdAt)}
                        </p>

                        <p className="subtle-semibold lg:small-regular">
                          {post?.location}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="flex-center">
                    <Link
                      to={`/update-post/${post?.$id}`}
                      className={`${user.id !== post?.creator.$id && "hidden"}`}
                    >
                      <img
                        src="/assets/icons/edit.svg"
                        alt="edit"
                        width={24}
                        height={24}
                      />
                    </Link>

                    <Button
                      onClick={handleDeletePost}
                      variant="ghost"
                      className={`ghost_details-delete_btn ${
                        user.id !== post?.creator.$id && "hidden"
                      }`}
                    >
                      <img
                        src="/assets/icons/delete.svg"
                        alt="delete"
                        width={24}
                        height={24}
                      />
                    </Button>
                  </div>
                </div>

                <hr className="boder w-full border-dark-4/80" />

                <div className="flex flex-col flex-1 w-full small-mediumlg:base-regular">
                  <p>{post?.caption}</p>
                  <ul className="flex gap-1 mt-2">
                    {post?.tags.map((tag: string) => (
                      <li key={tag} className="text-light-3">
                        #{tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full">
                  <PostStats post={post} userId={user.id} />
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetails;
