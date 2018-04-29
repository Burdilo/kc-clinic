<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="/css/adaptive.css">
	<link rel="stylesheet" href="/css/adaptive-style.css">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	
	{literal}
	<script>
	/*
	body.scrolled { margin-right: -15px; -moz-overflow-x: hidden; -ms-overflow-x: hidden; overflow-x: hidden; }
	*/
	(function(d,w){
		var addClass = function(element, classname) {
	        var cn = element.className;
	        if(cn.indexOf(classname) != -1) {
	            return;
	        }
	        if(cn != '') {
	            classname = ' '+classname;
	        }
	        element.className = cn+classname;
	    }
		    
		w.onload = function(){
			var scrollWidth = 15, div = d.createElement('div');
			      
			div.style.overflowY = 'scroll';
			div.style.width =  '50px';
			div.style.height = '50px';
			div.style.visibility = 'hidden';

			d.body.appendChild(div);
			scrollWidth = div.offsetWidth - div.clientWidth;
			d.body.removeChild(div);

			if (d.body.scrollHeight > d.body.offsetHeight)
			{
				addClass(d.body, 'scrolled');
			}
		}
	})(document,window);
	</script>
	{/literal}


	{literal}
	<script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
	<script>
		
		if (document.body.scrollHeight - window.innerHeight == window.scrollY) {
		// мы внизу
		}

		if (document.body.scrollHeight - window.innerHeight > 0 ) {
            alert("yes");
        }
        else
        {
            alert("no");
        }


		function toggle(selector) {

			$(selector).toggle();

			if ($(selector).is(':hidden'))
			{
				padding = 15;
			}
			else
			{
				padding = 0;	
			}

			$('body').css({
				'padding-right': padding
			});
    	};

    	/*
    	var ap = (function($) {
		    var data = [];
		    var css = function(element, style) {
		        for (var prop in style) {
		            element.style[prop] = style[prop];
		        }
		    }

		    var animate = function(opts, callback) {
		        var start = new Date;
		        var timer = setInterval(function() {
		            var progress = (new Date - start) / opts.duration;
		            if (progress > 1) progress = 1;
		            opts.step(progress);
		            if (progress == 1) {
		                if (callback) {
		                    callback.apply();
		                }
		                clearInterval(timer);
		            }
		        }, opts.delay || 20);
		        
		        return {
		            stop: function() {
		                clearInterval(timer);
		            }
		        };
		    }
		    
		    var addClass = function(element, classname) {
		        var cn = element.className;
		        if(cn.indexOf(classname) != -1) {
		            return;
		        }
		        if(cn != '') {
		            classname = ' '+classname;
		        }
		        element.className = cn+classname;
		    }

		    var removeClass = function(element, classname) {
		        var cn = element.className;
		        var rxp = new RegExp("\\s?\\b"+classname+"\\b", "g");
		        cn = cn.replace(rxp, '');
		        element.className = cn;
		    }

		    return {
		    
		    }

		}(jQuery));
		*/
	
		$(document).ready(function() {
			$('body').css({
				'padding-right': 15,
				'margin-right': -15
			});
		});

		/*
		(function(d,w) {
		    var ap = {
		    	scrollWidth: 15,
		    	_scrollWidth: function()
		    	{
		    		var div = d.createElement('div');
					      
					div.style.overflowY = 'scroll';
					div.style.width =  '50px';
					div.style.height = '50px';
					div.style.visibility = 'hidden';

					d.body.appendChild(div);
					this.scrollWidth = div.offsetWidth - div.clientWidth;
					d.body.removeChild(div);
		    	},
		    	toggle: function(selector)
		    	{
		    		d.querySelector(selector).style.display = 'block';
		    	},
		    	init: function()
		    	{
		    		this._scrollWidth();

		    		d.body.style.paddingRight = this.scrollWidth;
		    		d.body.style.marginLeft = -this.scrollWidth;
		    		
		    		//alert( this.scrollWidth );
		    	}
			};

			w.onload = function() {
				ap.init();
			}

		})(document, window);
		*/
	</script>
	{/literal}

	<title>Adaptive</title>
</head>
<body class="debugx">
	
	<div class="modal">
		<h1>Lorem ipsum dolor sit amet</h1>
		<p>Veniam perferendis explicabo aliquid hic nobis, ab ipsam architecto, vel incidunt.</p>
	</div>

	<div class="section section--960">
		<div class="row">
			<div class="tile--3">.tile--3</div>
			<div class="tile--2">.tile--2</div>
		</div>

		<div class="row">
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
		</div>

		<div class="row">
			<div class="tile--2">.tile--2</div>
			<div class="tile--2">.tile--2</div>
			<div class="tile--8">.tile--8</div>
		</div>

		<div class="row">
			<div class="tile--3">.tile--3</div>
			<div class="tile--3">.tile--3</div>
			<div class="tile--3">.tile--3</div>
			<div class="tile--3">.tile--3</div>
		</div>

		<div class="row">
			<div class="tile--4">.tile--4</div>
			<div class="tile--3">.tile--3</div>
			<div class="tile--3">.tile--3</div>
			<div class="tile--2">.tile--2</div>
		</div>

		<div class="row">
			<div class="tile--5">.tile--5</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
		</div>

		<div class="row">
			<div class="tile--6">.tile--6</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
			<div class="tile--1">.tile--1</div>
		</div>

		<div class="row">
			<div class="tile--3">
				<a href="#" onclick="toggle('#toggler');" style="z-index: 10000;">toggle</a>		
			</div>
		</div>
		
		<div id="toggler" style="display: none">
			<div class="row">
				<div class="tile--7">.tile--7</div>
				<div class="tile--1">.tile--1</div>
				<div class="tile--1">.tile--1</div>
				<div class="tile--1">.tile--1</div>
				<div class="tile--1">.tile--1</div>
				<div class="tile--1">.tile--1</div>
			</div>

			<div class="row">
				<div class="tile--8">.tile--8</div>
				<div class="tile--4">.tile--4</div>
			</div>

			<div class="row">
				<div class="tile--9">.tile--9</div>
				<div class="tile--3">.tile--3</div>
			</div>

			<div class="row">
				<div class="tile--10">.tile--10</div>
				<div class="tile--2">.tile--2</div>
			</div>

			<div class="row">
				<div class="tile--11">.tile--11</div>
				<div class="tile--1">.tile--1</div>
			</div>

			<div class="row">
				<div class="tile--4">.tile--4</div>
				<div class="tile--4">.tile--4</div>
				<div class="tile--4">.tile--4</div>
			</div>

			<div class="row">
				<div class="tile--6">.tile--6</div>
				<div class="tile--6">.tile--6</div>
			</div>
		</div>
	</div>

	{*
	<h1>TYPOGRAPHY</h1>

	<div class="row">
		<div class="tile--6">
			<h1>Heading<span class="heading-font-size"> <code>&lt;h1&gt;</code> 50rem</span></h1>
			<h2>Heading<span class="heading-font-size"> <code>&lt;h2&gt;</code> 42rem</span></h2>
			<h3>Heading<span class="heading-font-size"> <code>&lt;h3&gt;</code> 36rem</span></h3>
			<h4>Heading<span class="heading-font-size"> <code>&lt;h4&gt;</code> 30rem</span></h4>
			<h5>Heading<span class="heading-font-size"> <code>&lt;h5&gt;</code> 24rem</span></h5>
			<h6>Heading<span class="heading-font-size"> <code>&lt;h6&gt;</code> 15rem</span></h6>
		</div>
	</div>

	<div class="row">
		<!-- Standard Headings -->
		<h1>Heading</h1>
		<h2>Heading</h2>
		<h3>Heading</h3>
		<h4>Heading</h4>
		<h5>Heading</h5>
		<h6>Heading</h6>

		<!-- Base type size -->
		<p>The base type is 15px over 1.6 line height (24px)</p>

		<!-- Other styled text tags -->
		<strong>Bolded</strong>
		<em>Italicized</em>
		<a>Colored</a>
		<u>Underlined</u>

		<div class="docs-example">
			<div>
				<a class="button" href="#">Anchor button</a>
				<button>Button element</button>
				<input type="submit" value="submit input">
				<input type="button" value="button input">
			</div>
			<div>
				<a class="button button-primary" href="#">Anchor button</a>
				<button class="button-primary">Button element</button>
				<input class="button-primary" type="submit" value="submit input">
				<input class="button-primary" type="button" value="button input">
			</div>
		</div>
	</div>

	<div class="row">
		<div class="tile--12">
			<form>
				<div class="row">
					<div class="six columns">
						<label for="exampleEmailInput">Your email</label>
						<input class="u-full-width" type="email" placeholder="test@mailbox.com" id="exampleEmailInput">
					</div>
					
					<div class="six columns">
						<label for="exampleRecipientInput">Reason for contacting</label>
						<select class="u-full-width" id="exampleRecipientInput">
							<option value="Option 1">Questions</option>
							<option value="Option 2">Admiration</option>
							<option value="Option 3">Can I get your number?</option>
						</select>
					</div>
				</div>

				<label for="exampleMessage">Message</label>
				<textarea class="u-full-width" placeholder="Hi Dave …" id="exampleMessage"></textarea>
				
				<label class="example-send-yourself-copy">
					<input type="checkbox">
					<span class="label-body">Send a copy to yourself</span>
				</label>
				
				<input class="button-primary" type="submit" value="Submit">
			</form>
		</div>
	</div>

	<div class="row">
		<div class="tile--6">
			<ul>
				<li>Item 1</li>
				<li>
					Item 2
					<ul>
						<li>Item 2.1</li>
						<li>Item 2.2</li>
					</ul>
				</li>
				<li>Item 3</li>
			</ul>
		</div>

		<div class="tile--6">
			<ol>
				<li>Item 1</li>
				<li>
					Item 2
					<ol>
						<li>Item 2.1</li>
						<li>Item 2.2</li>
					</ol>
				</li>
				<li>Item 3</li>
			</ol>
		</div>
	</div>
	
	<div class="row">
		<div class="tile--12">
			
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Age</th>
						<th>Sex</th>
						<th>Location</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Dave Gamache</td>
						<td>26</td>
						<td>Male</td>
						<td>San Francisco</td>
					</tr>
					<tr>
						<td>Dwayne Johnson</td>
						<td>42</td>
						<td>Male</td>
						<td>Hayward</td>
					</tr>
				</tbody>
			</table>

		</div>
	</div>

	*}

</body>
</html>