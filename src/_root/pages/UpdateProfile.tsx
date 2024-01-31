import UserForm from "@/components/forms/UserForm";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const UpdateProfile = () => {
  const { data: user, isFetching } = useGetCurrentUser();
  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex flex-col w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">
            Update Profile
          </h2>
          {isFetching ? <Loader /> : <UserForm user={user} />}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
