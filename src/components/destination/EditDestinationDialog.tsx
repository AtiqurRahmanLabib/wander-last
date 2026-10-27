"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarPlus, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { Destination } from "../../../types";

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "Historical",
  "Luxury",
  "Family",
];

type FormState = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const inputClasses =
  "h-10 w-full rounded-sm border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-cyan-500";

const EditDestinationDialog = ({
  destination,
}: {
  destination: Destination;
}) => {
  const router = useRouter();
  const [form, setForm] = useState<Destination>(destination);

  const update =
    (field: keyof FormState) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((previous) => ({ ...previous, [field]: event.target.value }));
    };
  return (
    <div>
      <Dialog>
        <form>
          <div className="flex gap-1 justify-center items-center border w-25 h-10">
            <Pencil className="size-4" aria-hidden />
            <DialogTrigger render={<button className="">Edit</button>} />
          </div>
          <DialogContent className="sm:max-w-sm lg:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="mt-5">Update Travel Package</DialogTitle>
              <DialogDescription>
                Make changes to the travel package details below
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const { _id, ...updatedData } = form;
                console.log("button clicked");
                const res = await fetch(
                  `http://localhost:8000/destination/${destination._id}`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                  },
                );
                const data = await res.json();
                console.log("response from server:", data);
                setForm(destination);
              }}
            >
              <div className=" grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="destination-name"
                    className="mt-10 mb-2 block text-[13px] font-medium text-zinc-900"
                  >
                    Destination Name
                  </label>
                  <input
                    id="destination-name"
                    type="text"
                    value={form.destinationName}
                    onChange={update("destinationName")}
                    placeholder="Bali Paradise"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="destination-country"
                    className="mb-2 block text-[13px] font-medium text-zinc-900"
                  >
                    Country
                  </label>
                  <input
                    id="destination-country"
                    type="text"
                    value={form.country}
                    onChange={update("country")}
                    placeholder="Indonesia"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="destination-category"
                    className="mb-2 block text-[13px] font-medium text-zinc-900"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="destination-category"
                      value={form.category}
                      onChange={update("category")}
                      className={`${inputClasses} appearance-none pr-9 ${
                        form.category === "" ? "text-zinc-400" : "text-zinc-900"
                      }`}
                    >
                      <option value="" disabled>
                        Beach
                      </option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-400"
                      aria-hidden
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="destination-price"
                    className="mb-2 block text-[13px] font-medium text-zinc-900"
                  >
                    Price (USD)
                  </label>
                  <input
                    id="destination-price"
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={update("price")}
                    placeholder="e.g., 1299"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="destination-duration"
                    className="mb-2 block text-[13px] font-medium text-zinc-900"
                  >
                    Duration
                  </label>
                  <input
                    id="destination-duration"
                    type="text"
                    value={form.duration}
                    onChange={update("duration")}
                    placeholder="e.g., 7 Days/6 Nights"
                    className={inputClasses}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="destination-departure-date"
                    className="mb-2 block text-[13px] font-medium text-zinc-900"
                  >
                    Departure Date
                  </label>
                  <input
                    id="destination-departure-date"
                    type="date"
                    value={form.departureDate}
                    onChange={update("departureDate")}
                    className={inputClasses}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="destination-image-url"
                    className="mb-2 block text-[13px] font-medium text-zinc-900"
                  >
                    Image URL
                  </label>
                  <input
                    id="destination-image-url"
                    type="url"
                    value={form.imageUrl}
                    onChange={update("imageUrl")}
                    placeholder="https://example.com/image.jpg"
                    className={inputClasses}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="destination-description"
                    className="mb-2 block text-[13px] font-medium text-zinc-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="destination-description"
                    value={form.description}
                    onChange={update("description")}
                    placeholder="Describe the travel experience..."
                    className={`${inputClasses} min-h-27.5 py-2.5`}
                    rows={4}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 rounded-sm border border-rose-300 bg-white px-6 py-2.5 text-sm font-medium text-rose-500 transition-colors hover:bg-rose-50"
                >
                  <Trash2 className="size-4" aria-hidden />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-sm bg-cyan-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-600"
                >
                  <CalendarPlus className="size-4" aria-hidden />
                  Save Changes
                </button>
              </div>
            </form>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default EditDestinationDialog;
