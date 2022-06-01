import { ParticipantWorth, ParticipantWorthEnum } from '../model/types';

export const getParticipantTitle = (worth: ParticipantWorth): string => {
  if (Number(worth) === ParticipantWorthEnum.VOLONTEER) {
    return 'Волонтеры';
  }
  if (Number(worth) === ParticipantWorthEnum.ORGANIZER) {
    return 'Организаторы';
  }

  return 'Участники';
};

export const getCompetitionParticipantTitle = (worth: string): string => {
  if (worth === 'inPlayoff') {
    return 'Полуфинал';
  }
  if (worth === 'winners') {
    return 'Победители';
  }

  return 'Заявка';
};
