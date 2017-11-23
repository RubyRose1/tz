(function ( $ ) {
    $.fn.svgTimer = function(options) {
        var opts = $.extend({}, $.fn.svgTimer.defaults, options);

        var template = "<div class='svg-hexagonal-counter'>"
            + "<div class='hint'><span class='hint-count'></span><br><span class='hint-text'></span></div>"
            + "<svg class='counter' x='0px' y='0px' viewBox='0 0 776 628'>"
            + "  <path \n" +
            "    class=\"track\"\n" +
            "    stroke-width=\"0.25\"\n" +
            "    d=\"M 5 5 m -4, 0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0\"\n" +
            "  />"
            + "</svg>"
            + "</div>";

        return this.each(function() {
            var parentEl = $(this);
            parentEl.append(template);

            var track = parentEl.find('.track');
            var fill = parentEl.find('.fill');
            var hintCount = parentEl.find('.hint-count');
            var hintText = parentEl.find('.hint-text').text(opts.hint);

            var time = opts.time;
            var initialOffset = 2160;
            var i = 1;

            if(opts.direction === 'forward'){
                hintCount.text(i);
            } else if (opts.direction === 'backwards') {
                var count = opts.time - i;
                hintCount.text(count);
            } else {
                hintCount.text(i);
            }

            track.css('stroke', opts.track);


            var interval = setInterval(function() {
                fill.css({
                    'stroke': opts.fill,
                    'stroke-dashoffset': initialOffset-(i*(initialOffset/time)) + 'px',
                    'transition': 'stroke-dashoffset 1s ' +  opts.transition
                });
                if(opts.direction === 'forward'){
                    hintCount.text(i);
                } else if (opts.direction === 'backwards') {
                    var count = opts.time - i;
                    hintCount.text(count);
                } else {
                    hintCount.text(i);
                }

                if (i == time) {
                    if(opts.repeat){
                        i = -1;
                    }
                    else clearInterval(interval);
                }
                i++;
            }, opts.interval);
        });
    };

    $.fn.svgTimer.defaults = {
        time: 60,
        interval: 1000,
        direction: 'forward',
        track: 'rgb(56, 71, 83)',
        fill: 'rgb(104, 214, 198)',
        transition: 'linear',
        hint: 'seconds',
        repeat: false
    }
}( jQuery ));
$(function () {
    $('.timer-days').svgTimer({
        direction: 'backwards',
        time: 26,
        interval: 86400000,
        hint: 'дней'
    });

    $('.timer-hours').svgTimer({
        direction: 'backwards',
        time: 16,
        interval: 3600000,
        hint: 'час'
    });

    $('.timer-minutes').svgTimer({
        direction: 'backwards',
        time: 09,
        interval: 60000,
        hint: 'мин'
    });

    $('.timer-seconds').svgTimer({
        direction: 'backwards',
        time: 58,
        interval: 1000,
        hint: 'сек',
        repeat: true
    });
});