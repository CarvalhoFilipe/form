import { useCallback, useEffect, useRef, useState } from "react";
import { StyledSafeAreaView } from "@/components/StyledSafeAreaView";
import { FormItem } from "@/components/ui/Form/FormItem";
import { Header } from "@/components/ui/Header";
import { Section } from "@/components/ui/Section";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FormHome } from "@/models/home";
import { Validators } from "@/utils/validators";
import { Masks } from "@/utils/mask";
import { CepService } from "@/services/cep-service";
import { Notification } from "@/utils/notification";

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormHome>({});
  const submitScale = useRef(new Animated.Value(1)).current;
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [cepApiError, setCepApiError] = useState<string | null>(null);
  const watchedCep = watch("cep") || "";

  const fetchAddressByCep = useCallback(
    async (digits: string) => {
      try {
        setIsFetchingCep(true);
        // adicionado para demostrar o loading
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setCepApiError(null);
        const data = await CepService.getByCep(digits);

        if (!data || data.erro) {
          throw new Error("CEP não encontrado.");
        }
        Notification.success("Endereço encontrado e preenchido com sucesso.");
        setValue("street", data.logradouro || "");
        setValue("neighborhood", data.bairro || "");
        setValue("city", data.localidade || "");
        setValue("state", data.uf || "");
        setValue("complement", data.complemento || "");
        setError("street", { type: "manual", message: undefined });
        setError("neighborhood", { type: "manual", message: undefined });
        setError("city", { type: "manual", message: undefined });
        setError("state", { type: "manual", message: undefined });
      } catch (error) {
        setCepApiError("Não foi possível buscar o CEP agora.");
        Notification.error("Não foi possível buscar o CEP informado.");
      } finally {
        setIsFetchingCep(false);
      }
    },
    [setValue]
  );

  const clearFieldsAboutCep = useCallback(() => {
    setValue("street", "");
    setValue("neighborhood", "");
    setValue("city", "");
    setValue("state", "");
    setValue("complement", "");
  }, [setValue]);

  const animateSubmit = (toValue: number) => {
    Animated.spring(submitScale, {
      toValue,
      useNativeDriver: true,
      speed: 18,
      bounciness: 8,
    }).start();
  };

  const onSubmit = handleSubmit((data) => {
    Notification.success("Formulário enviado com sucesso.");
    reset();
  });

  useEffect(() => {
    const digits = watchedCep.replace(/\D/g, "");

    if (digits.length === 8) {
      fetchAddressByCep(digits);
    }

    if (digits.length < 8) {
      clearFieldsAboutCep();
      setCepApiError(null);
    }
  }, [clearFieldsAboutCep, fetchAddressByCep, watchedCep]);

  return (
    <StyledSafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1 p-4 bg-white dark:bg-black">
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
            rules={Validators.Required()}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Nome Completo"
                placeholder="Digite seu nome"
                autoCapitalize="words"
                textContentType="name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                required
                errorText={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={Validators.Email()}
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
                required
                errorText={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={Validators.Password()}
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
                required
                errorText={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            rules={Validators.Phone()}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Telefone"
                placeholder="(11) 98888-7777"
                keyboardType="phone-pad"
                autoComplete="tel"
                maxLength={15}
                onBlur={onBlur}
                errorText={errors.phone?.message}
                onChangeText={(text) => onChange(Masks.phoneMask(text))}
                value={value}
              />
            )}
          />

          <Section title="Dados de Endereço" />
          <Controller
            control={control}
            name="cep"
            rules={Validators.Cep()}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="CEP"
                placeholder="00000-000"
                keyboardType="number-pad"
                autoComplete="postal-code"
                maxLength={9}
                onBlur={onBlur}
                onChangeText={(text) => onChange(Masks.cepMask(text))}
                value={value}
                required
                errorText={errors.cep?.message}
              />
            )}
          />
          {isFetchingCep ? (
            <Text className="text-xs text-gray-500 mb-2">
              Buscando endereço pelo CEP...
            </Text>
          ) : null}
          {cepApiError ? (
            <Text className="text-xs text-red-600 mb-2">{cepApiError}</Text>
          ) : null}
          <Controller
            control={control}
            name="street"
            rules={{ required: "Logradouro é obrigatório." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem
                label="Logradouro/Rua"
                editable={false}
                placeholder="Preenchido automaticamente pelo CEP"
                textContentType="streetAddressLine1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                required
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
                onChangeText={(text) => onChange(Masks.numberMask(text))}
                value={value}
                required
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
                editable={false}
                onChangeText={onChange}
                value={value}
                required
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
                editable={false}
                onChangeText={onChange}
                value={value}
                required
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
                required
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
