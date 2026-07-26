"use client";

import Script from "next/script";

interface TawkToChatProps {
  propertyId?: string;
  widgetId?: string;
}

/**
 * Tawk.to Live Chat Component
 * Integrates Tawk.to live chat widget seamlessly into Next.js App Router.
 * Configure NEXT_PUBLIC_TAWKTO_PROPERTY_ID & NEXT_PUBLIC_TAWKTO_WIDGET_ID in your .env file.
 */
export default function TawkToChat({
  propertyId = process.env.NEXT_PUBLIC_TAWKTO_PROPERTY_ID,
  widgetId = process.env.NEXT_PUBLIC_TAWKTO_WIDGET_ID || "default",
}: TawkToChatProps) {
  const tawkPropertyId = propertyId || "";
  const tawkWidgetId = widgetId || "default";

  if (!tawkPropertyId) {
    return null;
  }

  return (
    <Script
      id="tawk-to-script"
      strategy="afterInteractive"
      src={`https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`}
      charSet="UTF-8"
      crossOrigin="anonymous"
    />
  );
}
