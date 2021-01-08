import { google } from "googleapis";
import { AddressComponent, AddressType, createClient } from "@google/maps";

const maps = createClient({
  key: `${process.env.G_GEOCODE_KEY}`,
  Promise: Promise
});

const auth = new google.auth.OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  process.env.PUBLIC_URL + "/login"
);

function parseAddress(addressComponents: Array<AddressComponent<AddressType>>) {
  let country = "";
  let admin = "";
  let city = "";

  for (const component of addressComponents) {
    if (component.types.includes("country")) {
      country = component.long_name;
    }

    if (component.types.includes("administrative_area_level_1")) {
      admin = component.long_name;
    }

    if (component.types.includes("locality")) {
      city = component.long_name;
    }
  }

  return {
    country: "",
    admin: "",
    city: ""
  };
}

export const Google = {
  authUrl: auth.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]
  }),
  login: async (code: string) => {
    const { tokens } = await auth.getToken(code);

    auth.setCredentials(tokens);

    const { data } = await google.people({ version: "v1", auth: auth }).people.get({
      resourceName: "people/me",
      personFields: "emailAddresses,names,photos"
    });

    return { user: data };
  },
  geocode: async (address: string) => {
    const result = await maps.geocode({ address: address }).asPromise();

    if (result.status < 200 || result.status > 299) {
      throw new Error("Failed to geocode address");
    }

    return parseAddress(result.json.results[0].address_components as Array<AddressComponent<AddressType>>);
  }
};
