import { apiInstance } from 'src/shared/api/base';
import { Choice } from '../model/types';

type getChoiceType = (props: { choice: string }) => Promise<{}>;

export const getChoiceRating: getChoiceType = async ({ choice }) => {
  const { data } = await apiInstance.get(`/rating/`, { params: { choice } });

  return data;
};
