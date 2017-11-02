angular.module ('myApp.services', [])
    .service('dateService', function() {

        function doubleDigits(input) {
            if (input.length > 1 || input > 9) {
                return input;
            } else {
                return `0${input}`;
            }
        }

        function parseISOString(s) {
            var b = s.split(/\D+/);
            return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
          }

        function isSingular(num, str) {
            if (num === 1) {
                return `${num} ${str}`
            } else {
                return `${num} ${str}s`
            }
        }

        this.dateDiff = function(date) {
            let current = new Date();
            let prior = parseISOString(date);
            let diff = current-prior;
            let sec = 1000;
            let min = 60 * sec;
            let hr = 60 * min;
            let day = 24 * hr;
            let mth = 30 * day;
            let yr = (12 * mth) + (5.25 * day)

            if (diff < min) {
                return 'Just now'
            } else if (diff < hr) {
                return `${isSingular(Math.floor(diff/min), 'minute')} ago`
            }   else if (diff < day) {
                return `${isSingular(Math.floor(diff/hr), 'hour')} ago`
            } else if (diff < mth) {
                return `${isSingular(Math.floor(diff/day), 'day')} ago`
            } else if (diff < yr) {
                return `${isSingular(Math.floor(diff/mth), 'month')} ago`
            } else {
                return `${isSingular(Math.floor(diff/yr), 'year')} ago`
            }
        }

    })

