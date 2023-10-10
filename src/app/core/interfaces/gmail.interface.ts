export interface IGmail {
  from: string;
  date: string;
  subject: string;
  labelid: string;
  id: number;
}

export interface IGmailState {
  gmailList: IGmail[];
  totalGmailList: any[];
  nextPageAvl: string;
  isLoading: boolean;
  currIter: number;
  latestPage: number;
}
