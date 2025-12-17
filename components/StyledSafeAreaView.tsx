import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { styled } from "nativewind";

const NWSafeAreaView = styled(SafeAreaView);

type Props = SafeAreaViewProps & {
  className?: string;
};

export const StyledSafeAreaView = ({
  children,
  className = "",
  edges = ["top", "bottom", "left", "right"],
}: Props) => {
  return (
    <NWSafeAreaView className={className} edges={edges}>
      {children}
    </NWSafeAreaView>
  );
};
