interface Route {
  fragment: string;
  component: any;
}

type Component = (param?: {}) => void;

interface Router {
  routes: Route[];
  addRoute: (fragment: string, component: Component) => this;
  start: () => void;
  navigate: (fragment: string, replace?: boolean) => void;
}

class Router implements Router {
  routes: Route[];

  constructor() {
    this.routes = [];
  }

  addRoute = (fragment: string, component: Component) => {
    this.routes.push({ fragment, component });
    return this;
  };

  navigate = (fragment: string, replace = false) => {
    if (replace) {
      const href = window.location.href.replace(window.location.hash, fragment);
      window.location.replace(href);
    } else window.location.hash = fragment;
  };

  start = () => {
    const checkRoutes = () => {
      const currentRoute = this.routes.find(
        (route) => route.fragment === window.location.hash
      );
      if (currentRoute) currentRoute.component();
    };

    window.addEventListener('hashchange', checkRoutes);
    checkRoutes();
  };
}

export default Router;
