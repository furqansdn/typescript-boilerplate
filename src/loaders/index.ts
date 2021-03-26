import expressLoader from './express';
import logger from './logger';
import mongoose from './mongoose';
import dependenciesInjections from './dependencyInjector';

export default async ({ expressApp }) => {
  /**
   * Load MongoDB Database
   */
  await mongoose();
  logger.info('DB Loaded successfully');

  /**
   * Load dependencies injection
   */
  const userModels = {
    name: 'userModel',
    model: require('../models/User').default,
  };

  dependenciesInjections({ models: [userModels] });
  logger.info('✌️ Dependency Injector loaded');

  /**
   * Load all express dependencies and middlewares
   */
  expressLoader({ app: expressApp });
  logger.info('Express Loaded');
};
