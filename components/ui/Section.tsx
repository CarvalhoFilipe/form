import { Text } from "react-native";

type Props = {
  title: string;
};

export const Section = ({ title }: Props) => {
  return <Text className="text-2xl my-2">{title}</Text>;
};
