"use client";

import Link from "next/link";
import { useConnectedUserStore } from "@/stores/connected-user-store";

type CTAButtonProps = {
  href: string;
  text: string;
  noRedirect?: boolean;
};

export const CTAButton = ({ href, text, noRedirect = false }: CTAButtonProps) => {
  const user = useConnectedUserStore((state) => state.user);

  const linkHref = user || !noRedirect ? href : "/auth";

  return (
    <Link
      href={linkHref}
      aria-label={text}
      role="button"
      className="inline-flex items-center px-6 py-3 bg-[#D01010] hover:bg-[#B00D0D] text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D01010]"
    >
      {text}
    </Link>
  );
};
