import { apiInstance } from 'src/shared/api/base';
import { TableData } from '../model/types';

type getChoiceType = (props: { choice: number }) => Promise<TableData>;

export const getChoiceRating: getChoiceType = async ({ choice }) => {
  const { data } = await apiInstance.get(`/rating/choice/${choice}`);

  return data;
};