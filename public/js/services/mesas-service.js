(function() {

  angular.module('bar').service('mesasService', mesasService);
  mesasService.$inject = ['$http','$q','lodash','$rootScope'];

  function mesasService($http, $q, _, $rootScope) {
    configUrl = 'http://192.168.1.11:50222';
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

  		var setPedidoMesa = function(mesaIndex, articulo){
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: configUrl +'/mobileServe.asmx/setArt'
          }).then(function (success){
            defer.resolve(success.data);
          },function (error){
            defer.reject({});
          });
        return defer.promise;
      }
      
      var setZona = function(zona){
        selectedZone = zona;
        resetMesas();
      }

      var isHappyActive = function(mesa,art){
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: configUrl +'/mobileServe.asmx/getHappyHour'
          }).then(function (success){
            defer.resolve(success.data);
          },function (error){
            defer.reject({});
          });
        return defer.promise;      
      }

      var verifyHappyHour = function(mesaIndex, articulo){
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: configUrl +'/mobileServe.asmx/GetCantidadHHFree?pMesa='+mesaIndex+'&pArt='+articulo.id_Articulo
          }).then(function (success){
            defer.resolve(success.data);
          },function (error){
            defer.reject({});
          });
        return defer.promise;
       
      }

      var getPedidosMesa = function(mesaIndex){
        return mesa[mesaIndex].pedidos;
      }

      var getMesas = function (id){
         var defer = $q.defer();
        $http({
            method: 'GET',
            url: configUrl +'/mobileServe.asmx/GetSeccionesMesas?pidSeccion='+id
          }).then(function (success){
            defer.resolve(success.data);
          },function (error){
            defer.reject({});
          });
        return defer.promise;  
      }

      var getMesa = function (id){
         var defer = $q.defer();
        $http({
            method: 'GET',
            url: configUrl +'/mobileServe.asmx/GetMesa?IdMesa='+id
          }).then(function (success){
            defer.resolve(success.data);
          },function (error){
            defer.reject({});
          });
        return defer.promise;  
      }

      var getZonas = function (){
         var defer = $q.defer();
        $http({
            method: 'GET',
            url: configUrl +'/mobileServe.asmx/GetSecciones'
          }).then(function (success){
            defer.resolve(success.data);
          },function (error){
            defer.reject({});
          });
        return defer.promise;  
      }

      var getZona = function (){
        return selectedZone;
      }
      
      var cerrarMesa = function (mesaNumber){
        var total;  
        total = updateWallet(mesas[mesaNumber].pedidos);
        mesas[mesaNumber].pedidos = [];
        zonas[getZona()].mesas[mesaNumber].pedidos = [];
        return total;
  		}
  		
  		function saveToLS(){
			 localStorage.setItem('zonas', JSON.stringify(zonas));
      }

      function updateWallet(pedidos){
        var total = 0;
        _.each(pedidos,function(pedido){
          total = parseInt(total) + parseInt(pedido.PrecioNeto);
        });
        return total;
      }

    
	   return {
        getZonas: getZonas,
        getMesas: getMesas,
        getMesa: getMesa,
        getZona: getZona,
	  		setZona: setZona,
        verifyHappyHour: verifyHappyHour,
        isHappyActive: isHappyActive,
        cerrarMesa: cerrarMesa,
    		setPedidoMesa: setPedidoMesa,
    		getPedidosMesa: getPedidosMesa
    	};
  }
})();
