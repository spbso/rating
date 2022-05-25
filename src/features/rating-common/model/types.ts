type ConfigType = [string, number | null, string[]];
export type HeaderData = ConfigType[];

export type BodyData = {
  [id: string]: {
    id: number;
    title: string;
    columns: number[][];
  };
};

export interface TableData {
  headerData: HeaderData;
  bodyData: BodyData;
}
