import { Box, Text } from "@chakra-ui/react";

export interface QuestionProps {
  text: string;
  time: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  size?: string;
}

export const Question: React.FunctionComponent<QuestionProps> = ({
  text,
  time,
  onClick,
  size,
}) => {
  return (
    <Box
      rounded="2xl"
      padding={4}
      bg="white"
      onClick={onClick}
      cursor="pointer"
    >
      <Text fontSize={size}>{text}</Text>
      <Text color="gray.500">{time}</Text>
    </Box>
  );
};