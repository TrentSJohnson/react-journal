import ReactDOMServer from "react-dom/server"

import { fetchContest, fetchContestList } from "../api-client"
import App from "../components/app";

const serverRender = async (req) => {
    const { contestId } = req.params;
    const initialData = contestId
    ? {currentContest: await fetchContest(contestId)} 
    : {contests: await fetchContestList()};
    console.log("server rendering")
    console.log(`init data = ${JSON.stringify(initialData)}, id ${contestId}`)
    const initialMarkup = ReactDOMServer.renderToString(
        <App initialData={initialData}/>
    );
    return { initialMarkup, initialData };
}

export default serverRender;