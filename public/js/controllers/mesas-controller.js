(function(app) {
	app.controller('MesasController', ['$scope','$state', 'menuService', 'lodash','mesasService','$stateParams', '$mdDialog','userService', function($scope, $state, menuService, _, mesasService, $stateParams, $mdDialog, userService) {
		if(!userService.getLoggedUser()){
			$state.go('login');
		}
		var zona = mesasService.getZona();
		var cachedArticles,longPress;

		$scope.familias = [];
		$scope.articulos = [];
		$scope.rubros = [];
		$scope.mesaId = $stateParams.id;
		$scope.mesas = mesasService.getMesas();
		$scope.buscando = false;
		$scope.familyId;
		$scope.currentPedido = [];

		$scope.verMesa = function(index){
			$state.go('detail',{id :index});
		}
		
		$scope.showFamilias = function(){
			$scope.articulosStage = false;
			$scope.rubrosStage = false;

			menuService.getFamilias().then(function(resp){
				$scope.familias = resp;
			});
			$scope.familiaStage = true;
		}
		$scope.showRubros = function(familia){
			$scope.familyId = familia;
			$scope.familiaStage = false;
			var filteredData;
			menuService.getRubros().then(function(resp){
				filteredData = _.filter(resp, function(obj){return obj.idFamilia == familia});
				$scope.rubros = filteredData;
			});

			$scope.rubrosStage = true;
		}
		$scope.showArticulos = function(rubro,idFlia){
			$scope.rubrosStage = false;
			var filteredArticles;
			menuService.getArticulos().then(function(resp){
				filteredArticles = _.filter(resp, function(obj){
					return obj.idRubro == rubro
				});
				$scope.articulos = filteredArticles;
			});
			$scope.articulosStage = true;
		}

		$scope.addToList = function(articulo, count){
			if(!longPress){
				articulo.familyId = $scope.familyId ? $scope.familyId : 1;
				if(count){
					for(var x = 0; x < count; x++){
						$scope.currentPedido.push(articulo); 
					}
				}else{
					$scope.currentPedido.push(articulo); 
				}
				$scope.articulosStage = false;
				$("#search").val('');
				if($scope.buscando){
					$scope.enableBuscar();
				}
			}
		}
		$scope.howMany = function(articulo,ev){
			longPress = true;
			$scope.cuantos = 0;
			var cancel = function(){
				$mdDialog.cancel();
			}

			var answer = function(answer) {
      			$mdDialog.hide(answer);
    		};

			$mdDialog.show({
				locals: {"articulo": articulo, 
					cuantos:$scope.cuantos, 
					cancel:cancel,
					answer:answer
				},
				controller: angular.noop,
				controllerAs: 'ctrl',
				templateUrl: '/partials/cuantos.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				bindToController: true,
				clickOutsideToClose:true,
				fullscreen: true 
				}).then(function(count) {
					longPress = false;
					if(count){
						$scope.addToList(articulo, count);
					};
				}, function() {
					longPress = false;
				});
		}
		$scope.submit = function(ev){
			var confirm = $mdDialog.confirm()
	          .title('Desea enviar pedido?')
	          .textContent('')
	          .ariaLabel('Lucky day')
	          .targetEvent(ev)
	          .ok('Enviar')
	          .cancel('Cancelar');

	    $mdDialog.show(confirm).then(function() {
	    	mesasService.setPedidoMesa($scope.mesaId, $scope.currentPedido);
			$state.go('mesas',{'zona':mesasService.getZona()});
	    }, function() {
	      	return false;
	    });
		}

		$scope.remove = function(ind){
			$scope.mesas[$scope.mesaId].pedidos.splice( ind, 1 ); 
		}
		$scope.enableBuscar = function(){
			if($scope.buscando){
				$scope.buscando = false;	
				return false;
			}
			$scope.buscando = true;
			menuService.getArticulos().then(function(resp){
				cachedArticles = resp;
			});
		}
		$scope.buscar = function(event, value){
			$scope.articulosStage = true;
			var filteredArticles;
			$scope.articulos = [];
			if(value && value.length > 2){
				filteredArticles = _.filter(cachedArticles, function(obj){
					return obj.nombreArt.toLowerCase().indexOf(value.toLowerCase()) > -1;
				});
				$scope.articulos = filteredArticles;
			} else {
				$scope.articulos ='';
				return false;
			}
		}

		$scope.confirmEliminar = function(index,name,ev) {
	    // Appending dialog to document.body to cover sidenav in docs app
	    var confirm = $mdDialog.confirm()
	          .title('Desea eliminar este pedido?')
	          .textContent('Si elimina el articulo "'+name+'", no será tenido en cuenta a la hora de enviar el pedido.')
	          .targetEvent(ev)
	          .ok('ELIMINAR')
	          .cancel('Cancelar');

	    $mdDialog.show(confirm).then(function() {
	    	$scope.remove(index);
	    }, function() {
	      	return false;
	    });
	  };

	  $scope.cerrarMesa = function(index,ev) {
	    
	    var confirm = $mdDialog.confirm()
	          .title('Desea cerrar la mesa?')
	          .textContent('')
	          .ariaLabel('Lucky day')
	          .targetEvent(ev)
	          .ok('CERRAR')
	          .cancel('Cancelar');

	    $mdDialog.show(confirm).then(function() {
	      $scope.$parent.totalBilletera = mesasService.cerrarMesa(index);
	      $scope.mesas[index].pedidos = [];
	    }, function() {
	      return false;
	    });
	  };

	  function DialogController($scope, $mdDialog) {
	  	$scope.mesaId = $stateParams.id;
		$scope.mesas = mesasService.getMesas();

		$scope.cancel = function() {
			$mdDialog.hide();
	    };
	  }

	  $scope.verPedidos = function(index,ev) {
		$mdDialog.show({
		locals: {parent: $scope, cancel:function(){ $mdDialog.hide();},mesaId:index},
		controller: angular.noop,
		controllerAs: 'ctrl',
		templateUrl: '/partials/pedidos-dialog.tmpl.html',
		parent: angular.element(document.body),
		targetEvent: ev,
		bindToController: true,
		clickOutsideToClose:true,
		fullscreen: true 
		}).then(function(answer) {
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});
	  };

	 $scope.volver = function(){
	 	window.history.back();
	 } 
	}]);
})(bar);