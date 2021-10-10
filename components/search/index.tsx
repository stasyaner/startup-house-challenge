import { useState } from "react";
import { Company } from "../../service/types";
import { SearchForm } from "./searchForm";
import { SearchResult } from "./searchResult";
import { unstable_batchedUpdates as batchedUpdates } from "react-dom";
import { Grid, Space } from "antd";

type SearchProps = {
    portfolioList: Company[];
    onAddToPortfolio: (company: Company) => void;
};

const Search = ({ portfolioList, onAddToPortfolio }: SearchProps) => {
    const breakpoints = Grid.useBreakpoint();
    const [isSearching, setIsSearching] = useState(false);
    const [companyList, setCompanyList] = useState<Company[]>([]);

    const onSearchStart = () => {
        setIsSearching(true);
    };

    const onSearchFail = () => {
        setIsSearching(false);
    };

    const onSearchSuccess = (searchResult: Company[]) => {
        const searchResultFiltered = searchResult.filter((searchItem) => {
            const portfolioItemIndex = portfolioList.findIndex(
                (portfolioItem) => portfolioItem.symbol === searchItem.symbol
            );
            const isItemOnPortfolio = portfolioItemIndex >= 0;

            return !isItemOnPortfolio;
        });
        batchedUpdates(() => {
            setCompanyList(searchResultFiltered);
            setIsSearching(false);
        });
    };

    const onAddToPortfolioInternal = (itemIndex: number) => {
        const newList = [...companyList];
        const [addedCompany] = newList.splice(itemIndex, 1);
        setCompanyList(newList);
        onAddToPortfolio(addedCompany);
    };

    return (
        <Space
            direction="vertical"
            size="large"
            style={{ width: !breakpoints.lg ? "100%" : 340 }}
        >
            <SearchForm
                onStart={onSearchStart}
                onFail={onSearchFail}
                onSuccess={onSearchSuccess}
            />
            <SearchResult
                isLoading={isSearching}
                items={companyList}
                onAddToPortfolio={onAddToPortfolioInternal}
            />
        </Space>
    );
};

Search.Form = SearchForm;
Search.Result = SearchResult;

export { Search };
