export enum ListingsFilter {
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW",
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH"
}

export interface Viewer {
  readonly id?: string;
  readonly token?: string;
  readonly avatar?: string;
  readonly hasWallet: boolean;
  readonly didRequest: boolean;
}

export interface PaginationProps<T> {
  readonly total: number;
  readonly result: T[] | null;
}

export interface User {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
  readonly contact: string;
  readonly hasWallet: boolean;
  readonly income: number | null;
  readonly bookings: PaginationProps<Booking>;
  readonly listings: PaginationProps<Listing>;
}

export interface Booking {
  readonly id: string;
  readonly listing: Listing;
  readonly tenant: User;
  readonly checkIn: string;
  readonly checkOut: string;
}

export interface Listing {
  readonly id: string;
  readonly type: string;
  readonly title: string;
  readonly image: string;
  readonly address: string;
  readonly city: string;
  readonly price: number;
  readonly numOfGuests: number;
  readonly numOfBeds: number;
  readonly numOfBaths: number;
  readonly rating: number;
  readonly description: string;
  readonly host: User;
  readonly bookings: PaginationProps<Booking>;
}

export interface Listings {
  readonly listings: Listing[];
}

export interface DeleteListingById {
  readonly id: string;
}

export interface DeleteListing {
  readonly deleteListing: DeleteListingById;
}

export interface DeleteListingVariables {
  readonly id: string;
}

export interface LoginArgs {
  readonly input: { code: string } | null;
}

export interface LoginDataProps {
  readonly id?: string;
  readonly token?: string;
  readonly avatar?: string;
  readonly hasWallet: boolean;
  readonly didRequest: boolean;
}

export interface LoginProps {
  readonly login: LoginDataProps;
}

export interface AuthUrlProps {
  readonly authUrl: string;
}

export interface LogoutDataProps {
  readonly id?: string;
  readonly token?: string;
  readonly avatar?: string;
  readonly hasWallet: boolean;
  readonly didRequest: boolean;
}

export interface LogoutProps {
  readonly logout: LogoutDataProps;
}

export interface UserData {
  readonly user: User;
}

export interface UserVariables {
  readonly id: string;
  readonly bookingsPage: number;
  readonly listingsPage: number;
  readonly limit: number;
}

export interface DisconnectStripeData {
  readonly disconnectStripe: {
    readonly hasWallet: boolean;
  };
}

export interface ListingData {
  readonly listing: Listing;
}

export interface ListingVariables {
  readonly id: string;
  readonly bookingsPage: number;
  readonly limit: number;
}

export interface ListingsData {
  readonly listings: PaginationProps<Listing>;
}

export interface ListingsVariables {
  readonly location?: string | null;
  readonly filter: ListingsFilter;
  readonly limit: number;
  readonly page: number;
}
