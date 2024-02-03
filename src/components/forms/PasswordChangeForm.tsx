import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { PasswordValidation } from "@/lib/validation";
import { useToast } from "../ui/use-toast";
import Loader from "../shared/Loader";
import { useChangePassword } from "@/lib/react-query/queriesAndMutations";

const PasswordChangeForm = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutateAsync: updatePassword, isPending: isLoadingUpdate } =
    useChangePassword();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PasswordValidation>>({
    resolver: zodResolver(PasswordValidation),
    defaultValues: {
      password: "",
      repeat_password: "",
      current_password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PasswordValidation>) {
    const updatedPassword = await updatePassword({
      ...values,
      userId: id ? id : "",
    });
    if (!updatedPassword) {
      return toast({ title: "Please try again" });
    }

    toast({ title: "Your password has been updated." });
    navigate(`/profile/${id}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">New Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeat_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Repeat Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Current Password
              </FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
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

export default PasswordChangeForm;
