import { grey } from "@ant-design/colors";
import { Typography } from "antd";

const Header = () => (
    <header>
        <style jsx>{`
            header {
                margin: 0;
                margin-bottom: 40px;
                padding: 16px;
                border-bottom: 2px solid ${grey[0]};
            }
        `}</style>

        <Typography.Title level={4}>Stock Portfolio</Typography.Title>
    </header>
);

export { Header };
