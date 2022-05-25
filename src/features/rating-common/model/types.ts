type ConfigType = [string, number | null, number];
export type HeaderData = [ConfigType, string[]];

type RowEvent = number[];
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
