import { useAppSelector } from "../store";
import localizationData from "../utils/translation.json";

export interface dataType {
  [key: string]: {
    [key: string]: string;
  };
}

export function useLocalization() {
  const { lang } = useAppSelector((state) => state.lang);

  function t(value: string): string {
    try {
      return (localizationData as dataType)[value.toLowerCase()][lang];
    } catch (error) {
      return value;
    }
  }

  return { t, language: lang };
}
