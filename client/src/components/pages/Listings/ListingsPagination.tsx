import React from "react";
import { Pagination } from "antd";

interface ListingsPaginationProps {
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly setPage: (page: number) => void;
}

export const ListingsPagination = ({ total, page, limit, setPage }: ListingsPaginationProps) => {
  return (
    <Pagination
      current={page}
      total={total}
      defaultPageSize={limit}
      hideOnSinglePage
      showLessItems
      onChange={(page: number) => setPage(page)}
      className="listings-pagination"
    />
  );
};
