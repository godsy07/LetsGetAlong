import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Models } from "appwrite";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { UserValidation } from "@/lib/validation";
import { useToast } from "../ui/use-toast";
import { useUpdateUser } from "@/lib/react-query/queriesAndMutations";
import Loader from "../shared/Loader";

type UserFormProps = {
  user?: Models.Document;
};

const UserForm = ({ user }: UserFormProps) => {
  const { toast } = useToast();
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: user ? user?.name : "",
      bio: user ? user?.bio : "",
      file: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const updatedUser = await updateUser({
      ...values,
      userId: user ? user?.$id : "",
      imageId: user?.imageId,
      imageUrl: user?.imageUrl,
    });
    if (!updatedUser) {
      return toast({ title: "Please try again" });
    }

    toast({ title: "Your details have been updated." });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photo</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={user?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate && <Loader />}Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
