(function() {

  angular.module('bar').service('mesasService', mesasService);
  mesasService.$inject = ['$http','$q'];

  function mesasService($http, $q) {
    var mesas = [],
  	   zonas = [],
      numZonas = 5,
  		numMesas = 25,
		mesasObj = {
      numero:'',
      pedidos:[],
      mozo:'',
      sape:''
    },
    zonasObj = {
			id:'',
			nombre:''
		},
    selectedZone;

		function resetMesas () {
      for (var x = 0;x < numMesas; x++){
        mesas.push(angular.copy(mesasObj));
        mesas[x].numero = x; 
      }
//      getFromLS();
    }
    function resetZonas () {
			for (var x = 0;x < numZonas; x++){
				zonas.push(angular.copy(zonasObj));
        zonas[x].id = x; 
				zonas[x].nombre = 'Zona '+(x+1); 
			}
		}

  		var setPedidoMesa = function(mesaIndex, pedido, fId){
        pedido.familyId = fId;
        mesas[mesaIndex].pedidos.push(pedido);
        saveToLS()
        return getMesas();
      }
      
      var setZona = function(zona){
        selectedZone = zona;
  		}

  		var getPedidosMesa = function(mesaIndex){
  			return mesa[mesaIndex].pedidos;
  		}
  		var getMesas = function (){
        return mesas;
      }
      var getZonas = function (){
        return zonas;
      }
      var getZona = function (){
        return selectedZone;
      }
      
      var cerrarMesa = function (mesaNumber){
        console.log(mesaNumber);
  			return false;
  		}
  		
  		function saveToLS(){
			 localStorage.setItem('mesas', JSON.stringify(mesas));
  		}
  		function getFromLS(){
  			mesas = JSON.parse(localStorage.getItem("mesas"));
  			console.log(mesas)
  		}

      resetMesas();
  		resetZonas();

	   return {
        getZonas: getZonas,
        getMesas: getMesas,
        getZona: getZona,
	  		setZona: setZona,
        cerrarMesa: cerrarMesa,
    		setPedidoMesa: setPedidoMesa,
    		getPedidosMesa: getPedidosMesa
    	};
  }
})();
