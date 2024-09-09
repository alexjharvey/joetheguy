<?php
require_once("contact_form/config.php");
?>
<div class="theme-page padding-bottom-66">
	<div class="row gray full-width page-header vertical-align-table">
		<div class="row full-width padding-top-bottom-50 vertical-align-cell">
			<div class="row">
				<div class="page-header-left">
					<h1>COST CALCULATOR</h1>
				</div>
				<div class="page-header-right">
					<div class="bread-crumb-container">
						<label>You Are Here:</label>
						<ul class="bread-crumb">
							<li>
								<a title="HOME" href="?page=home">
									HOME
								</a>
							</li>
							<li class="separator">
								&#47;
							</li>
							<li>
								COST CALCULATOR
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row margin-top-70">
		<div class="column column-2-3">
			<p class="description t1 margin-top-0">Need to know how much your remodel will cost? Our easy to use renovation cost tool will help you to get project cost estimates online. Simply enter your data and the calculator will produce an approximate quote. Please provide your details and submit the form to make an appointment with us and obtain a more accurate quote.</p>
			<div class="tabs small no-scroll align-left clearfix margin-top-40">
				<ul class="tabs-navigation small gray clearfix">
					<li>
						<a href="#interior-renovation" title="Interior Renovation">
							Interior Renovation
						</a>
					</li>
					<li>
						<a href="#fence" title="Fence">
							Fence
						</a>
					</li>
					<li>
						<a href="#paver-walkway" title="Paver Walkway">
							Paver Walkway
						</a>
					</li>
				</ul>
				<div id="interior-renovation" class="margin-top-30">
					<form class="contact-form cost-calculator-container" method="post" action="contact_form/contact_form.php">
						<div class="cost-calculator-box clearfix">
							<label>Area to be Renovated in Square Feet:</label>
							<div class="cost-slider-container">
								<input id="ir-square-feet" class="cost-slider-input" name="square-feet" type="number" value="300">
								<div class="cost-slider" data-value="300" data-step="10" data-min="10" data-max="3000" data-input="ir-square-feet"></div>
							</div>
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Walls &amp; Ceilings:</label>
							<select name="walls" id="ir-walls" class="cost-dropdown">
								<option value="" selected="selected">Choose...</option>
								<option value="2">Painting</option>
								<option value="2.3">Painting + Minor Repairs</option>
								<option value="2.5">Painting + Decorative Stone</option>
								<option value="3">Tiling</option>
								<option value="5">Painting + Tiling</option>
								<option value="2">Hanging Lining Paper</option>
							</select>
							<input type="hidden" class="ir-walls" name="walls-name" value="">
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Floors:</label>
							<select name="floors" id="ir-floors" class="cost-dropdown">
								<option value="" selected="selected">Choose...</option>
								<option value="1.5">Hardwood Flooring</option>
								<option value="2.5">Bamboo Flooring</option>
								<option value="2.6">Vinyl Tile Flooring</option>
								<option value="3.25">Parquet Flooring</option>
								<option value="3.5">Wall-to-wall Carpet</option>
								<option value="12">Ceramic Tile Flooring</option>
							</select>
							<input type="hidden" class="ir-floors" name="floors-name" value="">
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Interior Doors to Replace:</label>
							<div class="cost-slider-container">
								<input id="ir-doors" class="cost-slider-input" name="doors" type="number" value="6">
								<input id="ir-doors-value" type="hidden" value="1500" data-default="1500">
								<div class="cost-slider" data-value="6" data-step="1" data-min="0" data-max="10" data-input="ir-doors" data-value-input="ir-doors-value" data-price="250"></div>
							</div>
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Windows to Replace:</label>
							<div class="cost-slider-container">
								<input id="ir-windows" class="cost-slider-input" name="windows" type="number" value="4">
								<input id="ir-windows-value" type="hidden" value="800" data-default="800">
								<div class="cost-slider" data-value="4" data-step="1" data-min="0" data-max="10" data-input="ir-windows" data-value-input="ir-windows-value" data-price="200"></div>
							</div>
						</div>
						<div class="cost-calculator-box cost-calculator-sum sl-small-wallet clearfix">
							<span class="cost-calculator-price" id="interior-renovation-cost">$2,300.00</span>
							<p class="description t1">Approximate Project Cost</p>
						</div>
						<div class="cost-calculator-box cost-calculator-contact clearfix margin-top-10">
							<div class="row">
								<label>Contact Details</label>
							</div>
							<div class="row margin-top-20">
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
									<input type="hidden" name="action" value="contact_form">
									<input type="hidden" name="type" value="Interior Renovation">
									<input type="hidden" name="total-cost" id="ir-total-cost" value="$2,300.00">
									<input type="submit" name="submit" value="SUBMIT NOW" class="more active">
								</div>
							</div>
						</div>
					</form>
				</div>
				<div id="fence" class="margin-top-30">
					<form class="contact-form cost-calculator-container" method="post" action="contact_form/contact_form.php">
						<div class="cost-calculator-box clearfix">
							<label>Length of your Fence in feet:</label>
							<input id="fe-length" class="cost-slider-input big" name="length" type="number" value="" placeholder="Fence Length">
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Height of Your Fence in Feet:</label>
							<div class="cost-slider-container">
								<input id="fe-height" class="cost-slider-input" name="height" type="number" value="5">
								<div class="cost-slider" data-value="5" data-step="1" data-min="4" data-max="8" data-input="fe-height"></div>
							</div>
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Choose Panel Style:</label>
							<select name="panel" id="fe-panel" class="cost-dropdown">
								<option value="" selected="selected">Choose...</option>
								<option value="1.4">Rounded Pale</option>
								<option value="1.8">Dip Treated</option>
								<option value="2">Pressure Treated</option>
								<option value="2.2">Closeboard</option>
								<option value="3">Closeboard Wave</option>
								<option value="5.9">Monte Carlo</option>
								<option value="6.4">Paloma Wave</option>
							</select>
							<input type="hidden" class="fe-panel" name="panel-name" value="">
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Choose Gate Type:</label>
							<select name="gate" id="fe-gate" class="cost-dropdown">
								<option value="" selected="selected">Choose...</option>
								<option value="210">Single Gate</option>
								<option value="1450">Single Gate + Single Driveway Gate</option>
								<option value="2539">Single Gate + Double Driveway Gate</option>
								<option value="3500">Single Gate + Sliding Driveway Gate</option>
								<option value="5900">Single Gate + Double Sliding Gate</option>
							</select>
							<input type="hidden" class="fe-gate" name="gate-name" value="">
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Additional Extras:</label>
							<select name="extras" id="fe-extras" class="cost-dropdown">
								<option value="" selected="selected">Choose...</option>
								<option value="4">Fence on Stone Wall</option>
								<option value="12">Fence on Stone Wall + Stone Posts</option>
							</select>
							<input type="hidden" class="fe-extras" name="extras-name" value="">
						</div>
						<div class="cost-calculator-box cost-calculator-sum sl-small-wallet clearfix">
							<span class="cost-calculator-price" id="fence-cost">$0.00</span>
							<p class="description t1">Approximate Project Cost</p>
						</div>
						<div class="cost-calculator-box cost-calculator-contact clearfix margin-top-10">
							<div class="row">
								<label>Contact Details</label>
							</div>
							<div class="row margin-top-20">
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
									<input type="hidden" name="action" value="contact_form">
									<input type="hidden" name="type" value="Fence">
									<input type="hidden" name="total-cost" id="fe-total-cost" value="$0.00">
									<input type="submit" name="submit" value="SUBMIT NOW" class="more active">
								</div>
							</div>
						</div>
					</form>
				</div>
				<div id="paver-walkway" class="margin-top-30">
					<form class="contact-form cost-calculator-container" method="post" action="contact_form/contact_form.php">
						<div class="cost-calculator-box clearfix">
							<label>Approximate Area Width in Meters:</label>
							<div class="cost-slider-container">
								<input id="pw-area-width" class="cost-slider-input" name="area-width" type="number" value="25">
								<div class="cost-slider" data-value="25" data-step="1" data-min="1" data-max="100" data-input="pw-area-width"></div>
							</div>
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Approximate Area Length in Meters:</label>
							<div class="cost-slider-container">
								<input id="pw-area-length" class="cost-slider-input" name="area-length" type="number" value="20">
								<div class="cost-slider" data-value="20" data-step="1" data-min="1" data-max="100" data-input="pw-area-length"></div>
							</div>
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Choose Block Paving:</label>
							<select name="block-paving" id="pw-block-paving" class="cost-dropdown">
								<option value="" selected="selected">Choose...</option>
								<option value="45">Lugano</option>
								<option value="48">Antique</option>
								<option value="55">Classico</option>
								<option value="59">Regatta</option>
								<option value="65">Omega</option>
								<option value="80">Natural Stone</option>
							</select>
							<input type="hidden" class="pw-block-paving" name="block-paving-name" value="">
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Surface Preparation:</label>
							<select name="surface" id="pw-surface" class="cost-dropdown">
								<option value="" selected="selected">Choose...</option>
								<option value="10">Granular Sub-Base</option>
								<option value="20">Prepared Sub-Grade + Sub-Base</option>
							</select>
							<input type="hidden" class="pw-surface" name="pw-surface-name" value="">
						</div>
						<div class="cost-calculator-box clearfix">
							<label>Stone Walling in Meters:</label>
							<div class="cost-slider-container">
								<input id="pw-stone-walling" class="cost-slider-input" name="stone-walling" type="number" value="0">
								<input id="pw-stone-walling-value" type="hidden" value="0" data-default="0">
								<div class="cost-slider" data-value="0" data-step="1" data-min="0" data-max="100" data-input="pw-stone-walling" data-value-input="pw-stone-walling-value" data-price="30"></div>
							</div>
						</div>
						<div class="cost-calculator-box cost-calculator-sum sl-small-wallet clearfix">
							<span class="cost-calculator-price" id="paver-walkway-cost">$0.00</span>
							<p class="description t1">Approximate Project Cost</p>
						</div>
						<div class="cost-calculator-box cost-calculator-contact clearfix margin-top-10">
							<div class="row">
								<label>Contact Details</label>
							</div>
							<div class="row margin-top-20">
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
									<input type="hidden" name="action" value="contact_form">
									<input type="hidden" name="type" value="Paver Walkway">
									<input type="hidden" name="total-cost" id="pw-total-cost" value="$0.00">
									<input type="submit" name="submit" value="SUBMIT NOW" class="more active">
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="column column-1-3">
			<div class="row">
				<a href="images/samples/750x500/image_03.jpg" class="prettyPhoto re-preload" title="Interior Renovation">
					<img src='images/samples/480x320/image_03.jpg' alt='img'>
				</a>
			</div>
			<div class="row margin-top-30">
				<a href="images/samples/750x500/image_01.jpg" class="prettyPhoto re-preload" title="Interior Renovation">
					<img src='images/samples/480x320/image_01.jpg' alt='img'>
				</a>
			</div>
			<div class="row margin-top-30">
				<a href="images/samples/750x500/image_05.jpg" class="prettyPhoto re-preload" title="Interior Renovation">
					<img src='images/samples/480x320/image_05.jpg' alt='img'>
				</a>
			</div>
			<div class="row page-margin-top">
				<h4 class="box-header">WHAT YOU GET</h4>
				<p class="description t1 margin-top-34">Renovate has proven results for setting exceptional standards in cost control, planning and scheduling and project safety. Our experience gives us a competitive advantage over others in our field.</p>
				<ul class="list margin-top-20">
					<li class="template-bullet">Financial Responsibility to Our Clients</li>
					<li class="template-bullet">Superior Quality and Craftsmanship</li>
					<li class="template-bullet">Quality and Value to the <a href="?page=projects">Projects We Deliver</a></li>
					<li class="template-bullet">Highest Standards in <a href="?page=cost_calculator">Cost Control</a></li>
					<li class="template-bullet">On Time and on Budget</li>
					<li class="template-bullet">Real Focus on Customer Satisfaction</li>
				</ul>
			</div>
		</div>
	</div>
</div>