"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createProjectSchema } from "@/validations";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import CreateShow from "../forms/create-heack";

const CreateNewHack = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: z.infer<typeof createProjectSchema>) {
    // console.log("something is going on");
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="zbtn" className="w-fit">
          Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>What have you worked on today?</DialogTitle>
          <DialogDescription>
            YOu&apos;re about to showcase to the world what you&apos;ve done
            today!
          </DialogDescription>
        </DialogHeader>
        <CreateShow />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewHack;
