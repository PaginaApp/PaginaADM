class IPaginatedRequest<T> {
  page: number;
  limit: number;
  filter?: Partial<T>;

  constructor(page: number, limit: number, filter?: Partial<T>) {
    this.page = page;
    this.limit = limit;
    if (filter) {
      this.filter = filter;
    }
  }
}

export { IPaginatedRequest };
