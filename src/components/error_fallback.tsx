import {
  Center,
  Container,
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Code,
  CloseButton,
  Text,
} from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallback: React.FunctionComponent<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Center minH="100vh">
      <Container>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>页面发生内部错误：{error.name}</AlertTitle>
            <AlertDescription display="block">
              <VStack spacing="2" pt="4">
                <Text>{error.message}</Text>
                <Accordion allowToggle textAlign="left">
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        错误栈
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Code>{error.stack}</Code>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </VStack>
            </AlertDescription>
          </Box>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={resetErrorBoundary}
          />
        </Alert>
      </Container>
    </Center>
  );
};
