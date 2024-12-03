import { PUBLIC_R2_DEV_BUCKET_ENDPOINT, PUBLIC_R2_BUCKET_ENDPOINT } from "$env/static/public";

export const r2bucketEndpoint = import.meta.env.DEV
  ? PUBLIC_R2_DEV_BUCKET_ENDPOINT
  : PUBLIC_R2_BUCKET_ENDPOINT;
