import { CTAButton } from "@/components/cta-button";
import { Typography } from "@/components/typography";

export const AnonymousAndFree = () => {
  return (
    <section
      className="container mx-auto px-4 py-4 md:py-8"
      aria-labelledby="anonymous-and-free-title"
    >
      <div className="text-center max-w-3xl mx-auto">
        <Typography
          variant="h2"
          text="Anonymous & Always Free"
          className="mb-6"
          id="anonymous-and-free-title"
        />

        <Typography
          variant="p"
          text="Trade your digital items with a simple registration process. Your personal information stays private - only your username and friend id is shown publicly. We believe in keeping things simple, secure, and completely free for our community."
          className="text-gray-600 mb-8"
        />

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
          role="list"
          aria-label="Features"
        >
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100" role="listitem">
            <Typography
              variant="h3"
              text="Anonymous Trading"
              className="mb-3"
              id="anonymous-trading-title"
            />
            <Typography
              variant="p"
              text="Quick account creation with no personal information displayed. Your privacy is our priority."
              className="text-gray-600"
              aria-labelledby="anonymous-trading-title"
            />
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100" role="listitem">
            <Typography variant="h3" text="Zero Fees" className="mb-3" id="zero-fees-title" />
            <Typography
              variant="p"
              text="No platform fees, no hidden charges. Keep 100% of your trading value."
              className="text-gray-600"
              aria-labelledby="zero-fees-title"
            />
          </div>
        </div>

        <CTAButton href="/trades" text="Create your account" />
      </div>
    </section>
  );
};
