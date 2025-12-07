export type Publication = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string;
  title: string;
  /**
   * Publication period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing publications.
   */
  period: {
    /** Start date (e.g., "09.2024"). */
    start: string;
    /** End date; leave undefined for "Present". */
    end?: string;
  };
  /** Public URL (paper, DOI, or publisher page). */
  link: string;
  /** Tags/technologies for chips or filtering. */
  skills: string[];
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string;
  /** Logo image URL (absolute or path under /public). */
  logo?: string;
  /** Whether the publication card is expanded by default in the UI. */
  isExpanded?: boolean;
};





