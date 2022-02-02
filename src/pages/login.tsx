import { LockIcon } from "@chakra-ui/icons";
import {
  Center,
  Collapse,
  Container,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Stack,
} from "@chakra-ui/react";
import { invoke } from "@tauri-apps/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneCodeInput from "../components/phone_code_input";

export const LoginPage: React.FunctionComponent = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/questions");
  };
  const onSendCodeClick = () => {
    setIsCodeSent(true);
  };

  return (
    <Center flexDirection="column" minH="100vh">
      <Container w="24rem">
        <Stack spacing={4} background="white" p={4} rounded="2xl">
          <Heading>Tape 小纸条</Heading>

          <PhoneCodeInput onCodeSent={onSendCodeClick} />

          <Collapse in={isCodeSent} animateOpacity>
            <HStack ps={3}>
              <LockIcon color="gray.300" />
              <PinInput
                onComplete={onSubmit}
                value={code}
                onChange={setCode}
                isDisabled={!isCodeSent}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Collapse>
        </Stack>
      </Container>
    </Center>
  );
};

export default LoginPage;
