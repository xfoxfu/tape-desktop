import { Box, Text } from "@chakra-ui/react";

export interface QuestionProps {
  text: string;
  time: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  size?: string;
  active?: boolean;
}

export const Question: React.FunctionComponent<QuestionProps> = ({
  text,
  time,
  onClick,
  size,
  active,
}) => {
  return (
    <Box
      rounded="2xl"
      p={4}
      bg={active ? "cyan.100" : "white"}
      onClick={onClick}
      cursor="pointer"
    >
      <Text fontSize={size}>{text}</Text>
      <Text color="gray.500">{time}</Text>
    </Box>
  );
};
