import {
  Button,
  HStack,
  VStack,
  Textarea,
  Select,
  ButtonGroup,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuestion } from "../api";
import { Marker } from "../components/marker";
import { Question } from "../components/question";

export const QuestionPage: React.FunctionComponent = ({ children }) => {
  const params = useParams();
  const { question, isLoading, isError } = useQuestion(params.id ?? "");

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isError) {
    return <p>{isError.message}</p>;
  }
  return (
    <VStack align="start" spacing={4}>
      <Question text={question.title} time={question.createdAt} size="xl" />
      <VStack rounded="2xl" bg="white" w="full" align="start" p={4}>
        <Marker hint="标记" />
        <Textarea placeholder="回答">{question.answer?.txtContent}</Textarea>
        <HStack w="full">
          {/* <Select placeholder="快速回应" w="full">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select> */}
          <Button colorScheme="teal">回答</Button>
        </HStack>
      </VStack>
      <HStack spacing={8} bg="white" p={4} borderRadius="2xl" w="full">
        <ButtonGroup isAttached variant="ghost">
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
