import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = {
  label: string;
  errorText?: string | null;
} & TextInputProps;

export const FormItem = ({ label, errorText, ...rest }: Props) => {
  return (
    <View className="mb-4">
      <Text className="text-base font-semibold mb-2 dark:text-white text-black">
        {label}
      </Text>
      <View className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-2 justify-center">
        <TextInput
          placeholder="Digite seu nome"
          placeholderTextColor="#9ca3af"
          className="text-base text-black dark:text-white"
          {...rest}
        />
      </View>
      {errorText ? (
        <Text className="pl-1 text-xs text-red-600 mt-1">{errorText}</Text>
      ) : null}
    </View>
  );
};
