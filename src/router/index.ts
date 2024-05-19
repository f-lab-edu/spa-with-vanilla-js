interface Route {
  fragmentRegExp: RegExp;
  params: string[];
  component: any;
}

type Component = (param?: {}) => void;

interface Router {
  routes: Route[];
  addRoute: (fragment: string, component: Component) => this;
  navigate: (fragment: string, replace?: boolean) => void;
  start: () => void;
}

const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_REGEXP = '([^\\/]+)';

class Router implements Router {
  routes: Route[];

  constructor() {
    this.routes = [];
  }

  addRoute = (fragment: string, component: Component) => {
    const params: string[] = [];
    const parsedFragment = fragment
      .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
        params.push(paramName);
        return URL_REGEXP;
      })
      .replace(/\//g, '\\/');

    this.routes.push({
      fragmentRegExp: new RegExp(`^${parsedFragment}$`),
      component,
      params,
    });
    return this;
  };

  navigate = (fragment: string, replace = false) => {
    if (replace) {
      const href = window.location.href.replace(window.location.pathname, fragment);
      window.location.replace(href);
    } else window.location.pathname = fragment;
  };

  private getUrlParams = (route, hash) => {
    const params = {};
    const matches = hash.match(route.fragmentRegExp);

    matches.shift(); // url 전체 제거
    matches.forEach((paramValue, index) => {
      const paramName = route.params[index];
      params[paramName] = paramValue;
    });
    return params;
  };

  start = () => {
    const checkRoutes = () => {
      const currentRoute = this.routes.find((route) =>
        route.fragmentRegExp.test(window.location.pathname)
      );
      if (!currentRoute) return;
      if (currentRoute.params.length) {
        const urlParams = this.getUrlParams(currentRoute, window.location.pathname);
        currentRoute.component(urlParams);
        return;
      }
      currentRoute.component();
    };
    window.addEventListener('hashchange', checkRoutes);
    checkRoutes();
  };
}

export default Router;
