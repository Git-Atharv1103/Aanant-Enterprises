/**
 * Customer Reviews / Testimonials for Aanant Enterprises.
 *
 * HOW TO ADD REVIEWS:
 * 1. Only add reviews from verified, real customers.
 * 2. Set `isPlaceholder: false` for reviews you want displayed publicly.
 * 3. Optionally include a `reviewUrl` linking to the original review source.
 * 4. Never fabricate names, ratings, or review text.
 *
 * Entries with `isPlaceholder: true` are NEVER rendered publicly.
 */

export interface CustomerReview {
  id: string;
  /** Customer's first name or display name as they provided */
  name: string;
  /** Verified review text exactly as provided by the customer */
  reviewText: string;
  /** Optional: star rating 1–5 (only if verifiable from source) */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Optional: date of review (ISO string or readable format) */
  date?: string;
  /** Optional: platform / source (e.g. "Google", "Instagram", "WhatsApp") */
  source?: string;
  /** Optional: link to the original review */
  reviewUrl?: string;
  /** Set true for placeholder entries that should NOT render publicly */
  isPlaceholder: boolean;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  // ─── Add verified customer reviews below ─────────────────────────────────
  // Example (replace with a real review and set isPlaceholder: false):
  // {
  //   id: 'review-1',
  //   name: 'Customer Name',
  //   reviewText: 'Exact customer review text here.',
  //   rating: 5,
  //   date: '2024-11-01',
  //   source: 'Google',
  //   reviewUrl: 'https://g.co/...',
  //   isPlaceholder: false,
  // },
  // ─────────────────────────────────────────────────────────────────────────
];

