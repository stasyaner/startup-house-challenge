import { Row, Col, Grid, Divider } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Portfolio } from "../components/portfolio";
import { Search } from "../components/search";
import { Company } from "../service/types";

const DashBoardPage: NextPage = () => {
    const breakpoints = Grid.useBreakpoint();
    const [portfolioList, setPortfolioList] = useState<Company[]>([]);

    const onAddToPortfolio = (company: Company) => {
        setPortfolioList((currList) => {
            const isCompanyPresent = currList.find(
                (item) => item.symbol === company.symbol
            );
            if (isCompanyPresent) return currList;

            return [...currList, company];
        });
    };

    const onRemoveFromPortfolio = (itemIndex: number) => {
        const newPortfolioList = [...portfolioList];
        newPortfolioList.splice(itemIndex, 1);
        setPortfolioList((currList) => {
            const newList = [...currList];
            newList.splice(itemIndex, 1);

            return newList;
        });
    };

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Row style={{ padding: "0 16px" }}>
                <Col
                    xs={24}
                    md={11}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Search
                        onAddToPortfolio={onAddToPortfolio}
                        portfolioList={portfolioList}
                    />
                </Col>
                <Col xs={24} md={2} style={{ textAlign: "center" }}>
                    <Divider
                        type={breakpoints.xs ? "horizontal" : "vertical"}
                        style={{ width: "100%", height: "100%" }}
                    />
                </Col>
                <Col xs={24} md={11}>
                    <Portfolio
                        list={portfolioList}
                        onRemove={onRemoveFromPortfolio}
                    />
                </Col>
            </Row>
        </>
    );
};

export default DashBoardPage;
