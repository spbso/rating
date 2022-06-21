import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import React from 'react';
import { BrigadeEventItem } from './model/types';

export const CHOICE_ROUTES = {
  ART: 'art',
  SPORT: 'sport',
  VOLONTEER: 'volonteer',
  CITY: 'city',
  EDUCATION: 'education',
  IMAGE: 'image',
  COMMON: 'common',
} as const;

export const BLOCK_TITLES: Record<RouteValues, string> = {
  common: 'Итоговый рейтинг',
  art: 'Творческие мероприятия',
  city: 'Городские мероприятия',
  education: 'Образовательный блок',
  sport: 'Спортивные мероприятия',
  volonteer: 'Волонтерские мероприятия',
  image: 'Образ бойца',
};
type Keys = keyof typeof CHOICE_ROUTES;
export type RouteValues = typeof CHOICE_ROUTES[Keys];

export type ColumnType = {
  getter: (item?: BrigadeEventItem) => React.ReactNode;
  title: string;
};

const participantRenderer = (
  item: BrigadeEventItem | undefined,
  key: 'participant0' | 'participant1' | 'participant2'
): React.ReactNode => item?.[key]?.filter((participant) => participant.isAccepted).length;

export const Columns: Record<RouteValues, ColumnType[]> = {
  art: [
    { getter: (item) => participantRenderer(item, 'participant1'), title: 'Волонтеры' },
    {
      getter: (item) =>
        item?.participant1
          ?.filter((participant) => participant.isAccepted)
          .reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    { getter: (item) => participantRenderer(item, 'participant2'), title: 'Организа-торы' },
    {
      getter: (item) =>
        item?.participant2
          ?.filter((participant) => participant.isAccepted)
          .reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    {
      getter: (item) =>
        item?.applications?.reduce((partialSum, participant) => partialSum + participant.count, 0),
      title: 'Подача заявки',
    },
    {
      getter: (item) =>
        item?.applications
          ?.reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    {
      getter: (item) =>
        item?.involvers?.reduce((partialSum, participant) => partialSum + participant.count, 0),
      title: 'Участие в конкурсной программе',
    },
    {
      getter: (item) =>
        item?.involvers?.reduce((partialSum, participant) => partialSum + participant.value, 0),
      title: 'Балл',
    },
    {
      getter: (item) =>
        item?.playoffers?.reduce((partialSum, participant) => partialSum + participant.count, 0),
      title: 'Полуфинал',
    },
    {
      getter: (item) =>
        item?.playoffers?.reduce((partialSum, participant) => partialSum + participant.value, 0),
      title: 'Балл',
    },
    {
      getter: (item) =>
        item?.winners
          ?.reduce((partialSum, participant) => partialSum + participant.count, 0)
          .toFixed(6),
      title: 'Номинация',
    },
    {
      getter: (item) =>
        item?.winners?.reduce((partialSum, participant) => partialSum + participant.value, 0),
      title: 'Балл',
    },
    {
      getter: (item) => item?.total,
      title: 'Итог за мероприятие',
    },
    {
      getter: (item) => item?.multipliedTotal,
      title: 'Итог c коэффициентом',
    },
  ],
  sport: [
    { getter: (item) => participantRenderer(item, 'participant1'), title: 'Волонтеры' },
    {
      getter: (item) =>
        item?.participant1
          ?.filter((participant) => participant.isAccepted)
          .reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    {
      getter: (item) => participantRenderer(item, 'participant2'),
      title: 'Организа-торы',
    },
    {
      getter: (item) =>
        item?.participant2
          ?.filter((participant) => participant.isAccepted)
          .reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    {
      getter: (item) =>
        item?.involvers?.reduce((partialSum, participant) => partialSum + participant.count, 0),
      title: 'Участие в соревн.',
    },
    {
      getter: (item) =>
        item?.involvers
          ?.reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    {
      getter: (item) =>
        item?.playoffers?.reduce((partialSum, participant) => partialSum + participant.count, 0),
      title: 'Плей-офф',
    },
    {
      getter: (item) =>
        item?.playoffers
          ?.reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    {
      getter: (item) =>
        item?.winners?.reduce((partialSum, participant) => partialSum + participant.count, 0),
      title: 'Победа',
    },
    {
      getter: (item) =>
        item?.winners
          ?.reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    {
      getter: (item) => item?.total,
      title: 'Сумма',
    },
    {
      getter: (item) => item?.multipliedTotal,
      title: 'Сумма с коэф.',
    },
  ],
  volonteer: [
    { getter: (item) => item?.participant0?.length, title: 'Участники' },
    {
      getter: (item) =>
        item?.participant0
          ?.filter((participant) => participant.isAccepted)
          .reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    { getter: (item) => participantRenderer(item, 'participant1'), title: 'Волонтеры' },
    {
      getter: (item) =>
        item?.participant1
          ?.filter((participant) => participant.isAccepted)
          .reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    { getter: (item) => participantRenderer(item, 'participant2'), title: 'Организаторы' },
    {
      getter: (item) =>
        item?.participant2
          ?.filter((participant) => participant.isAccepted)
          .reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    {
      getter: (item) => item?.total,
      title: 'Итог за мероприятие',
    },
    {
      getter: (item) => item?.multipliedTotal,
      title: 'Итог c коэффициентом',
    },
  ],
  city: [
    { getter: (item) => participantRenderer(item, 'participant1'), title: 'Волонтеры' },
    {
      getter: (item) =>
        item?.participant1
          ?.filter((participant) => participant.isAccepted)
          .reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    { getter: (item) => participantRenderer(item, 'participant2'), title: 'Организаторы' },
    {
      getter: (item) =>
        item?.participant2
          ?.filter((participant) => participant.isAccepted)
          .reduce((partialSum, participant) => partialSum + participant.value, 0)
          .toFixed(6),
      title: 'Балл',
    },
    {
      getter: (item) => item?.total,
      title: 'Итог за мероприятие',
    },
    {
      getter: (item) => item?.multipliedTotal,
      title: 'Итог c коэффициентом',
    },
  ],
  common: [],
  education: [],
  image: [],
};

export const headerStyles: SxProps<Theme> = {
  borderRight: 1,
  background: (theme) => theme.palette.common.white,
  borderRightColor: (theme) => theme.palette.grey[200],
  fontSize: '12px',
  lineHeight: '14px',
  padding: '6px',
};
export const bodyStyles: SxProps<Theme> = {
  borderRight: 1,
  borderRightColor: (theme) => theme.palette.grey[200],
  fontSize: '12px',
  padding: '6px',
};
