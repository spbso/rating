export enum ParticipantWorthEnum {
  DEFAULT = 0,
  VOLONTEER = 1,
  ORGANIZER = 2,
}

export type ParticipantWorth = `${ParticipantWorthEnum}`;

type ParticipantData = {
  title: string;
  brigade: string;
  lastYear: string;
  isAccepted: boolean;
}[];

type CompetitionParticipant = {
  id: number;
  title: string;
  brigades: string[];
  nominations: string[];
};
export interface EventData {
  id: number;
  title: string;
  participants: Record<ParticipantWorth, ParticipantData>;
  competitions: {
    id: number;
    title: string;
    competitionParticipants: {
      applications: CompetitionParticipant[];
      involvers: CompetitionParticipant[];
      playoffers: CompetitionParticipant[];
      winners: CompetitionParticipant[];
    };
  }[];
}
