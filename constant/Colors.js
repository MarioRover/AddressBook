export const Colors = {
  primary: "#18181D",
  midBlue: "#202026",
  lightBlue: "#1f6feb",
  lightGray: "#f6f8fa",
  midGray: "#d0d7de",
  heavyGray: "#30363d",
  white: "#ffffff",
  black: "#000",
  red: "#e74c3c",
};

export const lightColors = {
  background: Colors.white,
  text: Colors.primary,
  header: {
    background: Colors.primary,
    title: Colors.white,
  },
  input: {
    label: Colors.primary,
    background: Colors.lightGray,
    text: Colors.primary,
    border: Colors.midGray,
    palceholder: Colors.midGray,
  },
};

export const darkColors = {
  background: Colors.midBlue,
  text: Colors.white,
  header: {
    background: Colors.white,
    title: Colors.primary,
  },
  input: {
    label: Colors.white,
    background: Colors.black,
    text: Colors.white,
    border: Colors.heavyGray,
    palceholder: Colors.heavyGray,
  },
};
