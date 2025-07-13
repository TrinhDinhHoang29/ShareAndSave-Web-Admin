export interface IUserReport {
  id: number;
  fullName: string;
  major: string;
  goodPoint: number;
  goodDeeds: {
    goodDeedType: number;
    goodDeedCount: number;
  }[];
}
