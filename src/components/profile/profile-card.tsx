"use client";
import { useState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/actions/profile-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ProfileCardProps = {
  name: string;
  email: string;
};

export default function ProfileCard({ name: initialName, email: initialEmail }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName || "");
  const [email, setEmail] = useState(initialEmail || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCancel = () => {
    setName(initialName || "");
    setEmail(initialEmail || "");
    setIsEditing(false);
  };

  const handleSave = () => {
    startTransition(async () => {
      setIsSubmitting(true);
      try {
        const profileFormData = new FormData();
        profileFormData.append("name", name);
        profileFormData.append("email", email);

        const response = await updateProfile(profileFormData);

        if (response.success) {
          toast.success(response.message || "Profile updated successfully.");
          setIsEditing(false);
          // Refresh server props so other server components reflect change
          router.refresh();
        } else {
          toast.error(response.message || "Failed to update profile.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred.");
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <label className="block text-lg font-medium ">Name:</label>
        {isEditing ? (
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          <div className="font-medium">{name}</div>
        )}
      </div>

            <div className="flex gap-2 items-center">
        <label className="block text-lg font-medium ">Email:</label>
        {isEditing ? (
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        ) : (
          <div className="font-medium">{email}</div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        {isEditing ? (
          <div className="flex flex-col w-full gap-5">
            <Button onClick={handleSave} disabled={isSubmitting} className="w-full cursor-pointer">
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            <Button variant="ghost" onClick={handleCancel} disabled={isSubmitting} className="w-full cursor-pointer">
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="w-full cursor-pointer">Edit</Button>
        )}
      </div>
    </div>
  );
}
