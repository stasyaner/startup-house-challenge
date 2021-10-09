if (process.env.NODE_ENV === "production") {
    if (!process.env.NEXT_PUBLIC_API_KEY) {
        let errorMessage = "NEXT_PUBLIC_API_KEY environment variable is";
        errorMessage += " not set or empty.";
        throw new Error(errorMessage);
    }

    if (!process.env.NEXT_PUBLIC_API_URL) {
        let errorMessage = "NEXT_PUBLIC_API_URL environment variable is";
        errorMessage += " not set or empty.";
        throw new Error(errorMessage);
    }
}

const IS_PROD = process.env.NODE_ENV === "production";
const API_KEY_DEV = "JFLBFI9TPLKUC1JU";
const API_KEY_PROD = process.env.NEXT_PUBLIC_API_KEY || "";
const API_KEY = IS_PROD ? API_KEY_PROD : API_KEY_DEV;
const BASE_URL_DEV = `https://www.alphavantage.co/query?apikey=${API_KEY}`;
const BASE_URL_PROD = process.env.NEXT_PUBLIC_API_URL || "";
const BASE_URL = IS_PROD ? BASE_URL_PROD : BASE_URL_DEV;

export type ApiEndpointConfig = {
    getSearchCompanyEndpoint: (searchString: string) => string;
};

export const apiEndpointConfig: ApiEndpointConfig = {
    getSearchCompanyEndpoint: (searchString) =>
        `${BASE_URL}&function=SYMBOL_SEARCH&keywords=${searchString}`,
};
