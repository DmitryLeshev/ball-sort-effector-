export type NavigationRoute = {
  id: number;
  url: ({ params, search }: { params?: string; search?: string }) => string;
  title: string;
};

export const SITE_NAVIGATION: NavigationRoute[] = [];
