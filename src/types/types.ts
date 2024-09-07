export interface ICountry {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca3: string;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  capital: string[];
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  borders: string[];
  flag: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}

export interface ISearchProps {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}

export interface IRegionProps {
  selectedRegion: string;
  setSelectedRegion: (selectedRegion: string) => void;
  countries: ICountry[];
}

export interface ICountryCardProps {
  inputValue: string;
  selectedRegion: string;
  countries: ICountry[];
  loading: boolean;
  error: string | null | undefined;
}

export interface IBordersProps {
  borders: string[];
}
