import { VStack, Box, Flex, Button } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { Marker } from "../components/marker";
import { Question } from "../components/question";
import { invoke } from "@tauri-apps/api";

export const QuestionsPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const onChoose = () => {
    navigate("/questions/1");
  };
  const onOpenLiveWindow = () => {
    invoke("open_live_window");
  };

  return (
    <Flex minH="100vh">
      <VStack flex="1" padding={4} align="start">
        <Button onClick={onOpenLiveWindow}>打开直播助手</Button>
        <Marker />
        <Question
          text="Officia enim et cillum aute exercitation nisi. Fugiat eiusmod culpa magna esse consequat eu tempor minim velit occaecat laboris. Culpa et sint sunt reprehenderit occaecat enim irure est qui dolore sit eiusmod cupidatat minim. Excepteur esse incididunt Lorem ea exercitation commodo elit veniam. Ad cillum ex commodo laborum minim est. Cupidatat occaecat mollit deserunt ullamco. Do officia esse nisi ullamco dolor incididunt."
          time="2022-01-08 03:33:19"
          onClick={onChoose}
        />
        <Question
          text="Officia enim et cillum aute exercitation nisi. Fugiat eiusmod culpa magna esse consequat eu tempor minim velit occaecat laboris. Culpa et sint sunt reprehenderit occaecat enim irure est qui dolore sit eiusmod cupidatat minim. Excepteur esse incididunt Lorem ea exercitation commodo elit veniam. Ad cillum ex commodo laborum minim est. Cupidatat occaecat mollit deserunt ullamco. Do officia esse nisi ullamco dolor incididunt."
          time="2022-01-08 03:33:19"
          onClick={onChoose}
        />
      </VStack>
      <Box flex="2" padding={4}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default QuestionsPage;
