import CatalogNew from "../../components/Shop/CatalogNew";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogNew />
    </Suspense>
  );
}
