//https://github.com/juliencrn/usehooks-ts/blob/master/lib/src/useIntersectionObserver/useIntersectionObserver.ts

import { useEffect, useState } from 'react';

interface Arguments extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  element: Element | undefined,
  { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }: Arguments
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !element) {
      return;
    }

    const observerParameters = {
      threshold,
      root,
      rootMargin,
    };
    const observer = new IntersectionObserver(updateEntry, observerParameters);

    observer.observe(element);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, JSON.stringify(threshold), root, rootMargin, frozen]);

  return entry;
}

export { useIntersectionObserver };
