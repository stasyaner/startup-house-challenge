export type SearchCompanyResponseBase = {
    "1. symbol": string;
    "2. name": string;
    "3. type": string;
    "4. region": string;
    "5. marketOpen": string;
    "6. marketClose": string;
    "7. timezone": string;
    "8. currency": string;
    "9. matchScore": string;
};
export type SearchCompanyResponse = {
    bestMatches?: Array<Partial<SearchCompanyResponseBase>>
};
export type Company = {
    symbol: SearchCompanyResponseBase["1. symbol"];
    name: SearchCompanyResponseBase["2. name"];
};
