import React, { Fragment } from "react";
import { Skeleton } from "antd";

export const PageSkeleton = () => {
  return (
    <Fragment>
      <Skeleton active paragraph={{ rows: 4 }} className="page-skeleton__paragraph" />
      <Skeleton active paragraph={{ rows: 4 }} className="page-skeleton__paragraph" />
      <Skeleton active paragraph={{ rows: 4 }} className="page-skeleton__paragraph" />
    </Fragment>
  );
};
