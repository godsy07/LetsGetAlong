import { FaCog } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetUserDetails } from "@/lib/react-query/queriesAndMutations";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: userData } = useGetUserDetails(id ? id : "");

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
      </div>
    </div>
  );
};

export default Profile;
