import moment from 'moment'
class actionCommon {
    constructor(){
        
    }
    formatNumberWithCommas = (num) => {
        if(typeof num === 'undefined' || num === '' /*|| num === '.'*/) return num;
        const parts = num.toString().split(".");
        const intergerPart = parts[0];
        const floatPart = parts[1];
        // console.log("num__", num, parts, intergerPart, floatPart);
    
        return (typeof floatPart !== 'undefined')
        ? ((intergerPart) === "-0")
          ? ("-").concat(Number(intergerPart).toLocaleString("en-EN").concat("." + floatPart))
          : Number(intergerPart).toLocaleString("en-EN").concat("." + floatPart)
        : Number(intergerPart).toLocaleString("en-EN");
        // return num.toLocaleString();
      }
      compareDate(dateTimeA, dateTimeB) {
        var momentA = moment(dateTimeA,"YYYY/MM/DD");
        var momentB = moment(dateTimeB,"YYYY/MM/DD");
        if (momentA > momentB) return 1;
        else if (momentA < momentB) return -1;
        else return 0;
    }
    
}
const action = new actionCommon();
export default action