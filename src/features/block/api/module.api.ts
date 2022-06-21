import { apiInstance } from 'src/shared/api/base';
import { BlockTableData } from '../model/types';

type getChoiceType = (props: { block: string }) => Promise<BlockTableData>;

export const getRatingBlock: getChoiceType = async ({ block }) => {
  const { data } = await apiInstance.get(`/rating/block/${block}`);

  return data;
};
