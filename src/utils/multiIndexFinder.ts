export const multiIndexFinder=(arr:Array<any>,el:any,key:string)=>{
  let idx=[];
  for(let i=arr.length-1;i>=0;i--){
    if(arr[i][key]===el){
      idx.unshift(i)
    }
  }
  return idx;
}

export const multiIndexFinderOfTwo=(arr:Array<any>,el1:any,key1:string,el2:any,key2:string)=>{
  let idx=[];
  for(let i=arr.length-1;i>=0;i--){
    if(arr[i][key1]===el1 && arr[i][key2]===el2){
      idx.unshift(i)
    }
  }
  return idx;
}