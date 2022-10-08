export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongoddUrl: process.env.MONGODB_URL,
  port: process.env.PORT || 3002,
  defaultLimitPagination: process.env.DEFAULT_LIMIT_PAGINATION || 200,
  defaulOffsetPagination: process.env.OFFSET_LIMIT_PAGINATION || 0,
});
