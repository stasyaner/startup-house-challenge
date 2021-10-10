import { Button, List, Spin, Tooltip, Typography, Row, Col } from "antd";
import { Company } from "../../service/types";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useRef } from "react";

type SearchResultProps = {
    isLoading: boolean;
    items: Company[];
    onAdd: (itemIndex: number) => void;
};

export const SearchResult = ({
    isLoading,
    items,
    onAdd,
}: SearchResultProps) => {
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
                                    style={{ minWidth: 100 }}
                                    ellipsis={{ tooltip: text }}
                                >
                                    {text}
                                </Typography.Text>
                                <Button
                                    type="link"
                                    size="small"
                                    style={{ marginLeft: 20 }}
                                    onClick={() => {
                                        onAdd(itemIndex);
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
