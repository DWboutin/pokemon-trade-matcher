import { getUserById } from "@/utils/requests/get-user-by-id";
import { ProfileHeaderInfo } from "@/components/profile-header-info";
import { notFound } from "next/navigation";

type ProfileLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ user_id: string }>;
};

export default async function ProfileLayout(props: ProfileLayoutProps) {
  const { user_id } = await props.params;
  const user = await getUserById(user_id);

  if (!user) {
    return notFound();
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-10 py-10 items-center">
        <ProfileHeaderInfo user={user} />

        <div className="flex flex-1 w-full flex-col gap-4">{props.children}</div>
      </div>
    </div>
  );
}
