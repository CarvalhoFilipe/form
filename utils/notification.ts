import Toast from "react-native-toast-message";

const successNotification = (message: string) => {
  Toast.show({
    type: "success",
    text1: "Sucesso",
    text2: message,
  });
};

const errorNotification = (message: string) => {
  Toast.show({
    type: "error",
    text1: "Falha",
    text2: message,
  });
};

export const Notification = {
  success: successNotification,
  error: errorNotification,
};
