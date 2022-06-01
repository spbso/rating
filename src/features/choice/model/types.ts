export type ColumnsData = {
  title: string;
  columns: string[];
};

type ColumnValue = null | number;

type EventData = {
  id: string;
  title: string;
  is_canonical: boolean;
  values: {
    [id: string]: ColumnValue[];
  };
};
export type EventsData = EventData[];
export interface TableData {
  columnsData: ColumnsData;
  brigadesData: {
    id: number;
    title: string;
  }[];
  eventsData: EventsData;
  summaryData: EventData;
}
