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
}
