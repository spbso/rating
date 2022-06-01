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
  if (worth === 'involvers') {
    return 'Участие';
  }
  if (worth === 'playoffers') {
    return 'Полуфинал';
  }
  if (worth === 'winners') {
    return 'Победители';
  }

  return 'Заявка';
};
