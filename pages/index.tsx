import { Row, Col, Grid, Divider, Space, Layout, Typography } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/header";
import { Portfolio } from "../components/portfolio";
import { Search } from "../components/search";

const DashBoard: NextPage = () => {
    const breakpoints = Grid.useBreakpoint();

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Header />
            <Layout.Content>
                <Row style={{ padding: "0 16px" }}>
                    <Col xs={24} md={11}>
                        <Search />
                    </Col>
                    <Col xs={24} md={2} style={{ textAlign: "center" }}>
                        <Divider
                            type={breakpoints.xs ? "horizontal" : "vertical"}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Col>
                    <Col xs={24} md={11}>
                        <Portfolio />
                    </Col>
                </Row>
            </Layout.Content>
        </>
    );
};

export default DashBoard;
