import { Images } from "../../assets/images/map";
const DATA = [
  {
    id: 1,
    title: "one",
    link: "https://dart.dev/",
  },
  {
    id: 2,
    title: "two",
    link: "https://www.programiz.com/javascript/online-compiler/",
  },
  {
    id: 3,
    title: "three",
    link: "https://www.w3schools.com/js/",
  },
  {
    id: 4,
    title: "four",
    link: "https://www.python.org/",
  },
  {
    id: 5,
    title: "five",
    link: "https://www.google.com/search?sca_esv=90b722dfcf39bfbf&rlz=1C5CHFA_enIN1045IN1045&sxsrf=ACQVn0-NXX4R3jUPmERBaGDAZ3_qCnm_6Q:1711088383318&q=Delwara+Temple&stick=H4sIAAAAAAAAAONgFuLUz9U3MDI1yy1SAjONk41NS7QUs5Ot9HPykxNLMvPz4AyrxJKSosRkELN4ESufS2pOeWJRokJIam5BTioA0fGf90wAAAA&sa=X&ved=2ahUKEwiX5pD6nIeFAxUYZmwGHQugBTwQ2coHegQINBAB&biw=1225&bih=796&dpr=1.8",
  },
  {
    id: 6,
    title: "five",
    link: "https://www.google.com/search?sca_esv=90b722dfcf39bfbf&rlz=1C5CHFA_enIN1045IN1045&sxsrf=ACQVn0-NXX4R3jUPmERBaGDAZ3_qCnm_6Q:1711088383318&q=Delwara+Temple&stick=H4sIAAAAAAAAAONgFuLUz9U3MDI1yy1SAjONk41NS7QUs5Ot9HPykxNLMvPz4AyrxJKSosRkELN4ESufS2pOeWJRokJIam5BTioA0fGf90wAAAA&sa=X&ved=2ahUKEwiX5pD6nIeFAxUYZmwGHQugBTwQ2coHegQINBAB&biw=1225&bih=796&dpr=1.8",
  },
  {
    id: 7,
    title: "five",
    link: "https://www.google.com/search?sca_esv=90b722dfcf39bfbf&rlz=1C5CHFA_enIN1045IN1045&sxsrf=ACQVn0-NXX4R3jUPmERBaGDAZ3_qCnm_6Q:1711088383318&q=Delwara+Temple&stick=H4sIAAAAAAAAAONgFuLUz9U3MDI1yy1SAjONk41NS7QUs5Ot9HPykxNLMvPz4AyrxJKSosRkELN4ESufS2pOeWJRokJIam5BTioA0fGf90wAAAA&sa=X&ved=2ahUKEwiX5pD6nIeFAxUYZmwGHQugBTwQ2coHegQINBAB&biw=1225&bih=796&dpr=1.8",
  },
  {
    id: 8,
    title: "five",
    link: "https://www.google.com/search?sca_esv=90b722dfcf39bfbf&rlz=1C5CHFA_enIN1045IN1045&sxsrf=ACQVn0-NXX4R3jUPmERBaGDAZ3_qCnm_6Q:1711088383318&q=Delwara+Temple&stick=H4sIAAAAAAAAAONgFuLUz9U3MDI1yy1SAjONk41NS7QUs5Ot9HPykxNLMvPz4AyrxJKSosRkELN4ESufS2pOeWJRokJIam5BTioA0fGf90wAAAA&sa=X&ved=2ahUKEwiX5pD6nIeFAxUYZmwGHQugBTwQ2coHegQINBAB&biw=1225&bih=796&dpr=1.8",
  },
  {
    id: 9,
    title: "five",
    link: "https://www.google.com/search?sca_esv=90b722dfcf39bfbf&rlz=1C5CHFA_enIN1045IN1045&sxsrf=ACQVn0-NXX4R3jUPmERBaGDAZ3_qCnm_6Q:1711088383318&q=Delwara+Temple&stick=H4sIAAAAAAAAAONgFuLUz9U3MDI1yy1SAjONk41NS7QUs5Ot9HPykxNLMvPz4AyrxJKSosRkELN4ESufS2pOeWJRokJIam5BTioA0fGf90wAAAA&sa=X&ved=2ahUKEwiX5pD6nIeFAxUYZmwGHQugBTwQ2coHegQINBAB&biw=1225&bih=796&dpr=1.8",
  },
  {
    id: 10,
    title: "five",
    link: "https://www.google.com/search?sca_esv=90b722dfcf39bfbf&rlz=1C5CHFA_enIN1045IN1045&sxsrf=ACQVn0-NXX4R3jUPmERBaGDAZ3_qCnm_6Q:1711088383318&q=Delwara+Temple&stick=H4sIAAAAAAAAAONgFuLUz9U3MDI1yy1SAjONk41NS7QUs5Ot9HPykxNLMvPz4AyrxJKSosRkELN4ESufS2pOeWJRokJIam5BTioA0fGf90wAAAA&sa=X&ved=2ahUKEwiX5pD6nIeFAxUYZmwGHQugBTwQ2coHegQINBAB&biw=1225&bih=796&dpr=1.8",
  },
  {
    id: 11,
    title: "five",
    link: "https://www.google.com/search?sca_esv=90b722dfcf39bfbf&rlz=1C5CHFA_enIN1045IN1045&sxsrf=ACQVn0-NXX4R3jUPmERBaGDAZ3_qCnm_6Q:1711088383318&q=Delwara+Temple&stick=H4sIAAAAAAAAAONgFuLUz9U3MDI1yy1SAjONk41NS7QUs5Ot9HPykxNLMvPz4AyrxJKSosRkELN4ESufS2pOeWJRokJIam5BTioA0fGf90wAAAA&sa=X&ved=2ahUKEwiX5pD6nIeFAxUYZmwGHQugBTwQ2coHegQINBAB&biw=1225&bih=796&dpr=1.8",
  },
];
export default DATA;
