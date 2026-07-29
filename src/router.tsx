import {
  AnchorHTMLAttributes,
  Children,
  MouseEvent,
  ReactElement,
  ReactNode,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface RouterContextValue {
  basename: string;
  pathname: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);
const ParamsContext = createContext<Record<string, string>>({});

const normalisePath = (path: string) => {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, '') : withLeadingSlash;
};

const stripBasename = (pathname: string, basename: string) => {
  if (!basename) return normalisePath(pathname);
  if (pathname === basename) return '/';
  return pathname.startsWith(`${basename}/`)
    ? normalisePath(pathname.slice(basename.length))
    : normalisePath(pathname);
};

export const Router = ({ basename = '', children }: { basename?: string; children: ReactNode }) => {
  const normalisedBasename = basename ? normalisePath(basename) : '';
  const [pathname, setPathname] = useState(() =>
    stripBasename(window.location.pathname, normalisedBasename)
  );

  useEffect(() => {
    const handlePopState = () => {
      setPathname(stripBasename(window.location.pathname, normalisedBasename));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [normalisedBasename]);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const nextPath = normalisePath(to);
    const href = `${normalisedBasename}${nextPath}` || '/';
    window.history[options?.replace ? 'replaceState' : 'pushState']({}, '', href);
    setPathname(nextPath);
  }, [normalisedBasename]);

  const value = useMemo(
    () => ({ basename: normalisedBasename, pathname, navigate }),
    [normalisedBasename, pathname, navigate]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('Router APIs must be used inside <Router>.');
  return context;
};

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
}

export const Link = ({ to, onClick, target, ...props }: LinkProps) => {
  const { basename, navigate } = useRouter();
  const path = normalisePath(to);
  const href = `${basename}${path}` || '/';

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (target && target !== '_self')
    ) {
      return;
    }

    event.preventDefault();
    navigate(path);
  };

  return <a {...props} href={href} target={target} onClick={handleClick} />;
};

export const useLocation = () => {
  const { pathname } = useRouter();
  return { pathname };
};

export const useNavigate = () => useRouter().navigate;

export const useParams = <T extends Record<string, string | undefined>>() =>
  useContext(ParamsContext) as T;

interface RouteProps {
  path: string;
  element: ReactElement;
}

export const Route = (_props: RouteProps) => null;

const matchRoute = (pattern: string, pathname: string) => {
  const patternParts = normalisePath(pattern).split('/').filter(Boolean);
  const pathParts = normalisePath(pathname).split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (let index = 0; index < patternParts.length; index += 1) {
    const patternPart = patternParts[index];
    const pathPart = pathParts[index];
    if (patternPart.startsWith(':')) {
      try {
        params[patternPart.slice(1)] = decodeURIComponent(pathPart);
      } catch {
        return null;
      }
    } else if (patternPart !== pathPart) {
      return null;
    }
  }

  return params;
};

export const Routes = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();

  for (const child of Children.toArray(children)) {
    if (!isValidElement<RouteProps>(child)) continue;
    const params = matchRoute(child.props.path, pathname);
    if (params) {
      return (
        <ParamsContext.Provider value={params}>
          {child.props.element}
        </ParamsContext.Provider>
      );
    }
  }

  return null;
};
