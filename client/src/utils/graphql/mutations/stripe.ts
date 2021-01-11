import { gql } from "apollo-boost";

export const CONNECT_STRIPE = gql`
  mutation ConnectStripe($input: ConnectStripeInput) {
    connectStripe(input: $input) {
      hasWallet
    }
  }
`;

export const DISCONNECT_STRIPE = gql`
  mutation DisconnectStripe {
    login {
      hasWallet
    }
  }
`;
