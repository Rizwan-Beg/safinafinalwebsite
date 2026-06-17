"use client";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfileLayout from "../../old-pages/Profile/ProfileLayout";
import Wishlist from "../../old-pages/Wishlist/Wishlist";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#7A0C13]" />
      </div>
    );
  }

  if (user) {
    return (
      <ProfileLayout>
        <Wishlist />
      </ProfileLayout>
    );
  }

  return <Wishlist />;
}
