$(function() {
    FastClick.attach(document.body);
});


// Load in sound clips
var click = new Audio("sounds/click.wav");
var startClick = new Audio("sounds/start-click.wav");
var endClick = new Audio("sounds/end-click.wav");
var wobble = new Audio("sounds/wobble.wav");
var complete = new Audio("sounds/complete.wav");

var globalVibrate = true;

// After 4 seconds remove these classes so that the slider no longer wobbles
setTimeout(function(){
	$( ".swiper-container" ).removeClass("animated bounce"); 
},4000);

$(".trigger").click(function(){
	click.play();
	$(this).toggleClass("active")
	$("#tray").toggleClass("active").fadeToggle(300);
	// $("#tray p.lead, #tray p.smaller").addClass("animated bounceInDown");
});


$(".sound-toggle").click(function(){
	$(this).toggleClass("isActive");

	if ($(this).hasClass("isActive")) {
		console.log('sound on');

		click = new Audio("sounds/click.wav");
		startClick = new Audio("sounds/start-click.wav");
		endClick = new Audio("sounds/end-click.wav");
		wobble = new Audio("sounds/wobble.wav");
		complete = new Audio("sounds/complete.wav");

		click.play();

		/*
		click.volume = 1;
		startClick.volume = 1;
		endClick.volume = 1;
		wobble.volume = 1;
		complete.volume = 1;
		*/
		return [click, startClick, endClick, wobble, complete];
	}
	else {
		console.log('sound off');
		click = new Audio();
		startClick = new Audio();
		endClick = new Audio();
		wobble = new Audio();
		complete = new Audio();


		/*
		click.volume = 0;
		startClick.volume = 0;
		endClick.volume = 0;
		wobble.volume = 0;
		complete.volume = 0;
		*/

		return [click, startClick, endClick, wobble, complete];
	}
});

$(".vibration-toggle").click(function(){
	click.play();
	$(this).toggleClass("isActive");

	if ($(this).hasClass("isActive")) {
		console.log('vibrate on');
		globalVibrate = true;
		return globalVibrate;
	}
	else {
		console.log('vibrate off');
		globalVibrate = false;
		return globalVibrate;
	}
});

// Set up the Slider and then animate yolks color based on index of the slider
var mySwiper = new Swiper('.swiper-container', {
	centeredSlides: true,
	slidesPerView: 'auto',
	createPagination: true,
	initialSlide: 2,
	onSlideChangeStart: function(){
		// click.play();	
	},
	onTouchEnd: function(){
		click.play();
		var activeSlide = mySwiper.activeIndex;
				
		$("#amount").html(activeSlide);
		
		var yolkColor = $("#eggWrapper .yolkColor"),
			startButton = $(".startButton");
		
		if (activeSlide == 0) {
			yolkColor.animate({backgroundColor: "#ff6600"}, 600);
			$(".gloss").fadeTo( 600 , 0.6);
			// startButton.animate({backgroundColor: "#ff6600"}, 600);
		} 
		else if (activeSlide == 1) {
			yolkColor.animate({backgroundColor: "#ff9900"}, 600);
			$(".gloss").fadeTo( 600 , 0.35);
			// startButton.animate({backgroundColor: "#ff9900"}, 600);
		} 
		else if (activeSlide == 2) {
			yolkColor.animate({backgroundColor: "#ffcc33"}, 600);
			$(".gloss").fadeTo( 600 , 0.1);
			// startButton.animate({backgroundColor: "#ffcc33"}, 600);
		}
		else if (activeSlide == 3) {
			yolkColor.animate({backgroundColor: "#ffe092"}, 600);
			$(".gloss").fadeTo( 600 , 0.1);
			// startButton.animate({backgroundColor: "#ffe092"}, 600);
		}
		else {
			yolkColor.animate({backgroundColor: "#bfb29f"}, 600);
			$(".gloss").fadeTo( 600 , 0);
			// startButton.animate({backgroundColor: "#bfb29f"}, 600);
		};
	}
});

// Based on the sliders value, what must happen when the "Get Cracking" button is clicked	
function getCracking() {	
	startClick.play();

	console.log('globalVibrate:', globalVibrate);

	// $("#eggWrapper").fadeOut(1000);
	$("#eggWrapperActive").fadeIn(200);
	
	var value = $("#amount").html();
		
	// $(".flip-container").addClass("hover"); 
	$("#sliderWrapper").fadeOut("slow");
	$(".wrapperStart").fadeOut("slow");
	$(".wrapperCancel").fadeIn(200);
	$("#timeWrapper").fadeIn("slow");
	$("#eggWrapperActive .gloss").fadeTo(100, 0.7);

		
	if (value == 0){
		$(".hardnessWrapper").attr("id", "soft");
		$("#eggWrapperActive .yolkColor").addClass("softFade");	
		$(".time").attr("id", "countdown1");
		countdown("countdown1", 0, 3);
		$("#eggWrapperActive .gloss").fadeOut(3000);
	}
	else if (value == 1){
		$(".hardnessWrapper").attr("id", "softMedium");
		$("#eggWrapperActive .yolkColor").addClass("softMediumFade")
		$(".time").attr("id", "countdown2");
		countdown("countdown2", 6, 30);
		$("#eggWrapperActive .gloss").fadeOut(3000);
	}
	else if (value == 2){
		$(".hardnessWrapper").attr("id", "medium");
		$("#eggWrapperActive .yolkColor").addClass("mediumFade")
		$(".time").attr("id", "countdown3");
		countdown("countdown3", 7, 30);
		$("#eggWrapperActive .gloss").fadeOut(3000);
	}
	else if (value == 3){
		$(".hardnessWrapper").attr("id", "mediumHard");
		$("#eggWrapperActive .yolkColor").addClass("mediumHardFade")
		$(".time").attr("id", "countdown4");
		countdown("countdown4", 8, 30);
		$("#eggWrapperActive .gloss").fadeOut(3000);
	}
	else {
		$(".hardnessWrapper").attr("id", "hard");
		$("#eggWrapperActive .yolkColor").addClass("hardFade")
		$(".time").attr("id", "countdown5");
		countdown("countdown5", 0, 10);
		$("#eggWrapperActive .gloss").fadeOut(8000);
	};
};
		
// Start countdown timer
function countdown(elementName, minutes, seconds) {
	var element, endTime, hours, mins, msLeft, time;

	function twoDigits(n) {
		return (n <= 9 ? "0" + n : n);
	};

	function updateTimer() {
		msLeft = endTime - (+new Date);
		
		//when timer has run down to 0:00		
		if (msLeft < 1000) {
						
			element.innerHTML = "0:00";
			
			wobble.play();
			setTimeout(function(){
				$("#eggWrapperActive").addClass("shake");
			}, 500);

			setTimeout(function(){
				complete.play();	
			},1000);
			
			setTimeout(function(){
				if (globalVibrate) {
					navigator.vibrate(300);
				}
				$("#popup").fadeIn(200);
				$("#popup #inner").addClass("bounceIn");	
			},1500);
		}
		else {
			time = new Date(msLeft);
			hours = time.getUTCHours();
			mins = time.getUTCMinutes();
			element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
			clock = setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
		};
	};

	element = document.getElementById(elementName);
	endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
	updateTimer();
	
	// Cancel the active countdown
	$(".cancelButton").click(function(){
		endClick.play();
		
		$("#eggWrapperActive").fadeOut(200);
		// $("#eggWrapper").fadeIn(1000);
		
		// $(".flip-container").removeClass("hover");
		
		clearTimeout(clock); // Stop the timer in its tracks
		
		$("#timeWrapper").fadeOut("slow");
		$("#sliderWrapper").fadeIn("slow");
		$(".wrapperStart").fadeIn(100);
		$(".wrapperCancel").fadeOut("slow");
				
		setTimeout(function(){
			$("#popup").fadeOut("slow");
			$("#popup #inner").fadeOut("slow").removeClass("bounceIn");
			$(".yolkColor").removeClass("softFade softMediumFade mediumFade mediumHardFade hardFade");
		},1100);
	});
	
	// Time's Up - Now do this when clicking "Done"
	$(".closeAll").click(function(){
		endClick.play(); 
		// $(".flip-container").removeClass("hover");
		
		clearTimeout(clock); // Stop the timer in its tracks
		
		$("#eggWrapperActive").fadeOut(200);
		// $("#eggWrapper").fadeIn(1000);

		$("#timeWrapper").fadeOut("slow");
		$("#eggWrapperActive").removeClass("shake");
		$("#sliderWrapper").fadeIn("slow");
		$(".wrapperStart").fadeIn(100);
		$(".wrapperCancel").fadeOut("slow");
		$("#popup #inner").removeClass("bounceIn");
		
		
		$("#popup").fadeOut("slow");
		$("#popup #inner").fadeOut("slow").removeClass("bounceIn");
		$(".yolkColor").removeClass("softFade softMediumFade mediumFade mediumHardFade hardFade");
		
	});	
};


