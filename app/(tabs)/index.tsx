import { useRef } from "react";
import { StyledSafeAreaView } from "@/components/StyledSafeAreaView";
import { FormItem } from "@/components/ui/Form/FormItem";
import { Header } from "@/components/ui/Header";
import { Section } from "@/components/ui/Section";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });
  const submitScale = useRef(new Animated.Value(1)).current;

  const animateSubmit = (toValue: number) => {
    Animated.spring(submitScale, {
      toValue,
      useNativeDriver: true,
      speed: 18,
      bounciness: 8,
    }).start();
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Enviar formulário", data);
  });
  return (
    <StyledSafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1 p-4">
        <Header title="Formulário de cadastro" />
        <ScrollView
          className="mt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <Text className="text-base dark:text-white text-black mb-4">
            Por favor, preencha o formulário abaixo com suas informações:
          </Text>

          <Section title="Dados Pessoais" />
          <Controller
            control={control}
            name="name"
            rules={{ required: "Este campo é obrigatório." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Nome Completo"
                placeholder="Digite seu nome"
                autoCapitalize="words"
                textContentType="name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorText={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={{
              required: "E-mail é obrigatório.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Informe um e-mail válido.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="E-mail"
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorText={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Senha é obrigatória.",
              minLength: { value: 6, message: "Mínimo de 6 caracteres." },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Senha"
                placeholder="Digite sua senha"
                secureTextEntry
                textContentType="newPassword"
                autoComplete="new-password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorText={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Telefone"
                placeholder="(11) 98888-7777"
                keyboardType="phone-pad"
                autoComplete="tel"
                maxLength={15}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Section title="Dados de Endereço" />
          <Controller
            control={control}
            name="cep"
            rules={{
              required: "CEP é obrigatório.",
              pattern: {
                value: /^\d{5}-?\d{3}$/,
                message: "Use o formato 00000-000.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="CEP"
                placeholder="00000-000"
                keyboardType="number-pad"
                autoComplete="postal-code"
                maxLength={9}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorText={errors.cep?.message}
              />
            )}
          />
          {false ? (
            <Text className="text-xs text-gray-500 mb-2">
              Buscando endereço pelo CEP...
            </Text>
          ) : null}
          <Controller
            control={control}
            name="street"
            rules={{ required: "Logradouro é obrigatório." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Logradouro/Rua"
                placeholder="Preenchido automaticamente pelo CEP"
                textContentType="streetAddressLine1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorText={errors.street?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="number"
            rules={{ required: "Número é obrigatório." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Número"
                placeholder="Digite o número"
                keyboardType="number-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorText={errors.number?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="complement"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Complemento"
                placeholder="Apartamento, bloco, etc."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="neighborhood"
            rules={{ required: "Bairro é obrigatório." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Bairro"
                placeholder="Preenchido automaticamente pelo CEP"
                textContentType="sublocality"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorText={errors.neighborhood?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            rules={{ required: "Cidade é obrigatória." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Cidade"
                placeholder="Preenchido automaticamente pelo CEP"
                textContentType="addressCity"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorText={errors.city?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="state"
            rules={{
              required: "UF é obrigatória.",
              pattern: {
                value: /^[A-Za-z]{2}$/,
                message: "Use 2 letras, ex: SP.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Estado/UF"
                placeholder="UF"
                maxLength={2}
                textContentType="addressState"
                autoCapitalize="characters"
                onBlur={onBlur}
                onChangeText={(text) => onChange(text.toUpperCase())}
                value={value}
                errorText={errors.state?.message}
              />
            )}
          />
          <Animated.View
            className="mt-6"
            style={{ transform: [{ scale: submitScale }] }}
          >
            <Pressable
              className="p-5 bg-green-800 rounded-full items-center justify-center"
              onPressIn={() => animateSubmit(0.97)}
              onPressOut={() => animateSubmit(1)}
              onHoverIn={() => animateSubmit(1.03)}
              onHoverOut={() => animateSubmit(1)}
              onPress={onSubmit}
            >
              <Text className="text-white text-xl font-bold">Enviar</Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </View>
    </StyledSafeAreaView>
  );
}
