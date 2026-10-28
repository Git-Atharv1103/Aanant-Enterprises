import { useEffect, useRef, useState, type RefObject } from 'react';

export interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export interface ScrollRevealReturn<T extends HTMLElement> {
  ref: RefObject<T | null>;
  isVisible: boolean;
}

/**
 * Flexible scroll reveal hook supporting both patterns:
 * 1) useScrollReveal<HTMLDivElement>(options) -> returns { ref, isVisible }
 * 2) useScrollReveal(existingRef, options) -> attaches to existingRef and toggles .revealed class
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  targetRefOrOptions?: RefObject<HTMLElement | null> | UseScrollRevealOptions,
  maybeOptions?: UseScrollRevealOptions
): ScrollRevealReturn<T> {
  const isTargetRef = targetRefOrOptions && 'current' in targetRefOrOptions;
  const options = (isTargetRef ? maybeOptions : (targetRefOrOptions as UseScrollRevealOptions)) || {};
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true } = options;

  const internalRef = useRef<T | null>(null);
  const activeRef = (isTargetRef ? targetRefOrOptions : internalRef) as RefObject<HTMLElement | null>;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = activeRef.current;
    if (!el) return;

    if (prefersReduced) {
      setIsVisible(true);
      el.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((child) => {
        child.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add('revealed');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
            entry.target.classList.remove('revealed');
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe root element for isVisible flag
    observer.observe(el);

    // Also observe any nested .reveal children if present
    const targets = el.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, [activeRef, threshold, rootMargin, once]);

  return { ref: internalRef, isVisible };
}

/**
 * Lightweight hook for animating a single element.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);
}
