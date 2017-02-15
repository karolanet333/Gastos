export class GeneralHelper {
    static cloneObjectArray(array) : Array<any>{
        var i = array.length;
        var arrayRpta = Array(i);
        while(i--) {
          arrayRpta[i] = Object.assign({}, array[i]); ;
        }
        return arrayRpta;
    }

    static sortObjectArray(array, sortByField){

        array.sort((a, b) => {
            if (a[sortByField] < b[sortByField]){
            return -1;
            } 
            if (a[sortByField] > b[sortByField]){
            return 1;
            }
            return 0;
        });

    }

    static getDateFromStr(strDate: string) : Date{
        var year = parseInt(strDate.substring(0, 4));
        var month = parseInt(strDate.substring(5, 7)) - 1;
        var day = parseInt(strDate.substring(8, 10));
        var date = new Date(year, month, day);
        return date;
    }

    static getStrDate(date: Date): string{
        var tmpMonth = date.getMonth() + 1;
        var tmpDay = date.getDate();
        var month = ("0" + tmpMonth).slice(-2);
        var day = ("0" + tmpDay).slice(-2);
        var sDate = date.getFullYear() + '-' + month + '-' +  day;
        return sDate;
    }

    static getStrFullDate(date: Date): string{
        var sDate = GeneralHelper.getStrDate(date) + (date.getHours() + 1) + ':' + (date.getMinutes() + 1) + ':' + (date.getSeconds() + 1)
        return sDate;
    }

    /*static getDateFromStrDate(strDate: string): Date{
        var year = strDate.substring(0, 3);
        var month = strDate.substring()
        var date = new Date()
    }*/
}
