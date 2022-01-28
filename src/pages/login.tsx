import { LockIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  PinInput,
  PinInputField,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/questions");
  };

  return (
    <Center flexDirection="column" minH="100vh">
      <Container>
        <Stack spacing={4} background="white" padding={4} rounded="2xl">
          <Heading>Tape 小纸条</Heading>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.300" />}
            />
            <Input type="tel" placeholder="用户名" />
            <InputRightElement width="7rem">
              <Button>发送验证码</Button>
            </InputRightElement>
          </InputGroup>

          <HStack>
            <LockIcon color="gray.300" />
            <PinInput>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>

          <Button colorScheme="teal" onClick={onSubmit}>
            登入
          </Button>
        </Stack>
      </Container>
    </Center>
  );
};

export default LoginPage;
