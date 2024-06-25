"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";

export function Providers({ children }) {
  return (
    <ChakraProvider>
      {children}
      <Analytics />
    </ChakraProvider>
  );
}
