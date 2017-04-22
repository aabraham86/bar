(function() {

  angular.module('bar').service('mesasService', mesasService);
  mesasService.$inject = ['$http','$q','lodash','$rootScope'];

  function mesasService($http, $q, _, $rootScope) {
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
			nombre:'',
      mesas:[]
		},
    selectedZone;

		function resetMesas () {
      //get from backend
      mesas = [];
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
				zonas[x].mesas = angular.copy(mesas); 
      }
      saveToLS()
		}

  		var setPedidoMesa = function(mesaIndex, pedido){
        //save to the backend
        mesas[mesaIndex].pedidos = mesas[mesaIndex].pedidos.concat(pedido);
        zonas[getZona()].mesas = mesas;
        saveToLS();
      }
      
      var setZona = function(zona){
        selectedZone = zona;
        resetMesas();
      }

      var getPedidosMesa = function(mesaIndex){
        return mesa[mesaIndex].pedidos;
      }
      var getMesas = function (){
        return getFromLS();
      }
      var getZonas = function (){
        return zonas;
      }
      var getZona = function (){
        return selectedZone;
      }
      
      var cerrarMesa = function (mesaNumber){
        //cerrar mesa
        var total;  
        total = updateWallet(mesas[mesaNumber].pedidos);
        mesas[mesaNumber].pedidos = [];
        zonas[getZona()].mesas[mesaNumber].pedidos = [];
        return total;
  		}
  		
  		function saveToLS(){
			 localStorage.setItem('zonas', JSON.stringify(zonas));
      }
      function getFromLS(){
  			var storedZonas = JSON.parse(localStorage.getItem("zonas"));
        if(storedZonas){
  			 return storedZonas[getZona()].mesas || [];
        } else {
          return mesas;
        }
  		}

      function updateWallet(pedidos){
        var total = 0;
        _.each(pedidos,function(pedido){
          total = parseInt(total) + parseInt(pedido.PrecioNeto);
        });
        return total;
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
