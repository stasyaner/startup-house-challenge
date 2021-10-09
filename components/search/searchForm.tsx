import { Input, Typography } from "antd";
import { useState } from "react";
import { searchCompanyService } from "../../service";
import { Company } from "../../service/types";

type SearchFormProps = {
    onStart: () => void;
    onFail: () => void;
    onSuccess: (searchResult: Company[]) => void;
};

export const SearchForm = ({ onStart, onFail, onSuccess }: SearchFormProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onSearch = async (searchString: string): Promise<void> => {
        if (!searchString) {
            onSuccess([]);
            return;
        };

        setIsLoading(true);
        onStart();
        const searchResult = await searchCompanyService(searchString);
        if (!searchResult) {
            onFail();
            setIsLoading(false);
            return;
        }

        onSuccess(searchResult);
        setIsLoading(false);
    }

    return (
        <>
            {/* <label>Company name</label> */}
            <Typography.Title level={5}>Company name</Typography.Title>
            <Input.Search
                placeholder="Example: Apple"
                allowClear
                enterButton
                onSearch={onSearch}
                loading={isLoading}
            />
        </>
    );
};
