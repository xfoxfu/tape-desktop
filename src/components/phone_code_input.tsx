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
  onCodeSent: (phone: string) => unknown;
  error?: string;
}

export const PhoneCodeInput: React.FunctionComponent<PhoneCodeInputProps> = ({
  onCodeSent,
  error,
}) => {
  const [phone, setPhone] = useState("");

  const onSendCodeClick = () => {
    onCodeSent?.(phone);
  };

  return (
    <FormControl isRequired isInvalid={!!error}>
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
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default PhoneCodeInput;
