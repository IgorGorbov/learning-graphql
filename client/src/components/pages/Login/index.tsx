import React, { useCallback, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Card, Layout, Spin, Typography } from "antd";

import { AuthUrlProps, LoginArgs, LoginProps, Viewer } from "../../../types";
import GoogleLogo from "../../../assets/google_logo.jpg";
import { LOGIN } from "../../../lib/graphql/mutations/login";
import { AUTH_URL } from "../../../lib/graphql/queries/authurl";
import { ErrorBanner } from "../../ui/ErrorBanner";
import { displaySuccessNotification, displayErrorMessage } from "../../../lib/notifications";

interface LoginPageProps {
  setViewer: (viewer: Viewer) => void;
}

export const LoginPage = ({ setViewer }: LoginPageProps) => {
  const client = useApolloClient();

  const [logIn, { data: logInData, loading: logInLoading, error: logInError }] = useMutation<LoginProps, LoginArgs>(
    LOGIN,
    {
      onError: async (error) => await displayErrorMessage(error.message),
      onCompleted: (data) => {
        if (data && data.login) {
          setViewer(data.login);

          if (data.login.token) {
            sessionStorage.setItem("token", data.login.token);
          }

          displaySuccessNotification("You've successfully logged in!");
        }
      }
    }
  );

  const logInRef = useRef(logIn);

  const handleAuthorize = useCallback(async () => {
    try {
      const { data } = await client.query<AuthUrlProps>({
        query: AUTH_URL
      });
      window.location.href = data.authUrl;
    } catch {
      displayErrorMessage("Sorry! We weren't able to log you in. Please try again later!");
    }
  }, []);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      logInRef.current({
        variables: {
          input: { code: code }
        }
      });
    }
  }, []);

  if (logInLoading) {
    return (
      <Layout.Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Layout.Content>
    );
  }

  if (logInData && logInData.login) {
    const { id: viewerId } = logInData.login;
    return <Redirect to={`/user/${viewerId}`} />;
  }

  const logInErrorBannerElement = logInError ? (
    <ErrorBanner description="Sorry! We weren't able to log you in. Please try again later!" />
  ) : null;

  return (
    <Layout.Content className="log-in">
      {logInErrorBannerElement}
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Typography.Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              👋
            </span>
          </Typography.Title>
          <Typography.Title level={3} className="log-in-card__intro-title">
            Log in to TinyHouse!
          </Typography.Title>
          <Typography.Text>Sign in with Google to start booking available rentals!</Typography.Text>
        </div>
        <button className="log-in-card__google-button" onClick={handleAuthorize}>
          <img src={GoogleLogo} alt="Google Logo" className="log-in-card__google-button-logo" />
          <span className="log-in-card__google-button-text">Sign in with Google</span>
        </button>
        <Typography.Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form to sign in with your Google account.
        </Typography.Text>
      </Card>
    </Layout.Content>
  );
};
