//TODO - Creates div to be added to Configuration Dropdown
var div = document.createElement( 'div' );

div.id = 'menuitem-9999';
div.setAttribute('class', 'x-component x-box-item x-component-default x-menu-item');
div.style = 'right: auto; left: 0px; top: 0px; margin: 0px; width: 163px;';


//This function waits for element with given id to appear, then runs the code in the if block
function waitForElementToDisplay(id, time) {
        
		console.log('waiting')
		if(document.getElementById(id)!=null) {
            addListener()
            return;
        }
        else {
            setTimeout(function() {
                waitForElementToDisplay(id, time);
            }, time);
        }
    }


//This adds an on click listener to add the div to the configuration menu dropdown after it's created
function addListener() {
	console.log('found menu');
	
	//listener for configuration button click
	var configuration = document.getElementById('button-1060');
	
	//adds custom div 
	configuration.addEventListener('click', function(){
		redrawDropdown()
	});
}


//Redraw the Configuration Dropdown 
function redrawDropdown () {
	//Add new Div
	dropdown = document.getElementById("menu-1061-targetEl");
		dropdown.innerHTML += `
			<div class="x-component x-box-item x-component-default x-menu-item" id="menuitem-1099" style="right: auto; left: 0px; top: 224px; margin: 0px; width: 163px;">
				<a id="menuitem-1073-itemEl" class="x-menu-item-link" href="#" hidefocus="true" unselectable="on" data-qtip="">
					<div role="img" id="menuitem-1073-iconEl" class="x-menu-item-icon gear-icon " style="">
					</div>
					<span id="menuitem-1073-textEl" class="x-menu-item-text" unselectable="on">Test?</span>
					<img id="menuitem-1073-arrowEl" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="">
				</a>
			</div>
		`
}



//Wait for the Configuration botton to appear and then add div to the menu
waitForElementToDisplay('button-1060', 5000)


//Todo - Make it so new dropdown button appears

//Todo - Make new dropdown create...a popup screen? Where you can drop your bin

//Todo - Make function to interpret bin 

//Todo - Make function to grab the router ID you have selected

//Todo - Make function that uses your ncm keys/session cookies/whatever to send a put and upload your bin to the router ID

//Todo - Add all features to the cradlepointecm.com/groups page