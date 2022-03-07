import { HStack, Heading, ButtonGroup, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const MARKER_STATES = {
  unread: "未读",
  wanted: "想读",
  readed: "已读",
  dropped: "抛弃",
};
export type MarkerState = keyof typeof MARKER_STATES;
export const markerStateToText = (state: MarkerState): string => {
  return (
    Object.entries(MARKER_STATES).find((s) => s[0] === state)?.[1] ?? "未知"
  );
};

export interface MarkerProps {
  hint?: string;
  state: MarkerState;
  onChange?: (state: MarkerState) => unknown;
}

export const Marker: React.FunctionComponent<MarkerProps> = ({
  hint,
  state,
  onChange,
}) => {
  return (
    <HStack spacing={2}>
      {hint && <Heading size="sm">{hint}</Heading>}
      <ButtonGroup isAttached size="sm">
        {Object.entries(MARKER_STATES).map(([k, v]) => (
          <Button
            colorScheme={state == k ? "teal" : undefined}
            onClick={() => onChange?.(k as MarkerState)}
            variant="solid"
          >
            {v}
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  );
};
