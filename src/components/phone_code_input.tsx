import { PhoneIcon } from "@chakra-ui/icons";
import {
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormErrorMessage,
  InputLeftAddon,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export interface PhoneCodeInputProps {
  onCodeSent: () => unknown;
}

export const PhoneCodeInput: React.FunctionComponent<PhoneCodeInputProps> = ({
  onCodeSent,
}) => {
  const [phone, setPhone] = useState("");

  const onSendCodeClick = () => {
    onCodeSent?.();
  };

  return (
    <FormControl isRequired isInvalid={true}>
      <InputGroup>
        <InputLeftAddon>
          <HStack>
            <PhoneIcon color="gray.300" />
            <Text>+86</Text>
          </HStack>
        </InputLeftAddon>

        <Input
          name="phone"
          type="tel"
          placeholder="手机号码"
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
          pr="6.5rem"
        />
        <InputRightElement w="6.5rem">
          <Button onClick={onSendCodeClick} size="sm">
            发送验证码
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>Email is required.</FormErrorMessage>
    </FormControl>
  );
};

export default PhoneCodeInput;
