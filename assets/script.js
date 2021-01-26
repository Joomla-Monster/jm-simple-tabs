jQuery(document).ready(function() {

	var module = jQuery('.jmm-simple-tabs');
	var tab = module.find('.nav-tabs a');

	module.each(function() {
		var $mod = jQuery(this);
		var align = $mod.attr('data-align');
		var breakpoint = $mod.attr('data-breakpoint');
		var nav = $mod.find('.nav-tabs');

		//responsive
		if( breakpoint ) {
			if(jQuery(window).width() <= parseInt(breakpoint)) {
				nav.addClass('nav-tabs-responsive');
				nav.parent().removeClass(align);
			}
			jQuery(window).resize(function() {
				if(jQuery(window).width() <= parseInt(breakpoint)) {
					nav.addClass('nav-tabs-responsive');
					nav.parent().removeClass(align);
				} else {
					nav.removeClass('nav-tabs-responsive');
					nav.parent().addClass(align);
				}
			});
		}
	});

	jQuery(document).on('click', '.jmm-simple-tabs .nav-tabs a', function (e) {
		e.preventDefault();
		var $this = jQuery(this);
		var parent = $this.parent();
		var siblings = parent.siblings();
		var id = $this.attr('aria-controls');
		var content = $this.closest('.jmm-simple-tabs').find('#' + id);
		$this.tab('show');
		content.attr('tabindex', '0').siblings().attr('tabindex', '-1');
		parent.removeClass('prev next');
		siblings.removeClass('prev next');
		siblings.find('a').attr('aria-selected', 'false').attr('tabindex', '-1');
		parent.prev().addClass('prev');
		parent.next().addClass('next');
		$this.attr('aria-selected', 'true').attr('tabindex', '0');
	});

	//keyboard support

	//remove fade effect on keydown
	tab.keydown(function (event) {
		jQuery(this).closest('.jmm-simple-tabs').find('.fade').removeClass('fade in').addClass('fade-off');

		//remove default action
		if (event.which == 35 || event.which == 36 || event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40 ) {
			event.preventDefault();
		}
	});

	tab.keyup(function (event) {
		var $tab = jQuery(this);
		var mod = $tab.closest('.jmm-simple-tabs');
		var orientation = mod.attr('data-orientation');
		var breakpoint = mod.attr('data-breakpoint');
		var responsive = ( jQuery(window).width() <= parseInt(breakpoint) ) ? true : false;

		if( 'vertical' === orientation && !responsive ) {
			if (event.which == 38) { // Up arrow
				if( $tab.parent().is(':first-child') ) {
					$tab.closest('.nav-tabs').find('li').last().find('a').focus().click();
				} else {
					$tab.parent().prev().find('a').focus().click();
				}
			}
	
			if (event.which == 40) { // Down arrow
				if( $tab.parent().is(':last-child') ) {
					$tab.closest('.nav-tabs').find('li').first().find('a').focus().click();
				} else {
					$tab.parent().next().find('a').focus().click();
				}
			}
		} else { //horizontal
			if (event.which == 39) { // Right arrow
				if( $tab.parent().is(':last-child') ) {
					$tab.closest('.nav-tabs').find('li').first().find('a').focus().click();
				} else {
					$tab.parent().next().find('a').focus().click();
				}
			}
			if (event.which == 37) { // Left arrow
				if( $tab.parent().is(':first-child') ) {
					$tab.closest('.nav-tabs').find('li').last().find('a').focus().click();
				} else {
					$tab.parent().prev().find('a').focus().click();
				}
			}
		}

		if (event.which == 36) { // Home key
			$tab.closest('.nav-tabs').find('li').first().find('a').focus().click();
		}

		if (event.which == 35) { // End key
			$tab.closest('.nav-tabs').find('li').last().find('a').focus().click();
		}

		//restore fade effect
		mod.find('.active.fade-off').addClass('in');
		mod.find('.fade-off').removeClass('fade-off').addClass('fade');
	});

});