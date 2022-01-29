import { HStack, Heading, ButtonGroup, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const MARKER_STATES = {
  unread: "未读",
  wanted: "想读",
  readed: "已读",
  dropped: "抛弃",
};
export type MarkerState = keyof typeof MARKER_STATES;

export interface MarkerProps {
  hint?: string;
  defaultState?: MarkerState;
  onChange?: (state: MarkerState) => unknown;
}

export const Marker: React.FunctionComponent<MarkerProps> = ({
  hint,
  defaultState,
  onChange,
}) => {
  const [state, setState] = useState<MarkerState>(defaultState ?? "unread");
  useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  return (
    <HStack spacing={2}>
      {hint && <Heading size="sm">{hint}</Heading>}
      <ButtonGroup isAttached size="sm">
        {Object.entries(MARKER_STATES).map(([k, v]) => (
          <Button
            colorScheme={state == k ? "teal" : undefined}
            onClick={() => setState(k as MarkerState)}
            variant="solid"
          >
            {v}
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  );
};
