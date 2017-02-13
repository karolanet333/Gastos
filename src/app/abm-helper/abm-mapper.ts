import {FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {GeneralHelper} from 'app/general-helper';

export class AbmMapper  {

  //variables para mapear en los forms
  viewModel = {};
  dbModel = {};
  listM = [];
  listVM = [];
  sortByField = '';
  page: number = 1;

  initialize(sortByField: string){
    this.sortByField = sortByField;
  }

  //add (1 metodo)
  add(){
    this.dbModel = Object.assign({}, this.viewModel);
  }

  //edit (2 metodos)
  editStart(firebaseObjectObservable: FirebaseObjectObservable<any>){
    firebaseObjectObservable.subscribe(
      model => {
        this.dbModel = model;
        this.viewModel = this.M_to_VM(model, true);
      }
    );
  }

  editEnd(){
    this.dbModel = Object.assign({}, this.viewModel);

    //agregar prop key
    this.dbModel['$key'] = this.viewModel['id'];
    
    //eliminar propiedades de más
    delete this.dbModel['id'];
  }


  list(firebaseListObservable: FirebaseListObservable<any>){
    var that = this;
    firebaseListObservable.subscribe(
      model => {

        GeneralHelper.sortObjectArray(model, this.sortByField);
        this.listM = model;

        this.listVM = GeneralHelper.cloneObjectArray(model);
          

        //mapear array
        this.listVM = this.listVM.map(
          item => {

            item = this.M_to_VM(item, false);

            return item;
          }
        );

      }
    );

  }

  //ES PARA CUANDO YA VIENE ORDENADO DESDE LA BASE
  list2(firebaseListObservable: FirebaseListObservable<any>){
    var that = this;
    firebaseListObservable.subscribe(
      model => {

        //GeneralHelper.sortObjectArray(model, this.sortByField);
        this.listM = model;

        this.listVM = GeneralHelper.cloneObjectArray(model);
          

        //mapear array
        this.listVM = this.listVM.map(
          item => {

            item = this.M_to_VM(item, false);

            return item;
          }
        );

      }
    );

  }

  M_to_VM(modelObject, newObject : boolean){
    var objRpta;

    //clonar el objecto de ser necesario
    if (newObject){
      objRpta = Object.assign({}, modelObject);
    } else {
      objRpta = modelObject;
    }

    //agregar prop id
    objRpta['id'] = objRpta['$key'];
    
    //eliminar propiedades de más
    delete objRpta['$key'];

    return objRpta;
  }

  VM_to_M(viewModelObject, newObject: boolean){
    var objRpta;

    //clonar el objecto de ser necesario
    if (newObject){
      objRpta = Object.assign({}, viewModelObject);
    } else {
      objRpta = viewModelObject;
    }

    //agregar prop $key
    objRpta['$key'] = objRpta['id'];
    
    //eliminar propiedades de más
    delete objRpta['id'];

    return objRpta;
  }

  /*getDBModelById(id){
      var item = this.listM.find(
        x => x.$key == id
      );

      return item;
  }*/

}
