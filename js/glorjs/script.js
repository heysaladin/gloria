// document.write('joko');
//angular module
var tpl = angular.module('gloriacell', []);

tpl.directive('headerPart', function() {
    return {
        restirct: 'A',
        templateUrl: 'header.html'
    }
});
tpl.directive('footerPart', function() {
    return {
        restirct: 'A',
        templateUrl: 'footer.html',
        // $scope.create=function() {
        //     // body...
        // },
        controller: function() {
            // $scope.data = [{
                /*nama: 'jusuf',
                kota: 'Makassar',
                nama: 'hendrik',
                kota: 'Surabaya',
                nama: 'joko',
                kota: 'Jogja'*/
            // }];
        }
    }
});
tpl.directive('dashboardHead', function() {
    return {
        restirct: 'A',
        templateUrl: 'dashboard.html'
    }
});
tpl.controller('myCtrl', function($scope) {
    $scope.customers = customers;
    // $scope.pagesizes = [5, 10, 15, 20];
    $scope.pagesizes = [10, 20, 40, 60, 80, 100];
    $scope.pagesize = $scope.pagesizes[0];
    $scope.currentpage = 0;
    $scope.pagenumber = Math.ceil($scope.customers.length / $scope.pagesize);

    $scope.paging = function(type){
        if(type == 0 && $scope.currentpage > 0){
            --$scope.currentpage;
        }else if(type == 1 && $scope.currentpage < $scope.pagenumber-1){
            ++$scope.currentpage;
        }
    }

});

var customers = [{
    timeTrans: '0:46 - 23/08/2015',
    number: '+62 85 648 984 911',
    operator: 'IM3',
    danom: '10000',
    status: 'Berhasil'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
},  {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Ceria',
    danom: '50000',
    status: 'Pending'
},  {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
},  {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'XL',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
},  {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
},  {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
},  {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
},  {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
},  {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
},  {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:22 - 25/08/2015',
    number: '+62 85 648 984 658',
    operator: 'Simpati',
    danom: '50000',
    status: 'Pending'
}, {
    timeTrans: '0:36 - 27/08/2015',
    number: '+62 85 648 984 334',
    operator: 'Axis',
    danom: '25000',
    status: 'Berhasil'
}];
