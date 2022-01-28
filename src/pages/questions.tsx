import { LockIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Grid,
  GridItem,
  VStack,
  Box,
  Flex,
  Square,
  Text,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { Question } from "../components/question";

export const QuestionsPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const onChoose = () => {
    navigate("/questions/1");
  };

  return (
    <Flex minH="100vh">
      <VStack flex="1" padding={4}>
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
