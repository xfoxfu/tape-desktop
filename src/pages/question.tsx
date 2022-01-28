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
  HStack,
  Box,
  Flex,
  Square,
  Text,
  VStack,
  Textarea,
  Select,
  ButtonGroup,
  Spacer,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Question } from "../components/question";

export const QuestionPage: React.FunctionComponent = ({ children }) => {
  const navigate = useNavigate();
  const onChoose = () => {
    navigate("/questions/1");
  };

  return (
    <VStack align="start" spacing={4}>
      <Question
        text="Officia enim et cillum aute exercitation nisi. Fugiat eiusmod culpa magna esse consequat eu tempor minim velit occaecat laboris. Culpa et sint sunt reprehenderit occaecat enim irure est qui dolore sit eiusmod cupidatat minim. Excepteur esse incididunt Lorem ea exercitation commodo elit veniam. Ad cillum ex commodo laborum minim est. Cupidatat occaecat mollit deserunt ullamco. Do officia esse nisi ullamco dolor incididunt."
        time="2022-01-08 03:33:19"
        onClick={onChoose}
        size="xl"
      />
      <VStack rounded="2xl" bg="white" w="full" align="start" padding={4}>
        <HStack spacing={4}>
          <Heading size="sm">标记</Heading>
          <ButtonGroup isAttached size="sm">
            <Button>未读</Button>
            <Button colorScheme="blue">想读</Button>
            <Button>读过</Button>
            <Button>抛弃</Button>
          </ButtonGroup>
        </HStack>
        <Textarea placeholder="回答"></Textarea>
        <HStack w="full">
          <Select placeholder="快速回应" w="full">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Button colorScheme="teal">回答</Button>
        </HStack>
      </VStack>
      <HStack spacing={8} bg="white" padding={4} borderRadius="2xl" w="full">
        <ButtonGroup isAttached>
          <Button>上一条</Button>
          <Button>下一条</Button>
        </ButtonGroup>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="auto-mark-readed" mb="0">
            自动标记已读
          </FormLabel>
          <Switch id="auto-mark-readed" />
        </FormControl>
      </HStack>
    </VStack>
  );
};

export default QuestionPage;
