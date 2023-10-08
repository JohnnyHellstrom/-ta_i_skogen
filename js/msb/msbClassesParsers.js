export function parseFireData(fireProhibition, currentRisk){
   return new FireInfo(
      fireProhibition.county,
      fireProhibition.fireProhibition.status,
      fireProhibition.fireProhibition.statusCode,
      fireProhibition.fireProhibition.statusMessage,
      fireProhibition.fireProhibition.revisionDate,
      currentRisk.forecast.riskIndex,
      currentRisk.forecast.issuedDate,
      fireProhibition.fireProhibition.url,
   )
}

class FireInfo{
   constructor(county, prohibitionStatus, prohibitionCode, prohibitionMsg, prohibitionTime, fireIndex, IndexTime, url){
      this.county = county;
      this.prohibitionStatus = prohibitionStatus;
      this.prohibitionCode = prohibitionCode;
      this.prohibitionMsg = prohibitionMsg;
      this.prohibitionTime = prohibitionTime.replace('T', ' ').slice(0, -1);
      this.fireIndex = fireIndex;
      this.IndexTime = IndexTime.replace('T', ' ');
      this.url = url;
   }
}