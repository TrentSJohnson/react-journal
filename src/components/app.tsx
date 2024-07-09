import Header from "./header";
import ContestList from "./contest-list";
import { useState, useEffect } from "react";
import ContestPreview from "./contest-preview";
import Contest from "./contest";

const App = ({ initialData }) => {
  const [page, setPage] = useState<"contestList" | "contest">(
    initialData.currentContest ? "contest" : "contestList",
  );
  const [currentContest, setCurrentContest] = useState<
    object | undefined
  >(initialData.currentContest);
  console.log("rendering app")
  useEffect(() => {
    window.onpopstate = (event) => {
      const newPage = event.state?.contestId
        ? "contest"
        : "contestList";
      setPage(newPage);
      setCurrentContest({ id: event.state?.contestId });
    };
  }, []);

  const navigateToContest = (contestId) => {
    setPage("contest");
    setCurrentContest({ id: contestId });
    window.history.pushState(
      { contestId },
      "",
      `/contest/${contestId}`,
    );
    console.log(`contest id ${contestId}`);
  };

  const navigateToContestList = () => {
    setPage("contestList");
    setCurrentContest(undefined);
    window.history.pushState(
      {},
      "",
      `/`,
    );
  };


  const pageContent = () => {
    console.log(`content ${page}`)
    switch (page) {
      case "contestList":
        return (
          <>
            <Header message="Naming Contests" />
            <ContestList
              initialContests={initialData.contests}
              onContestClick={navigateToContest}
            />
          </>
        );
      case "contest":
        return <Contest initialContest={currentContest} onContestListLink={navigateToContestList}/>;
    }
  };

  return <div className="container">{pageContent()}</div>;
};

export default App;
