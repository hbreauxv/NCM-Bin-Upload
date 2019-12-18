//TODO - Creates div to be added to Configuration Dropdown
var div = document.createElement( 'div' );

div.id = 'menuitem-9999';
div.setAttribute('class', 'x-component x-box-item x-component-default x-menu-item');
div.style = 'right: auto; left: 0px; top: 0px; margin: 0px; width: 163px;';


//This function waits for element with given id to appear, then add clickListener
function waitForElementToDisplay(id, time) {
        
		console.log('waiting')
		if(document.getElementById(id)!=null) {
            addDropdownListeners()
            return;
        }
        else {
            setTimeout(function() {
                waitForElementToDisplay(id, time);
            }, time);
        }
    }


//This adds an on click listener to add the div to the configuration menu dropdown after it's created
function addDropdownListeners() {
	console.log('found menu');
	
	//listener for configuration button click
	var configuration = document.getElementById('button-1060');
	
	//adds custom div 
	configuration.addEventListener('click', function(){
		if (document.getElementById('menuitem-1099') == 'null') { 
			redrawDropdown()
		}
	});
	configuration.addEventListener('mouseover', function(){
		if (document.getElementById('menuitem-1099') == 'null') { 
			redrawDropdown()
		}
	});
	
	//add event listener to highlight new dropdown item
}


//Redraw the Configuration Dropdown 
function redrawDropdown () {
	//Find dropdown
	dropdown = document.getElementById("menu-1061-targetEl");
	
	//Create upload_bin dropdown item
	var upload_bin = document.createElement('div');
	upload_bin.setAttribute('class', 'x-component x-box-item x-component-default x-menu-item');
	upload_bin.id = "menuitem-1099";
	upload_bin.style = "right: auto; left: 0px; top: 224px; margin: 0px; width: 163px;";
	upload_bin.innerHTML = `
		
				<a id="menuitem-1073-itemEl" class="x-menu-item-link" href="#" hidefocus="true" unselectable="on" data-qtip="">
					<div role="img" id="menuitem-1073-iconEl" class="x-menu-item-icon gear-icon " style="">
					</div>
					<span id="menuitem-1073-textEl" class="x-menu-item-text" unselectable="on">Upload Bin</span>
					<img id="menuitem-1073-arrowEl" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="">
				</a>
			
	`;
	dropdown.appendChild(upload_bin);
	
	//Add event listeners for highlighting dropdown on mouseover
	upload_bin.addEventListener('mouseover', function(){
	upload_bin.setAttribute('class', 'x-component x-box-item x-component-default x-menu-item x-menu-item-active')});
	
	upload_bin.addEventListener('mouseout', function(){
	upload_bin.setAttribute('class', 'x-component x-box-item x-component-default x-menu-item')});
	
	//Increase Length of Dropdown and Shadow, everything gets +28 height
	dropdown_parent = document.getElementById('menu-1061');
	dropdown_parent.style = "height: 252px; right: auto; left: 253px; top: 179px; z-index: 19001; width: 163px;";
	
	dropdown_body = document.getElementById('menu-1061-body');
	dropdown_body.style = "left: 0px; top: 0px; width: 163px; height: 252px";
	
	dropdown_inner = document.getElementById('menu-1061-innerCt');
	dropdown_inner.style = "height: 252px; width: 163px;";
	
	dropdown_shadow = document.getElementById('ext-gen2472');
	dropdown_shadow.style = 'z-index: 19000; right: auto; left: 253px; top: 183px; width: 163px; height: 248px; box-shadow: rgb(136, 136, 136) 0px 0px 6px; display: block;';
	
	//hide shadow when user mouses away from configuration 
	dropdown.addEventListener('blur', function(){dropdown_shadow.style = 'z-index: 19000; right: auto; left: 253px; top: 183px; width: 163px; height: 248px; box-shadow: rgb(136, 136, 136) 0px 0px 6px; display: hidden;'});
	
}



//Wait for the Configuration botton to appear and then add div to the menu
waitForElementToDisplay('button-1060', 5000)


//Todo - Make it so new dropdown button appears

//Todo - Make new dropdown create...a popup screen? Where you can drop your bin

//Todo - Make function to interpret bin 

//Todo - Make function to grab the router ID you have selected

//Todo - Make function that uses your ncm keys/session cookies/whatever to send a put and upload your bin to the router ID

//Todo - Add all features to the cradlepointecm.com/groups page