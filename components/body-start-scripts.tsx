import Script from "next/script";

export function BodyStartScripts() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZW078GS4TH"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZW078GS4TH');
        `}
      </Script>
    </>
  );
}
