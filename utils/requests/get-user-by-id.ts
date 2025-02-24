import { Author } from "@/types/app";
import { currentOrigin } from "@/utils/contants";
import { notFound } from "next/navigation";

export const getUserById = async (id: string): Promise<Author | null> => {
  const response = await fetch(`${currentOrigin}/api/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
      tags: [`user-${id}`],
    },
  });

  if (response.status === 404) {
    return notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();

  return data.data;
};
