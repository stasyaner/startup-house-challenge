import { apiEndpointConfig } from "../config/api";
import {
    Company,
    CompanyDetails,
    CompanyDetailsResponseBase,
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

    // We've checked it's not falsy above.
    const resultFormatted = (
        result.bestMatches as SearchCompanyResponseBase[]
    ).map<Company>((item) => ({
        symbol: item["1. symbol"],
        name: item["2. name"],
    }));

    return resultFormatted;
}

export async function companyDetailsService(
    symbol: string
): Promise<CompanyDetails | null> {
    const url = apiEndpointConfig.getCompanyDetailsEndpoint(symbol);
    const result = await fetchApi<CompanyDetailsResponseBase>(url);

    if (!result) {
        console.error(UNEXPECTED_ERROR);
        return null;
    }

    if (
        !result.Name ||
        !result.Address ||
        !result.MarketCapitalization ||
        !result.Description
    ) {
        console.error(INSUFFICIENT_RETURN_ERROR);
        return null;
    }

    const resultFormatted: CompanyDetails = {
        name: result.Name,
        address: result.Address,
        capitalization: parseInt(result.MarketCapitalization, 10),
        description: result.Description,
    };

    return resultFormatted;
}
