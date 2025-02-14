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
      className="inline-flex items-center px-6 py-3 bg-[#F01616] hover:bg-[#d91414] text-white font-semibold rounded-lg transition-colors"
    >
      {text}
    </Link>
  );
};
