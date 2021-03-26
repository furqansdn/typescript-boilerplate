import { Container } from 'typedi';
import logger from './logger';

export default ({ models }: { models: { name: string; model: any }[] }) => {
  try {
    models.forEach((m) => {
      Container.set(m.name, m.model);
    });
  } catch (error) {
    logger.error('🔥 Error on dependency injector loader: %o', error);
    throw error;
  }
};
