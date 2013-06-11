(function ($) {
    $.widget('mobile.inlinelistview', $.mobile.listview, {
        //override the selector from listview
        options: {
            initSelector: ':jqmData(role="inlinelistview")',
        },

        _create: function () {
            //create just like a normal listview
            $.mobile.listview.prototype._create.call(this);

            //now add our enhancements after
            this.refresh();
        },

        refresh: function (create) {
            var $list = this.element;

            //call listview('refresh')
            $.mobile.listview.prototype.refresh.call(this, create);

            //set up each inline button
            $list.find(':jqmData(rel="inline")').each(function (idx, element) {
                var linkli = $(element),
                    inlineli = $(linkli.find('a').prop('hash'));

                //hide the element and set state to closed
                inlineli.hide();
                linkli.prop('data-inlinestate', 'closed');

                //on click, hide or show the div under the menu item
                linkli.on('vclick', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (linkli.prop('data-inlinestate') === 'closed') {
                        linkli.buttonMarkup({ icon: 'arrow-d' })
                            .prop('data-inlinestate', 'open');
                        inlineli.slideDown(350);
                    } else {
                        linkli.buttonMarkup({ icon: 'arrow-r' })
                            .prop('data-inlinestate', 'closed');
                        inlineli.slideUp(350);
                    }
                });
            });
        }
                
    });

    $(document).bind('pagecreate create', function (e) {
        $.mobile.inlinelistview.prototype.enhanceWithin(e.target, true);
    });

    $.mobile.inlinelistview.initSelector = ':jqmData(role="inlinelistview")';

})(jQuery);
