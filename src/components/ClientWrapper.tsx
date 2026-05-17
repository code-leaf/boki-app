'use client';

import React from 'react';

type ClientWrapperProps = {
  children: React.ReactNode;
};

export const ClientWrapper = ({ children }: ClientWrapperProps) => {
  return <>{children}</>;
};
