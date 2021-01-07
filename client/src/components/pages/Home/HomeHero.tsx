import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Input, Row, Typography } from "antd";

import TorontoImage from "../../assets/toronto.jpg";
import DubaiImage from "../../assets/dubai.jpg";
import LosAngelesImage from "../../assets/los-angeles.jpg";
import LondonImage from "../../assets/london.jpg";

const { Title } = Typography;
const { Search } = Input;

interface HomeHeroProps {
  readonly onSearch: (value: string) => void;
}

export const HomeHero = ({ onSearch }: HomeHeroProps) => {
  return (
    <div className="home-hero">
      <div className="home-hero__search">
        <Title className="home-hero__title">Find a place you'll love to stay at</Title>
        <Search
          placeholder="Search 'San Fransisco'"
          size="large"
          enterButton
          className="home-hero__search-input"
          onSearch={onSearch}
        />
      </div>
      <Row gutter={12} className="home-hero__cards">
        <Col xs={12} md={6}>
          <Link to="/listings/toronto">
            <Card cover={<img alt="Toronto" src={TorontoImage} />}>Toronto</Card>
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <Link to="/listings/dubai">
            <Card cover={<img alt="Dubai" src={DubaiImage} />}>Dubai</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to="/listings/los%20angeles">
            <Card cover={<img alt="Los Angeles" src={LosAngelesImage} />}>Los Angeles</Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to="/listings/london">
            <Card cover={<img alt="London" src={LondonImage} />}>London</Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
