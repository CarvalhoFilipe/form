import { ReactNode } from "react";
import { Text } from "react-native";

type Props = {
  children: ReactNode;
};

export const Title = ({ children }: Props) => {
  return (
    <Text className="text-3xl font-bold dark:text-white text-black">
      {children}
    </Text>
  );
};
