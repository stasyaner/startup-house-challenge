import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { Header } from "../components/header";

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <Header />
        <Component {...pageProps} />
    </>
);

export default App;
