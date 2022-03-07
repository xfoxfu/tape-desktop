import { HStack, Heading, ButtonGroup, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SELECTOR_STATES = {
  unanswered: "未回答",
  answered: "已回答",
};
export type SelectorState = keyof typeof SELECTOR_STATES;

export interface SelectorProps {
  hint?: string;
  defaultState?: SelectorState;
  onChange?: (state: SelectorState) => unknown;
}

export const Selector: React.FunctionComponent<SelectorProps> = ({
  hint,
  defaultState,
  onChange,
}) => {
  const [state, setState] = useState<SelectorState>(
    defaultState ?? "unanswered"
  );
  useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  return (
    <HStack spacing={2}>
      {hint && <Heading size="sm">{hint}</Heading>}
      <ButtonGroup isAttached size="sm">
        {Object.entries(SELECTOR_STATES).map(([k, v]) => (
          <Button
            colorScheme={state == k ? "teal" : undefined}
            onClick={() => setState(k as SelectorState)}
            variant="solid"
          >
            {v}
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  );
};
