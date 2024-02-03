import PasswordChangeForm from "@/components/forms/PasswordChangeForm";

const UpdatePassword = () => {
  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex flex-col w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">
            Update Password
          </h2>
          <div className="w-full mt-5">
            <PasswordChangeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
