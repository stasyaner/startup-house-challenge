import { Button, List, Spin, Tooltip, Typography, Grid } from "antd";
import { Company } from "../../service/types";
import { PlusCircleOutlined } from "@ant-design/icons";

type SearchResultProps = {
    isLoading: boolean;
    items: Company[];
    onAddToPortfolio: (itemIndex: number) => void;
};

export const SearchResult = ({
    isLoading,
    items,
    onAddToPortfolio,
}: SearchResultProps) => {
    const breakpoints = Grid.useBreakpoint();

    if (!items.length) {
        return null;
    }

    return (
        <>
            <Typography.Title level={5}>Search Results</Typography.Title>
            {/* Using Spin here because List.isLoading is adding some top margin. */}
            <Spin spinning={isLoading}>
                <List bordered size="small">
                    {items.map((item, itemIndex) => {
                        const text = `${item.symbol} - ${item.name}`;

                        return (
                            <List.Item key={item.symbol}>
                                <Typography.Text
                                    style={{
                                        width: breakpoints.xs ? 220 : 270,
                                    }}
                                    ellipsis={{ tooltip: text }}
                                >
                                    {text}
                                </Typography.Text>
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                        onAddToPortfolio(itemIndex);
                                    }}
                                >
                                    <Tooltip
                                        mouseEnterDelay={0.5}
                                        title={"Add to portfolio"}
                                    >
                                        <PlusCircleOutlined />
                                    </Tooltip>
                                </Button>
                            </List.Item>
                        );
                    })}
                </List>
            </Spin>
        </>
    );
};
