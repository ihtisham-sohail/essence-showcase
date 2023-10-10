export const gmailAPIBase: string = 'https://gmail.googleapis.com';
export const postListUrl: string =
  'https://jsonplaceholder.typicode.com/comments';

export const getGLabelListUrl = (userId: string) =>
  `${gmailAPIBase}/gmail/v1/users/${userId}/messages?maxResults=${maxResults}`;
export const getGmailDataUrl = (userId: string, mailId: string) =>
  `${gmailAPIBase}/gmail/v1/users/${userId}/messages/${mailId}`;

export const gmailApiTokenValidity = (accessToken: string) =>
  `${gmailAPIBase}/oauth2/v1/tokeninfo?access_token=${accessToken}`;

export const maxResults = 15;
