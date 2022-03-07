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
  Text,
  Heading,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuestion } from "../api";
import { Marker, MarkerState } from "../components/marker";
import { Question } from "../components/question";
import { NavigationContext } from "../navcontext";
import db from "../storage";

export const QuestionPage: React.FunctionComponent = ({}) => {
  const params = useParams();
  const nav = useNavigate();
  const { question, isLoading, isError } = useQuestion(params.id ?? "");
  const [mark, setMark] = useState<MarkerState>(
    db.data?.mark?.[params.id ?? ""] ?? "unread"
  );
  const onMark = (mark: MarkerState) => {
    setMark(mark);
    if (params.id && db.data) {
      db.data.mark[params.id ?? ""] = mark;
    }
  };
  useEffect(() => {
    setMark(db.data?.mark?.[params.id ?? ""] ?? "unread");
  }, [params.id]);
  const navCtx = useContext(NavigationContext);
  const onPrev = () => {
    nav(`/questions/${navCtx.prev}`);
  };
  const onNext = () => {
    nav(`/questions/${navCtx.next}`);
  };
  const onReadAndPrev = () => {
    if (mark !== "dropped") {
      onMark("readed");
    }
    nav(`/questions/${navCtx.prev}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isError) {
    return <p>{isError.message}</p>;
  }
  return (
    <VStack align="start" spacing={4}>
      <Question
        text={question.title.split("\n").map((l: any) => (
          <p>{l}</p>
        ))}
        time={question.createdAt}
        size="xl"
      />
      <VStack rounded="2xl" bg="white" w="full" align="start" p={4}>
        <Marker hint="标记" onChange={onMark} state={mark} />
        {question.answer?.txtContent && (
          <>
            <Heading size="md">当前回答</Heading>
            {question.answer?.txtContent.split("\n").map((l: any) => (
              <Text>{l}</Text>
            ))}
          </>
        )}
        <ButtonGroup isAttached variant="ghost">
          <Button disabled={!navCtx.prev} onClick={onPrev}>
            上一条
          </Button>
          <Button disabled={!navCtx.next} onClick={onNext}>
            下一条
          </Button>
          <Button disabled={!navCtx.prev} onClick={onReadAndPrev}>
            已读并上一条
          </Button>
        </ButtonGroup>
        <Text color="gray.500">
          只有标记为「已读」或者「想读」并且当前打开的内容才会同步到「直播助手」中。
        </Text>
      </VStack>
    </VStack>
  );
};

export default QuestionPage;
