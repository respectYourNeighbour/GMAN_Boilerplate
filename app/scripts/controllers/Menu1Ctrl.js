angular.module('Menu1Ctrl', []).controller('Menu1Controller', function($scope, HomeService, $filter, $log) {

    console.log('Menu 1  Controller');

    //Necessary for clearing the modal form;
    $scope.cuvant = '';
    $scope.entryCuvant = '';
    $scope.entryDefinitie = '';
    $scope.entryId = '';

    //Categories to chose from in the create new entry modal;
    $scope.categories = [
        {name: "EN-ORD"},
        {name: "ETT-ORD"},
        {name: "VERB"},
        {name: "VERB-PAST-FORM"},
        {name: "RESOR"},
        {name: "MAT"},
        {name: "MEDICIN"}
    ];


    //select a default value for the select in the create new entry modal;
    $scope.category = $scope.categories[0];

    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the entries
    HomeService.get()
        .success(function(data) {
           // $scope.definitii = data;
            

            $scope.en_ord = $filter('filter')(data, { category: "EN-ORD" });
            $scope.ett_ord = $filter('filter')(data, { category: "ETT-ORD" });
            $scope.verb = $filter('filter')(data, { category: "VERB" });
            $scope.verb_past_form = $filter('filter')(data, { category: "VERB-PAST-FORM" });
            $scope.resor = $filter('filter')(data, { category: "RESOR" });
            $scope.mat = $filter('filter')(data, { category: "MAT" });
            $scope.medicin = $filter('filter')(data, { category: "MEDICIN" });

            console.dir($scope.en_ord);
    });


    $scope.formSubmit = function() {
        //console.log('category: '+$scope.category.name);

        $('#createModal').modal('hide');

        //this is the document that get's sent to the database;
        $scope.doc = {
            'type':'dictionar', 
            'word' : '' + $scope.cuvant, 
            'definition' : '' + $scope.definitia,
            'category' : '' + $scope.category.name
        };

    	HomeService.create($scope.doc).success(function(data) {
    		console.log("this is the new entry returned from the API to the Service and from the Service to the Controller: ",data[0].categoria);
            if(data[0].categoria == $scope.categories[0].name){
                $scope.en_ord.push(data[0]);
            }
            if(data[0].categoria == $scope.categories[1].name){
                $scope.ett_ord.push(data[0]);
            }
            if(data[0].categoria == $scope.categories[2].name){
                console.log('verb')
                $scope.verb.push(data[0]);
            }
            if(data[0].categoria == $scope.categories[3].name){
                $scope.verb_past_form.push(data[0]);
            }
            if(data[0].categoria == $scope.categories[4].name){
                $scope.resor.push(data[0]);
            }
            if(data[0].categoria == $scope.categories[5].name){
                $scope.mat.push(data[0]);
            }
            if(data[0].categoria == $scope.categories[6].name){
                $scope.medicin.push(data[0]);
            }
            
            
    	});
    }

    $scope.clickCreate = function() {
        $scope.cuvant = '';
        $scope.definitia = '';
        $scope.category = $scope.categories[0];
    }

    $scope.clickEdit = function(definitie, $event) {
        console.log("definitie "+definitie.categoria);

        $scope.entryId = definitie._id;

        //get the index position in the array by the category name of the definition selected;
        pos = $scope.categories.map(function(e) { return e.name; }).indexOf(definitie.categoria);
        $scope.category = $scope.categories[pos];

        //put the values of the clicked definition in the input fields for it to be modified;
        $scope.cuvant = definitie.cuvant;
        $scope.definitia = definitie.definitia;
    }

    $scope.formEditSubmit = function() {
        $('#editModal').modal('hide');

        console.log('scope.cuvant: '+$scope.cuvant);

        $scope.doc = {
            'tip':'dictionar', 
            'cuvant' : '' + $scope.cuvant, 
            'definitia' : '' + $scope.definitia, 
            'data':'Aprilie',
            'categoria' : '' + $scope.category.name
        };
        var obj = {entryId : $scope.entryId, doc : $scope.doc}

        HomeService.update(obj).success(function() {
            console.dir("se reapeleaza dupa ce fac edit");
            HomeService.get()
                .success(function(data) {
                    $scope.en_ord = $filter('filter')(data, { categoria: "EN-ORD" });
                    $scope.ett_ord = $filter('filter')(data, { categoria: "ETT-ORD" });
                    $scope.verb = $filter('filter')(data, { categoria: "VERB" });
                    $scope.verb_past_form = $filter('filter')(data, { categoria: "VERB-PAST-FORM" });
                    $scope.resor = $filter('filter')(data, { categoria: "RESOR" });
                    $scope.mat = $filter('filter')(data, { categoria: "MAT" });
                    $scope.medicin = $filter('filter')(data, { categoria: "MEDICIN" });
            });
        });

        //this is the document that get's sent to the database;
        
    }


    //this var is for memorizing the entry that needs to be deleted;
    var holdDefinitie;
    $scope.clickDelete = function(definitie, $event) {
        holdDefinitie = definitie;
        $scope.entryCuvant  = definitie.cuvant;
        $scope.entryDefinitie = definitie.definitia;
        $('#modalAlert').modal('show');
    }

    $scope.confirmDeletion = function() {

        HomeService.del(holdDefinitie._id).success(function() {
            console.dir("se reapeleaza dupa ce fac delete");

            //After deleting something bring again the refreshed entries from db to reflect the truth in each category;
            HomeService.get()
                .success(function(data) {
                    $scope.en_ord = $filter('filter')(data, { categoria: "EN-ORD" });
                    $scope.ett_ord = $filter('filter')(data, { categoria: "ETT-ORD" });
                    $scope.verb = $filter('filter')(data, { categoria: "VERB" });
                    $scope.verb_past_form = $filter('filter')(data, { categoria: "VERB-PAST-FORM" });
                    $scope.resor = $filter('filter')(data, { categoria: "RESOR" });
                    $scope.mat = $filter('filter')(data, { categoria: "MAT" });
                    $scope.medicin = $filter('filter')(data, { categoria: "MEDICIN" });
            });
        });

        $('#modalAlert').modal('hide');
    }


    $('#createModal').on('shown.bs.modal', function() {
        $(this).find('input:first').focus();
    });


    $('#exampleModal').on('hide.bs.modal', function () {     
        //clear modal input fields;   
        $('#recipient-name').val('');
        $('#message-text').val('');
    });

    //Pagination definition.
    $scope.currentPage = 1;
    $scope.pageSize = 5;

    $scope.pageChangeHandler = function(num) {
        console.log('meals page changed to ' + num);
    };

});






