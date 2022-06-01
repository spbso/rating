import { apiInstance } from 'src/shared/api/base';
import { EventData } from '../model/types';

type getEventRatingType = (props: { eventId: number }) => Promise<EventData>;

export const getEventRating: getEventRatingType = async ({ eventId }) => {
  const { data } = await apiInstance.get(`/rating/event/${eventId}`);

  return data;
};
