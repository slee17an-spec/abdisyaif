export const apiKeys=new Map([
  ["user-test-1",{active:true,plan:"free",rpm:60,dailyQuota:10000}],
  ["user-pro-1",{active:true,plan:"pro",rpm:300,dailyQuota:100000}],
  ["internal-admin",{active:true,plan:"admin",rpm:1200,dailyQuota:1000000}],
]);
export const getApiKeyRecord=(k)=>apiKeys.get(k);
