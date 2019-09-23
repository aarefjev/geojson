document.addEventListener('DOMContentLoaded', function() {


    new Vue({
        el: '#control',
        data: {
            lasso_on: 0,
            x: 0,
            y: 0
        },
        methods: {
            say: function (message) {
                alert(message)
            },

            test01: function (){

                console.log("test 01");

                markers[0].setMap(null);
                markers[0].icon = 'http://dev.geopal/static/green.png';
                markers[0].setMap(map);



                markers[2].setMap(null);
                markers[2].icon = 'http://dev.geopal/static/blue.png';
                markers[2].setMap(map);


            },

            test02: function (){

                console.log("test 02");

            }





        }
    })



}, false);

