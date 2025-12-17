# Formulário com CEP e Geolocalização

Aplicativo Expo de cadastro que preenche endereço automaticamente via CEP (API ViaCEP) ou geolocalização do dispositivo. O fluxo usa validação com Zod, máscaras para telefone/CEP, notificações por toast e React Hook Form para controle dos campos.

- **Principais recursos:** busca CEP, preenchimento por localização atual, máscaras de telefone/CEP/número, validação em tempo real, feedback de sucesso/erro.
- **Tecnologias:** Expo Router, React Native, React Hook Form, Zod, Axios, Expo Location, NativeWind/Tailwind, Toast Message.

## Instalação

```bash
npm install
```

## Execução

```bash
npx expo start
```

Escolha em seguida o dispositivo (Expo Go, emulador Android ou simulador iOS). Ao abrir o formulário, você pode:

- Digitar o CEP para preencher o endereço pela API.
- Usar o botão “Usar minha localização” para solicitar permissão e preencher automaticamente.

# Decisões técnicas

Para esse projeto utilizei o Nativewind por estar acostumado a utilizar o tailwind para desenvolvimento web.
Além de ser muito utilizado no mercado de trabalho é bem fácil de utilizar.

Sobre as validações inicialmente fiz o formulário, depois criei alguns componentes, adicionei um validators e optei por utilizar o zod por ser fortemente tipado e fácil gerenciar as minhas tipagens.

# Dificuldades

Não encontradas para esse desafio.

# Melhorias futuras

Iria criar uma interface visual mais agradável para o usuário, porém com o mesmo conceito de clean, interface mais limpa.

Além de criar os testes unitários que acabei não criando a priori no formulário.
