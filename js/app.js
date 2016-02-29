/**
 * Created by liuzhe on 2016/2/28.
 */
apiURL = 'http://localhost/api/rate'

new Vue({
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
        curfilter: ''
    },

    ready: function(){
        this.getRate();
        //console.log(this);
    },

    methods: {
        getRate: function(){
            this.$http.get(apiURL, function(rates){
                this.$set("rates", rates);

                cursArr = [];
                jQuery.each(rates, function(index, rate){
                    jQuery.each(rate.field_cur, function(index, cur){
                        if(jQuery.inArray(cur.value, cursArr) === -1){
                            cursArr.push(cur.value);
                        }
                    });
                });
                this.$set("curs", cursArr);

                //console.log(rates);
            })
        }
    }
})