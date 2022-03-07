import { VStack, Box, Flex, Button } from "@chakra-ui/react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Marker, markerStateToText } from "../components/marker";
import { Question } from "../components/question";
import { invoke } from "@tauri-apps/api";
import { useQuestions, useQuestionsInfinite } from "../api";
import { Selector, SelectorState } from "../components/selector";
import { useContext, useEffect, useState } from "react";
import db from "../storage";
import { NavigationContext } from "../navcontext";

export const QuestionsPage: React.FunctionComponent = () => {
  const [source, setSource] = useState<SelectorState>("unanswered");
  const navigate = useNavigate();
  const params = useParams();
  const onChoose = (visitCode: string) => {
    navigate(`/questions/${visitCode}`);
  };
  const onOpenLiveWindow = () => {
    invoke("open_live_window");
  };
  const { pages, isLoading, isError, size, setSize } =
    useQuestionsInfinite(source);
  const navContext = useContext(NavigationContext);
  useEffect(() => {
    let prev = undefined;
    let next = undefined;

    if (params.id) {
      let allVc =
        pages?.flatMap((p) => p.data.map((q: any) => q.visitCode)) ?? [];
      let idx = allVc.findIndex((vc) => vc === params.id);
      if (idx !== -1) {
        if (idx - 1 >= 0) {
          prev = allVc[idx - 1];
        }
        if (idx + 1 < allVc.length) {
          next = allVc[idx + 1];
        }
      }
    }

    navContext.prev = prev;
    navContext.next = next;
  }, [params.id]);

  return (
    <Flex minH="100vh">
      <Box flex="3" maxH="100vh" overflowY="scroll">
        <VStack p={4} align="start">
          <Button onClick={onOpenLiveWindow}>打开直播助手</Button>
          <Selector onChange={setSource} />
          {isError}
          {!isLoading &&
            !isError &&
            pages?.map((p) =>
              p.data.map((q: any) => (
                <Question
                  text={q.title}
                  time={q.createdAt}
                  onClick={() => onChoose(q.visitCode)}
                  key={q.visitCode}
                  active={params?.id === q.visitCode}
                  mark={markerStateToText(
                    db?.data?.mark?.[q.visitCode ?? ""] ?? "unread"
                  )}
                />
              ))
            )}
          <Button
            onClick={() => setSize(size + 1)}
            isLoading={isLoading}
            disabled={pages?.[pages?.length - 1]?.nextPageUrl === null}
          >
            加载更多
          </Button>
        </VStack>
      </Box>
      <Box flex="5" p={4}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default QuestionsPage;
