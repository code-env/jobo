"use client";

import React, { useState } from "react";
import * as z from "zod";
import { createHack } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Loading } from "../shared/loading";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Textarea } from "../ui/textarea";
import { revalidatePath } from "next/cache";
import FileUpload from "../shared/file-upload";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";

const CreateShow = ({ setIsOpen }: { setIsOpen: (thing: boolean) => void }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof createHack>>({
    resolver: zodResolver(createHack),
  });
  const [images, setImages] = useState<string[]>([]);

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof createHack>) {
    try {
      if (images.length === 0) return toast.error("Preview require");

      const dataTobeSent = { ...values, images };
      const { data } = await axios.post("/api/user/showcase", dataTobeSent);

      if (data) {
        setIsOpen(false);
        revalidatePath("/scroll");
      }

      console.log(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const onChange = (image: string) => {
    setImages([...images, image]);
  };

  // console.log(images);

  return (
    <ScrollArea className="max-h-[500px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4 px-3"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Title...."
                    {...field}
                    disabled={isSubmitting}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Description..."
                    {...field}
                    disabled={isSubmitting}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FileUpload
            endPoint="imageUploader"
            value={images}
            onChange={onChange}
          />
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Github url...(optional)"
                    {...field}
                    disabled={isSubmitting}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deployedUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Deployed url..(optional)"
                    {...field}
                    disabled={isSubmitting}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loading />
                <span className="ml-3"> Creating...</span>
              </>
            ) : (
              "Create new article"
            )}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default CreateShow;
