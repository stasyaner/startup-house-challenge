import { apiEndpointConfig } from "../config/api";
import {
    Company,
    SearchCompanyResponse,
    SearchCompanyResponseBase,
} from "./types";
import { fetchApi } from "./utils";

const INSUFFICIENT_RETURN_ERROR = "Insufficient API call return.";
const UNEXPECTED_ERROR = "Unexpected error occured during API call.";

export async function searchCompanyService(
    seachString: string
): Promise<Company[] | null> {
    const url = apiEndpointConfig.getSearchCompanyEndpoint(seachString);
    const result = await fetchApi<SearchCompanyResponse>(url);

    if (!result) {
        console.error(UNEXPECTED_ERROR);
        return null;
    }

    if (
        !result.bestMatches ||
        !Array.isArray(result.bestMatches) ||
        result.bestMatches.some(
            (item) => !item["1. symbol"] || !item["2. name"]
        )
    ) {
        console.error(INSUFFICIENT_RETURN_ERROR);
        return null;
    }

    const resultFormatted = (
        // We've checked it's not falsy above.
        result.bestMatches as SearchCompanyResponseBase[]
    ).map<Company>((item) => ({
        symbol: item["1. symbol"],
        name: item["2. name"],
    }));

    return resultFormatted;
}
