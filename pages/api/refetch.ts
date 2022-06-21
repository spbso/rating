import { NextApiRequest, NextApiResponse } from 'next';
import { CHOICE_ROUTES } from 'src/features/block/consts';
import { getEventIds } from 'src/features/event/api/module.api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // choices
    await Promise.all(
      Object.values(CHOICE_ROUTES).map((block) => res.unstable_revalidate(`/rating/${block}`))
    );
    const { eventIds } = await getEventIds();
    await Promise.all(
      eventIds.map((eventId) => res.unstable_revalidate(`/rating/event/${eventId}`))
    );

    return res.json({ revalidated: true });
  } catch (err) {
    console.log(err);
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
