import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    email: {
      required: true,
    },
    "custom:organizationId": {
      dataType: "String",
      mutable: true,
      maxLen: 32,
      minLen: 1,
    },
  },
  groups: ["ADMINS", "EDITORS", "VIEWERS"],
});
