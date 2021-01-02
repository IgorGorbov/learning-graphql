export interface Viewer {
  readonly id?: string;
  readonly token?: string;
  readonly avatar?: string;
  readonly hasWallet: boolean;
  readonly didRequest: boolean;
}

export interface Listing {
  readonly id: string;
  readonly title: string;
  readonly image: string;
  readonly address: string;
  readonly price: number;
  readonly numOfGuests: number;
  readonly numOfBeds: number;
  readonly numOfBaths: number;
  readonly rating: number;
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
  readonly logOut: LogoutDataProps;
}
