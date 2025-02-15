import { Typography } from "@/components/typography";

export default function DataDeletion() {
  return (
    <div className="container mx-auto px-4 my-10">
      <div className="flex flex-col gap-4">
        <Typography variant="h1" text="Data Deletion" />
        <Typography
          variant="p"
          text="To delete your account and associated data, please log in to your account, navigate to your profile under the Account tab, and click the 'Delete Account' button located at the bottom of the page."
        />
      </div>
    </div>
  );
}
