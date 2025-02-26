"use client";
import React from "react";
import ErrorBoundary from "@/components/errorBoundary";
import { ChildrenProps } from "@/types";
import { Toaster } from "sonner";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

const RootProvider = ({ children }: ChildrenProps) => {
  return (
    <ApolloProvider client={client}>
      <ErrorBoundary>
        {children}
        <Toaster position="top-right" richColors />
      </ErrorBoundary>
    </ApolloProvider>
  );
};

export default RootProvider;
