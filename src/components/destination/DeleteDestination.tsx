"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Destination } from "../../../types";

const DeleteDestination = ({ destination }: { destination: Destination }) => {
  const { _id } = destination;
  const handleDelete = async (_id: string) => {
    const res = await fetch(`http://localhost:8000/destination/${_id}`, {
      method: "DELETE",
    });
    res.json();
    redirect("/destinations");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 border border-red-300 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-50"
          >
            <Trash2 className="size-4" aria-hidden />
            Cancel
          </button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Travel Package</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {destination.destinationName}? This
            action cannot be undone and will permanently remove this travel
            package from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(_id)}
            className="bg-[#EF4444]"
          >
            Delete Package
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestination;
