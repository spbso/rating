import { apiInstance } from 'src/shared/api/base';
import { EventData } from '../model/types';

type GetEventRatingType = (props: { eventId: number }) => Promise<EventData>;
type GetEventIds = () => Promise<{ eventIds: number[] }>;

export const getEventRating: GetEventRatingType = async ({ eventId }) => {
  const { data } = await apiInstance.get(`/rating/event/${eventId}`);

  return data;
};
export const getEventIds: GetEventIds = async () => {
  const { data } = await apiInstance.get(`/rating/config`);

  return data;
};
