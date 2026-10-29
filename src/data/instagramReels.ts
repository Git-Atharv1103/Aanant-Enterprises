/**
 * Instagram Reels configuration for Aanant Enterprises.
 *
 * HOW TO ADD REELS:
 * 1. Copy the Reel URL from Instagram (e.g. https://www.instagram.com/reel/ABC123/)
 * 2. Add a new entry to the array below with `isPlaceholder: false`
 * 3. Optionally add a `title` and `description` for display purposes
 * 4. Save the file — the section will render the Reels automatically
 *
 * IMPORTANT: Do NOT set isPlaceholder: false for entries without a real URL.
 * Placeholder entries are filtered out before rendering.
 */

export interface InstagramReel {
  id: string;
  /** Full Instagram Reel URL, e.g. https://www.instagram.com/reel/XXXXX/ */
  url: string;
  /** Optional: path to a local thumbnail image in /public */
  thumbnailPath?: string;
  /** Optional: short display title */
  title?: string;
  /** Optional: short description */
  description?: string;
  /** Set true for placeholder / example entries that should NOT render */
  isPlaceholder: boolean;
}

export const INSTAGRAM_REELS: InstagramReel[] = [
  // ─── Add your real Reel URLs below ───────────────────────────────────────
  // Example (replace with your actual reel URL and set isPlaceholder: false):
  // {
  //   id: 'reel-1',
  //   url: 'https://www.instagram.com/reel/YOUR_REEL_ID/',
  //   title: 'Custom Laser Engraving',
  //   description: 'Watch our fiber laser in action.',
  //   isPlaceholder: false,
  // },
  // ─────────────────────────────────────────────────────────────────────────
];

