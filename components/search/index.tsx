import { useState } from "react";
import { Company } from "../../service/types";
import { SearchForm } from "./searchForm";
import { SearchResult } from "./searchResult";
import { unstable_batchedUpdates as batchedUpdates } from "react-dom";
import { Grid, Space } from "antd";

const Search = () => {
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
        batchedUpdates(() => {
            setCompanyList(searchResult);
            setIsSearching(false);
        });
    };

    return (
        <Space
            direction="vertical"
            size="large"
            style={{ width: !breakpoints.lg ? "100%" : "auto" }}
        >
            <SearchForm
                onStart={onSearchStart}
                onFail={onSearchFail}
                onSuccess={onSearchSuccess}
            />
            <SearchResult isLoading={isSearching} items={companyList} />
        </Space>
    );
};

Search.Form = SearchForm;
Search.Result = SearchResult;

export { Search };
