import React, { Suspense } from "react";
import { Router } from "react-router-dom";
import { router } from "shared/lib";
import { Atom } from "shared/ui";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <Router history={router.history}>
      <Suspense fallback={<Atom.CircularProgress />}>{component()}</Suspense>
    </Router>
  );
