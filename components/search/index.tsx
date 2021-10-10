import { useEffect, useState } from "react";
import { Company } from "../../service/types";
import { SearchForm } from "./searchForm";
import { SearchResult } from "./searchResult";
import { unstable_batchedUpdates as batchedUpdates } from "react-dom";
import { Grid, Space } from "antd";
import { useCompanyList } from "../../hooks";

type SearchProps = {
    removedItem?: Company;
    onAdd: (company: Company) => void;
};

const Search = ({ removedItem, onAdd }: SearchProps) => {
    const breakpoints = Grid.useBreakpoint();
    const [isSearching, setIsSearching] = useState(false);
    // prettier-ignore
    const {
        companyList,
        setCompanyList,
        removeFromCompanyList
    } = useCompanyList(removedItem);

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

    const onAddInternal = (itemIndex: number) => {
        const company = companyList[itemIndex];
        removeFromCompanyList(itemIndex);
        onAdd(company);
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
            <SearchResult
                isLoading={isSearching}
                items={companyList}
                onAdd={onAddInternal}
            />
        </Space>
    );
};

Search.Form = SearchForm;
Search.Result = SearchResult;

export { Search };
