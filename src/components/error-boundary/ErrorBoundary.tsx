import * as React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

type Props = {
  code?: string;
};

const ErrorFallback = () => {
  return <div role="alert">Error</div>;
};

export const ErrorBoundary = ({ children }: React.PropsWithChildren<Props>) => {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>;
};
