"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CreateShow from "../forms/create-heack";

const CreateNewHack = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <CreateShow setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewHack;
