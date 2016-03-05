/**
 * Created by liuzhe on 2016/2/28.
 */


//apiURL = 'http://localhost/api/rate'
baseUrl = 'http://yiyii7dckrig4v.devcloud.acquia-sites.com';
apiURL = 'http://yiyii7dckrig4v.devcloud.acquia-sites.com/api/rate';
rateURL = 'http://yiyii7dckrig4v.devcloud.acquia-sites.com/api/get-rate/';

var about = Vue.extend({
    template: '#about',

    data: function () {
        return {
            message: '我在学习Vue js!'
        }
    }
});

var hello = Vue.extend({
    template: '#hello',

    data: function () {
        return {
            message: '你好'
        }
    }
});

var rate_list = Vue.extend({
    template: '#rate-list-template',

    data: function () {
        return {
            curs: '',
            rates: '',
            liveFiter: '',
            curfilter: ''
            //rate: ''
        }
    },

    ready: function () {
        this.getRate();
    },

    methods: {
        getRate: function () {

            this.$set("rate", '');

            this.$http.get(apiURL, function (rates) {
                //this.$http(req).then(function(rates){
                this.$set("rates", rates);

                cursArr = [];
                jQuery.each(rates, function (index, rate) {
                    console.log(JSON.stringify(rate));
                    jQuery.each(rate.field_cur, function (index, cur) {
                        if (jQuery.inArray(cur.value, cursArr) === -1) {
                            cursArr.push(cur.value);
                        }
                    });
                });
                this.$set("curs", cursArr);

                //console.log(rates);
            })
            //})
        }

    }
});

var single_rate = Vue.extend({
    template: '#single-rate-template',

    data: function(){
        return {
            rate: ''
        }
    },

    ready: function(){
        this.getSigalRate();
    },


    methods: {
        getSigalRate: function () {
            this.$http.get(rateURL + this.$route.params.cur, function (rate) {

                this.$set("rate", rate);
                console.log(rate);

            })
        }
    }

    //
    //data: function () {
    //    return {
    //        message: '你好'
    //    }
    //}
});

//通上面写法效果相同
//Vue.component('hello', {
//
//    template: '#hello',
//    //template: '<a>Hello</a>'
//
//    data: function () {
//        return {
//            message: '你好'
//        }
//    }
//
//});

var APP = Vue.extend({});

var router = new VueRouter();

router.map({

    '/hello': {
        component: hello
    },

    '/about': {
        component: about
    },


    'rate/:cur': {
        name: 'rate',
        component: single_rate,
    },


    '/': {
        component: rate_list
    }

});

router.start(APP, '#app');


var req = {
    method: 'get',
    url: apiURL,
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Origin': baseUrl
    }
};

/*new Vue({
    el: '#app',

    data: {
        hello: 'Hello world again!',
        names: [
            {firstname: '张', lastname: '三'},
            {firstname: '李', lastname: '四'},
            {firstname: '王', lastname: '五'},
            {firstname: '刘', lastname: '哲'}
        ],

        curs: '',
        rates: '',
        liveFiter: '',
        curfilter: '',
        rate: ''
    },

    ready: function () {
        this.getRate();
        //console.log(this);
    },

    methods: {
        getRate: function () {

            this.$set("rate", '');

            this.$http.get(apiURL, function (rates) {
                //this.$http(req).then(function(rates){
                this.$set("rates", rates);

                cursArr = [];
                jQuery.each(rates, function (index, rate) {
                    console.log(JSON.stringify(rate));
                    jQuery.each(rate.field_cur, function (index, cur) {
                        if (jQuery.inArray(cur.value, cursArr) === -1) {
                            cursArr.push(cur.value);
                        }
                    });
                });
                this.$set("curs", cursArr);

                //console.log(rates);
            })
            //})
        },


        getSigalRate: function (cur) {
            this.$http.get(rateURL + cur, function (rate) {
                //this.$http(req).then(function(rates){
                this.$set("rate", rate);
                console.log(rate);

            })
        }
    }
});
*/
