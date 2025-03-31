import { Typography } from "@/components/typography";
import Link from "next/link";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-primary text-white" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-row max-sm:flex-col justify-between py-6 gap-8 md:gap-0">
          <div className="flex flex-row gap-16">
            <nav aria-label="Main navigation">
              <Typography variant="p" text="Navigation" className="font-bold mb-4 md:hidden" />
              <ul role="list">
                <li className="mb-2">
                  <Link href="/" className="hover:text-gray-300 transition-colors">
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/trades" className="hover:text-gray-300 transition-colors">
                    Browse Trades
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/trades/create" className="hover:text-gray-300 transition-colors">
                    Create a Trade
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Legal links">
              <Typography variant="p" text="Legal" className="font-bold mb-4 md:hidden" />
              <ul role="list">
                <li className="mb-2">
                  <Link
                    href="/legal/terms-and-conditions"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/legal/privacy-policy"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/legal/cookie-policy"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <nav aria-label="Social media links" className="text-center md:text-right">
            <Typography variant="p" text="Follow Us" className="font-bold mb-4" />
            <ul role="list" className="flex gap-4 justify-center md:justify-end">
              <li>
                <a
                  href="https://www.facebook.com/pokeswap.trading"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors inline-flex items-center gap-2"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebookF size={20} />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/PokeSwapTrades"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors inline-flex items-center gap-2"
                  aria-label="Follow us on X (formerly Twitter)"
                >
                  <FaXTwitter size={20} />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 border-t border-white/20">
          <small>© 2025 Mikael Boutin. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};
