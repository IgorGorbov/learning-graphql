import React from "react";
import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { Listing } from "../../types";
import { formatListingPrice } from "../../utils/format";

interface ListingCardProps {
  readonly listing: Listing;
}

const { Text, Title } = Typography;

export const ListingCard = ({ listing }: ListingCardProps) => {
  const { id, title, image, address, price, numOfGuests } = listing;

  return (
    <Link to={`/listing/${id}`}>
      <Card hoverable cover={<div style={{ backgroundImage: `url(${image})` }} className="listing-card__cover-img" />}>
        <div className="listing-card__details">
          <div className="listing-card__description">
            <Title level={4} className="listing-card__price">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>
            <Text strong ellipsis className="listing-card__title">
              {title}
            </Text>
            <Text ellipsis className="listing-card__address">
              {address}
            </Text>
          </div>
          <div className="listing-card__dimensions listing-card__dimensions--guests">
            <UserOutlined />
            <Text>{numOfGuests} guests</Text>
          </div>
        </div>
      </Card>
    </Link>
  );
};
