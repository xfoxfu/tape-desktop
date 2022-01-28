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
} from "@chakra-ui/react";

export const Login: React.FunctionComponent = () => {
  return (
    <Center
      flexDirection="column"
      height="100vh"
      bgGradient="linear(to-br, #7df29c, #0f69a9)"
    >
      <Container>
        <Stack spacing={4} background="white" padding={4} rounded={8}>
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

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<LockIcon color="gray.300" />}
            />
            <Input placeholder="密码" type="password" />
          </InputGroup>

          <Button colorScheme="teal">登入</Button>
        </Stack>
      </Container>
    </Center>
  );
};

export default Login;
