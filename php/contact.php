<?php
require_once("contact_form/config.php");
?>
<div class="theme-page padding-bottom-66">
	<div class="clearfix">
		<div class="row full-width">
			<div class="contact-map" id="map" data-scroll-wheel="0" data-draggable="0"></div>
		</div>
		<div class="row page-margin-top">
			<div class="column column-1-3">
				<ul class="features-list">
					<li class="sl-small-location">
						<p>272 Linden Avenue<br>Winter Park, FL 32789</p>
					</li>
				</ul>
			</div>
			<div class="column column-1-3">
				<ul class="features-list">
					<li class="sl-small-phone">
						<p>Phone:<br>+149 75 23 222 35</p>
					</li>
				</ul>
			</div>
			<div class="column column-1-3">
				<ul class="features-list">
					<li class="sl-small-clock">
						<p>Monday - Friday: 08.00 - 17.00<br>Saturday: 09.00 - 12.00</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="row page-margin-top">
			<form class="contact-form" id="contact-form" method="post" action="contact_form/contact_form.php">
				<div class="row">
					<fieldset class="column column-1-2">
						<input class="text-input" name="name" type="text" value="<?php echo _def_name; ?>" placeholder="<?php echo _def_name; ?>">
						<input class="text-input" name="email" type="text" value="<?php echo _def_email; ?>" placeholder="<?php echo _def_email; ?>">
						<input class="text-input" name="phone" type="text" value="<?php echo _def_phone; ?>" placeholder="<?php echo _def_phone; ?>">
					</fieldset>
					<fieldset class="column column-1-2">
						<textarea name="message" placeholder="<?php echo _def_message; ?>"><?php echo _def_message; ?></textarea>
					</fieldset>
				</div>
				<div class="row margin-top-30">
					<div class="column column-1-2">
						<p class="description t1">We will contact you within one business day.</p>
					</div>
					<div class="column column-1-2 align-right">
						<input type="hidden" name="action" value="contact_form" />
						<input type="submit" name="submit" value="SEND MESSAGE" class="more active">
					</div>
				</div>
			</form>
		</div>
	</div>
</div>