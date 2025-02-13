import { FC, PropsWithChildren } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const SignInFormCard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card>
      <CardHeader className="text-center items-center">
        <Link href="https://tcgpocket.pokemon.com/en-us/" target="_blank">
          <Image
            src="/logos/tcgpocketlogo_en-2x.webp"
            alt="Pokemon TCG Pocket Logo"
            width={100}
            height={100}
          />
        </Link>
        <CardTitle className="text-xl">Unofficial Pokemon TCG Pocket PokeSwap.io</CardTitle>
        <CardDescription>Make friends and trade beautiful cards</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
