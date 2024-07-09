import axios from "axios"

import { API_SERVER_URL } from "./public-config"

export const fetchContestList = async () => {
    const resp = await axios.get(`${API_SERVER_URL}/contests`)
    console.log(`fetch init list ${JSON.stringify((resp.data))}`)
    return resp.data.contests;
};

export const fetchContest = async (contestId) => {
    const resp = await axios.get(`${API_SERVER_URL}/contest/${contestId}`)
    console.log(`fetch init ${JSON.stringify((resp.data))}`)
    return resp.data.contest;
};


export const addNewNameToContest = async ({contestId, newNameValue}) => {
    console.log("axcios send");
    console.log(contestId);
    console.log(newNameValue);
    const resp = await axios.post(
        `${API_SERVER_URL}/contest/${contestId}`,
        {newNameValue}
    );
    console.log(`axios resp ${resp.data.updatedContest}`);

    return resp.data.updatedContest;
};