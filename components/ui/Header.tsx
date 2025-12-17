import { View } from "react-native";
import { Title } from "./Title";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <View className="justify-center items-center pb-4">
      <Title>{title}</Title>
    </View>
  );
};
