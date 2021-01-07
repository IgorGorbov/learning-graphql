import React from "react";
import { List, Typography } from "antd";

import { Listing } from "../../../types";
import { ListingCard } from "../../ui/ListingCard";

interface HomeListingsProps {
  readonly title: string;
  readonly listings: Listing[];
}

const { Title } = Typography;

export const HomeListings = ({ title, listings }: HomeListingsProps) => {
  return (
    <div className="home-listings">
      <Title level={4} className="home-listings__title">
        {title}
      </Title>
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4
        }}
        dataSource={listings}
        renderItem={(listing) => (
          <List.Item>
            <ListingCard listing={listing} />
          </List.Item>
        )}
      />
    </div>
  );
};
