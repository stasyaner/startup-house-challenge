import { Typography, Spin, Button } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CompanyDetails } from "../../service/types";
import { useRouter } from "next/dist/client/router";
import { companyDetailsService } from "../../service";

const CompanyDetailsPage: NextPage = () => {
    const router = useRouter();
    const [isError, setIsError] = useState(false);
    const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(
        null
    );

    useEffect(() => {
        void (async (): Promise<void> => {
            const symbol = router.query.symbol;
            if (Array.isArray(symbol)) {
                console.error("Symbol url param can't be of array type.");
                return;
            }
            if (!symbol) {
                console.error("Symbol url param can't be empty.");
                return;
            }

            const newCompanyDetails = await companyDetailsService(symbol);
            if (!newCompanyDetails) {
                setIsError(true);
                return;
            }
            setCompanyDetails(newCompanyDetails);
        })();
    }, [router]);

    let content = <Spin tip="Loading">&nbsp;</Spin>;
    if (isError) {
        content = (
            <Typography.Text type="warning">
                An error occured or company doesn&apos;t exist.
            </Typography.Text>
        );
    } else if (companyDetails) {
        const capitalizationFormatted = new Intl.NumberFormat("en-US", {
            notation: "compact",
            compactDisplay: "long",
            maximumFractionDigits: 2,
        }).format(companyDetails.capitalization);

        content = (
            <>
                <Typography.Title level={3}>
                    {companyDetails.name}
                </Typography.Title>
                <Typography.Paragraph>
                    <Typography.Text strong>Address: </Typography.Text>
                    <Typography.Text>{companyDetails.address}</Typography.Text>
                    <br />
                    <Typography.Text strong>
                        Market Capitalization:{" "}
                    </Typography.Text>
                    <Typography.Text>{capitalizationFormatted}</Typography.Text>
                </Typography.Paragraph>
                <Typography.Paragraph>
                    {companyDetails?.description}
                </Typography.Paragraph>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Company Details</title>
            </Head>
            <div>
                <style jsx>{`
                    div {
                        padding: 0 16px;
                    }
                `}</style>
                <Link href="/">
                    <a className="ant-btn" style={{ marginBottom: 24 }}>
                        Go Back
                    </a>
                </Link>
                <br />
                {content}
            </div>
        </>
    );
};

export default CompanyDetailsPage;
