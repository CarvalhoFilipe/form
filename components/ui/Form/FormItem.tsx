import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = {
  label: string;
  errorText?: string | null;
  required?: boolean;
} & TextInputProps;

export const FormItem = ({ label, errorText, required = false, ...rest }: Props) => {
  return (
    <View className="mb-4">
      <Text className="text-base font-semibold mb-2 dark:text-white text-black">
        {label}
        {required ? <Text className="text-red-500"> *</Text> : null}
      </Text>
      <View
        className={`rounded-lg px-2 py-2 justify-center bg-gray-200 dark:bg-gray-800 ${
          rest.editable === false ? "opacity-50" : ""
        } `}
      >
        <TextInput
          placeholder="Digite seu nome"
          placeholderTextColor="#9ca3af"
          className="text-base text-black dark:text-white bg-transparent"
          {...rest}
        />
      </View>
      {errorText ? (
        <Text className="pl-1 pt-1 text-xs text-red-600 mt-1">{errorText}</Text>
      ) : null}
    </View>
  );
};
