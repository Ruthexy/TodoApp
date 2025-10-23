import React, { ReactNode } from "react";

interface FunctionalErrorBoundaryProps {
  children: ReactNode;
}

interface FunctionalErrorBoundaryState {
  hasError: boolean;
}

export class FunctionalErrorBoundary extends React.Component<
  FunctionalErrorBoundaryProps,
  FunctionalErrorBoundaryState
> {
  constructor(props: FunctionalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): FunctionalErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Caught error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }

    return this.props.children;
  }
}
