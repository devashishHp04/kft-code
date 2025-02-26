"use client";

import { Component, ReactNode } from "react";

import ErrorDesign from "./errorDesign";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Error Boundary caught an error:", error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorDesign />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
