<link rel="stylesheet" type="text/css" href="style_selector/style_selector.css">
<script type="text/javascript" src="style_selector/style_selector.js"></script>
<div class="style-selector hide-on-mobile<?php echo (isset($_COOKIE['re_style_selector']) ? ' ' . $_COOKIE['re_style_selector'] : ' opened'); ?>">
	<div class="style-selector-icon">
		&nbsp;
	</div>
	<div class="style-selector-content">
		<h4>Style Selector</h4>
		<ul>
			<li class="clearfix">
				<label>Menu Type</label>
				<select name="menu_type">
					<option value="default"<?php echo (!isset($_COOKIE['re_menu_type']) || $_COOKIE['re_menu_type']=="default" ? ' selected="selected"' : ''); ?>>Default</option>
					<option value="sticky"<?php echo (isset($_COOKIE['re_menu_type']) && $_COOKIE['re_menu_type']=="sticky" ? ' selected="selected"' : ''); ?>>Sticky</option>
				</select>
			</li>
			<li class="clearfix">
				<label>Layout Style</label>
				<select name="layout_style">
					<option value="wide"<?php echo (!isset($_COOKIE['re_layout']) || $_COOKIE['re_layout']=="" ? ' selected="selected"' : ''); ?>>Wide</option>
					<option value="boxed"<?php echo ($_COOKIE['re_layout']=="boxed" ? ' selected="selected"' : ''); ?>>Boxed</option>
				</select>
			</li>
			<li class="clearfix">
				<label>Boxed Layout Pattern</label>
				<ul class="layout-chooser">
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='pattern-1' ? ' class="selected"' : ''); ?>>
						<a href="#" class="pattern-1">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='pattern-2' ? ' class="selected"' : ''); ?>>
						<a href="#" class="pattern-2">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='pattern-3' ? ' class="selected"' : ''); ?>>
						<a href="#" class="pattern-3">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='pattern-4' ? ' class="selected"' : ''); ?>>
						<a href="#" class="pattern-4">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='pattern-5' ? ' class="selected"' : ''); ?>>
						<a href="#" class="pattern-5">
							<span class="tick"></span>
						</a>
					</li>
					<li class="first<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='pattern-6' ? ' selected' : ''); ?>">
						<a href="#" class="pattern-6">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='pattern-7' ? ' class="selected"' : ''); ?>>
						<a href="#" class="pattern-7">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='pattern-8' ? ' class="selected"' : ''); ?>>
						<a href="#" class="pattern-8">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='pattern-9' ? ' class="selected"' : ''); ?>>
						<a href="#" class="pattern-9">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='pattern-10' ? ' class="selected"' : ''); ?>>
						<a href="#" class="pattern-10">
							<span class="tick"></span>
						</a>
					</li>
				</ul>
			</li>
			<li class="clearfix">
				<label>Boxed Layout Image</label>
				<ul class="layout-chooser">
					<li<?php echo (!isset($_COOKIE['re_layout_style']) || (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='image-1') ? ' class="selected"' : ''); ?>>
						<a href="#" class="image-1">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='image-2' ? ' class="selected"' : ''); ?>>
						<a href="#" class="image-2">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='image-3' ? ' class="selected"' : ''); ?>>
						<a href="#" class="image-3">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='image-4' ? ' class="selected"' : ''); ?>>
						<a href="#" class="image-4">
							<span class="tick"></span>
						</a>
					</li>
					<li<?php echo (isset($_COOKIE['re_layout_style']) && $_COOKIE['re_layout_style']=='image-5' ? ' class="selected"' : ''); ?>>
						<a href="#" class="image-5">
							<span class="tick"></span>
						</a>
					</li>
					<li class="first">
						<input type="checkbox"<?php echo ((isset($_COOKIE['re_image_overlay']) && $_COOKIE['re_image_overlay']=='overlay') || !isset($_COOKIE['re_image_overlay']) ? ' checked="checked"' : ''); ?> id="overlay"><label class="overlay-label" for="overlay">overlay</label>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</div>
