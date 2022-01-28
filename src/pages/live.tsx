import { Center } from "@chakra-ui/react";
import { Question } from "../components/question";

export const LivePage: React.FunctionComponent = ({ children }) => {
  return (
    <Center h="100vh" w="100vw" padding={8}>
      <Question
        text="Officia enim et cillum aute exercitation nisi. Fugiat eiusmod culpa magna esse consequat eu tempor minim velit occaecat laboris. Culpa et sint sunt reprehenderit occaecat enim irure est qui dolore sit eiusmod cupidatat minim. Excepteur esse incididunt Lorem ea exercitation commodo elit veniam. Ad cillum ex commodo laborum minim est. Cupidatat occaecat mollit deserunt ullamco. Do officia esse nisi ullamco dolor incididunt."
        time="2022-01-08 03:33:19"
        size="xl"
      />
    </Center>
  );
};

export default LivePage;
