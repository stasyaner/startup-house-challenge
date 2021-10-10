import { useState, useEffect } from "react";
import { Company } from "../service/types";

type UseCompanyList = {
    companyList: Company[];
    setCompanyList: (companyList: Company[]) => void;
    removeFromCompanyList: (itemIndex: number) => void;
};

export const useCompanyList = (removedItem?: Company): UseCompanyList => {
    const [list, setList] = useState<Company[]>([]);

    useEffect(() => {
        if (!removedItem) return;
        setList((currList) => [...currList, removedItem]);
    }, [removedItem]);

    return {
        companyList: list,
        setCompanyList: (newList) => {
            setList(newList);
        },
        removeFromCompanyList: (itemIndex) => {
            setList((currList) => {
                const item = currList[itemIndex];
                const newList = [...currList];
                newList.splice(itemIndex, 1);

                return newList;
            });
        },
    };
};
