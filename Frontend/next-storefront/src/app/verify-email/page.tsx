import React, { Suspense } from 'react';
import PageComponent from "../../old-pages/Login/VerifyEmail";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageComponent />
    </Suspense>
  );
}
