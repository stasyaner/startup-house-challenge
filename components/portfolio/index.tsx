import { Typography, Table, Button } from "antd";
import { Company } from "../../service/types";
import Link from "next/link";

type PortfolioProps = {
    list: Company[];
    onRemove: (itemIndex: number) => void;
};

const Portfolio = ({ list, onRemove }: PortfolioProps) => (
    <>
        <Typography.Title level={5}>Your portfolio</Typography.Title>
        <Table pagination={false} dataSource={list} rowKey="symbol">
            <Table.Column<Company>
                title="Company Name"
                dataIndex="name"
                render={(text, record) => (
                    <Link href={`/company/${record.symbol}`}>
                        <a>{text}</a>
                    </Link>
                )}
            />
            <Table.Column title="Symbol" dataIndex="symbol" responsive={["lg"]}/>
            <Table.Column<Company>
                title="Actions"
                key="actions"
                render={(_, __, recordIndex) => (
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            onRemove(recordIndex);
                        }}
                    >
                        Remove
                    </Button>
                )}
            />
        </Table>
    </>
);

export { Portfolio };
