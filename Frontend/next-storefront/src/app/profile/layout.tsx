"use client";
import ProfileLayout from "../../old-pages/Profile/ProfileLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
