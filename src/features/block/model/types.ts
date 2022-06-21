import { RouteValues } from '../consts';

export type Participant = {
  id: number;
  title: string;
  value: number;
  brigade: string;
  lastYear: number;
  isAccepted: boolean;
};
export type CompetitionParticipant = {
  count: number;
  title: string;
  value: number;
  brigades: string[];
  nominations: string[];
  competitionId: number;
};

export type BrigadeEventItem = {
  total: number;
  multipliedTotal: number;
  participant0?: Participant[];
  participant1?: Participant[];
  participant2?: Participant[];
  applications?: CompetitionParticipant[];
  involvers?: CompetitionParticipant[];
  playoffers?: CompetitionParticipant[];
  winners?: CompetitionParticipant[];
};

export type Competition = {
  id: number;
  title: string;
};
export type EventData = {
  id: string;
  title: string;
  is_canonical: boolean;
  values: {
    [brigadeId: string]: BrigadeEventItem;
  };
  competitions: Competition[];
};
export type EventsData = EventData[];

type BlockTotal = {
  rank: number;
  '-rank': number;
  total: number;
};
export type CommonSummaryData = {
  [brigadeId: string]: Record<RouteValues, BlockTotal>;
};
export type SummaryData = {
  [brigadeId: string]: {
    rank: number;
    total: number;
    multiplied: number;
  };
};
export type Brigade = {
  id: number;
  title: string;
};

export interface BlockTableData {
  events: EventsData;
  brigades: Brigade[];
  summary: SummaryData | CommonSummaryData;
}

export type CompetitionData = {
  applications?: CompetitionParticipant[];
  involvers?: CompetitionParticipant[];
  playoffers?: CompetitionParticipant[];
  winners?: CompetitionParticipant[];
};
