import { useUserContext } from "@/context/AuthContext";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <div className="flex flex-1">
      <div className="profile-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">Profile</h2>
        <div className="profile-inner_container">
          <div className="flex w-full justify-between gap-5 items-center">
            <div className="flex flex-col">
              <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="user"
                width={100}
                height={100}
                className="rounded-full"
                // className="rounded-full w-12 lg:h-12"
              />
              <p className="base-medium lg:body-bold text-light-1 mt-1">
                {user.name}
              </p>
            </div>
            <div>
              <Link to={`/update-profile/${user.id}`}>
                <FaCog className="h-10 w-10" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
