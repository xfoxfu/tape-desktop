import { VStack, Box, Flex, Button } from "@chakra-ui/react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Marker } from "../components/marker";
import { Question } from "../components/question";
import { invoke } from "@tauri-apps/api";
import { useQuestions } from "../api";

export const QuestionsPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const onChoose = (visitCode: string) => {
    navigate(`/questions/${visitCode}`);
  };
  const onOpenLiveWindow = () => {
    invoke("open_live_window");
  };
  const { questions, isLoading, isError } = useQuestions("answered");

  return (
    <Flex minH="100vh">
      <Box flex="3" maxH="100vh" overflowY="scroll">
        <VStack p={4} align="start">
          <Button onClick={onOpenLiveWindow}>打开直播助手</Button>
          <Marker />
          {isError}
          {!isLoading &&
            !isError &&
            questions.data.map((q: any) => (
              <Question
                text={q.title}
                time={q.createdAt}
                onClick={() => onChoose(q.visitCode)}
                key={q.visitCode}
                active={params?.id === q.visitCode}
              />
            ))}
        </VStack>
      </Box>
      <Box flex="5" p={4}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default QuestionsPage;
