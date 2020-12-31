export interface Listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface Listings {
  listings: Listing[];
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
