/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserById } from "@/utils/requests/get-user-by-id";
import { ProfileHeaderInfo } from "@/components/profile-header-info";
import { notFound } from "next/navigation";
import { ProfileNavigationMenu } from "@/features/profile-navigation/profile-navigation-menu";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { user_id } = await params;
  const user = await getUserById(user_id);

  if (!user) {
    return notFound();
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-10 py-10 items-center">
        <ProfileHeaderInfo user={user} />
        <ProfileNavigationMenu userId={user_id} />
        <div className="flex flex-1 w-full flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}
