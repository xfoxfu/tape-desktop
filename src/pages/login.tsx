import { LockIcon } from "@chakra-ui/icons";
import {
  Center,
  Collapse,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  InputGroup,
  PinInput,
  PinInputField,
  Stack,
} from "@chakra-ui/react";
import { getVersion } from "@tauri-apps/api/app";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneCodeInput from "../components/phone_code_input";
import { apiPost } from "../hooks/api";
import { db } from "../storage";

export const LoginPage: React.FunctionComponent = () => {
  const loc = useLocation();
  const nav = useNavigate();
  if (
    db.data?.accessToken &&
    (loc.pathname === "/" || loc.pathname === "/login")
  ) {
    nav("/questions", { replace: true });
  }

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const navigate = useNavigate();
  const onSubmit = async (code: string) => {
    try {
      let res = await apiPost<any>("auth/phoneLogin", {
        code: code,
        phone: phone,
        area: "86",
      });
      db.data!.accessToken = res.jwtInfo.accessToken;
      db.write();
      console.log(db.data?.accessToken);
      navigate("/questions");
    } catch (e) {
      if (e instanceof Error) {
        setCodeError(e.message);
      }
    }
  };
  const onSendCodeClick = async (phone: string) => {
    try {
      setPhone(phone);
      await apiPost("unuser/sms", {
        phone: phone,
        area: "86",
      });
    } catch (e) {
      if (e instanceof Error) {
        setPhoneError(e.message);
      }
    }
    setIsCodeSent(true);
  };
  const [v, setV] = useState("");
  getVersion().then(setV);

  return (
    <Center flexDirection="column" minH="100vh">
      <Container w="24rem">
        <Stack spacing={4} background="white" p={4} rounded="2xl">
          <Heading>Tape 小纸条 {v}</Heading>

          <PhoneCodeInput
            onCodeSent={onSendCodeClick}
            error={phoneError ?? undefined}
          />

          <Collapse in={isCodeSent} animateOpacity>
            <FormControl isRequired isInvalid={!!codeError}>
              <InputGroup>
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
                  </PinInput>
                </HStack>
              </InputGroup>
              {codeError && <FormErrorMessage>{codeError}</FormErrorMessage>}
            </FormControl>
          </Collapse>
        </Stack>
      </Container>
    </Center>
  );
};

export default LoginPage;
