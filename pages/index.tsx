import { Row, Col, Grid, Divider, Space, Layout, Typography } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Header } from "../components/header";
import { Portfolio } from "../components/portfolio";
import { Search } from "../components/search";
import { Company } from "../service/types";
import { unstable_batchedUpdates as batchedUpdates } from "react-dom";

const DashBoardPage: NextPage = () => {
    const breakpoints = Grid.useBreakpoint();
    const [portfolioList, setPortfolioList] = useState<Company[]>([]);
    const [removedPortfolioItem, setRemovedPortfolioItem] = useState<Company>();

    const onAddToPortfolio = (company: Company) => {
        setPortfolioList((currList) => [...currList, company]);
    };

    const onRemoveFromPortfolio = (itemIndex: number) => {
        const newPortfolioList = [...portfolioList];
        const [newRemovedPortfolioItem] = newPortfolioList.splice(itemIndex, 1);

        batchedUpdates(() => {
            setPortfolioList(newPortfolioList);
            setRemovedPortfolioItem(newRemovedPortfolioItem);
        });
    };

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Row style={{ padding: "0 16px" }}>
                <Col xs={24} md={11}>
                    <Search
                        onAdd={onAddToPortfolio}
                        removedItem={removedPortfolioItem}
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
