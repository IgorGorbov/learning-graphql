import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Col, Layout, Row } from "antd";

import { PAGE_LIMIT } from "../../../constants/app";
import { USER } from "../../../utils/graphql/queries/user";
import { UserData, UserVariables, Viewer } from "../../../types";
import { UserBookings } from "./UserBookings";
import { UserListings } from "./UserListings";
import { UserProfile } from "./UserProfile";
import { ErrorBanner } from "../../ui/ErrorBanner";
import { PageSkeleton } from "../../ui/PageSkeleton";

interface UserPageProps {
  readonly viewer: Viewer;
  readonly setViewer: (viewer: Viewer) => void;
}

interface MatchParams {
  id: string;
}

const { Content } = Layout;

export const UserPage = ({ viewer, setViewer, match }: UserPageProps & RouteComponentProps<MatchParams>) => {
  const [listingsPage, setListingsPage] = useState(1);
  const [bookingsPage, setBookingsPage] = useState(1);

  const { data, loading, error, refetch } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id,
      bookingsPage: bookingsPage,
      listingsPage: listingsPage,
      limit: PAGE_LIMIT
    }
  });

  const handleUserRefetch = async () => {
    await refetch();
  };

  const stripeError = new URL(window.location.href).searchParams.get("stripe_error");
  const stripeErrorBanner = stripeError ? (
    <ErrorBanner description="We had an issue connecting with Stripe. Please try again soon." />
  ) : null;

  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const user = data ? data.user : null;
  const viewerIsUser = viewer.id === match.params.id;

  const userListings = user ? user.listings : null;
  const userBookings = user ? user.bookings : null;

  const userProfileElement = user ? (
    <UserProfile
      user={user}
      viewer={viewer}
      viewerIsUser={viewerIsUser}
      setViewer={setViewer}
      handleUserRefetch={handleUserRefetch}
    />
  ) : null;

  const userListingsElement = userListings ? (
    <UserListings
      userListings={userListings}
      listingsPage={listingsPage}
      limit={PAGE_LIMIT}
      setListingsPage={setListingsPage}
    />
  ) : null;

  const userBookingsElement =
    userListings && userBookings ? (
      <UserBookings
        userBookings={userBookings}
        bookingsPage={bookingsPage}
        limit={PAGE_LIMIT}
        setBookingsPage={setBookingsPage}
      />
    ) : null;

  return (
    <Content className="user">
      {stripeErrorBanner}
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24}>
          {userListingsElement}
          {userBookingsElement}
        </Col>
      </Row>
    </Content>
  );
};
