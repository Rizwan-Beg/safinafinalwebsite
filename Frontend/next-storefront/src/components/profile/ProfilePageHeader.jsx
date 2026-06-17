"use client";

export default function ProfilePageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="mb-8 pb-6 border-b border-black/5">
      {eyebrow && <p className="profile-eyebrow">{eyebrow}</p>}
      <h1 className="profile-title">{title}</h1>
      {subtitle && <p className="profile-subtitle mb-0">{subtitle}</p>}
    </header>
  );
}
