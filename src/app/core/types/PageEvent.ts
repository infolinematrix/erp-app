export interface PageEvent {
    first: number; // Index of the first record to display
    rows: number;  // Number of rows to display
    page?: number; // Current page number (0-indexed, optional from event)
    pageCount?: number; // Total number of pages (optional from event)
  }