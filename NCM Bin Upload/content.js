//This function waits for element with given id to appear, then add clickListener
function waitForElementToDisplay(id, time) {
        
		console.log('waiting')
		if(document.getElementById(id)!=null) {
            createUploadBox()
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
		redrawDropdown()
	});
	configuration.addEventListener('mouseover', function(){
		redrawDropdown()
	});
}


//Redraw the Configuration Dropdown 
function redrawDropdown () {
	//Check if upload bin menu item already exists
	if (document.getElementById("menuitem-1099")) {
		//Make dropdown area larger so you can see the new button 
		expandDropdown()
	}
	//Create upload bin menu item
	else {
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
		
		// Event listener for opening dialog box and hidding dropdown
		var bin_box = document.getElementById('upload-bin-1099');
		var main_dropdown = document.getElementById('menu-1061');
		var dropdown_shadow = document.getElementById('ext-gen2472');
		
		upload_bin.addEventListener('click', function(){
			bin_box.style.display = "block";
			main_dropdown.style.visibility = "hidden";
			dropdown_shadow.style.visibility = "hidden";
			});
		
		//Make dropdown area larger so you can see the new button 
		//This could maybe be done by making a new event listener instead
		expandDropdown()
	}
}


//Function to expand height the configuration dropdown menu so you can see the new option
function expandDropdown () {
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

//Wait for the Configuration botton/Page to appear and then add div to the menu
waitForElementToDisplay('button-1060', 5000);


function createUploadBox() {
	//Create bin upload dialog box
	var bin_box = document.createElement('div');
	bin_box.style = 'display: none; position: fixed; width: 450px; height: 175px; right: auto; left: 735px; top: 397px; z-index: 19000;';
	bin_box.id = 'upload-bin-1099';
	bin_box.tabindex = '-1';
	bin_box.innerHTML = `
		<!-- Modal content -->
		<div class="my-x-mask"></div>
		<div class="modal-content">
		  <div class="modal-header">
			<span class="close-bin-1099" id="close-bin-1099">&times;</span>
			<h2>Upload Configuration Bin File</h2>
		  </div>
		  <div class="modal-body">
			<p>Select Bin File</p>
			<input type="file" id="bin_file" name="bin"></input>
		  </div>
		  <div class="modal-footer">
			<button class="upload-button">Upload Configuration</button>
		  </div>
		  
		  
		</div>
		
	`
	
	//Insert into page
	var body = document.getElementById('ext-gen1024');
	body.appendChild(bin_box);
	
	var span = document.getElementById("close-bin-1099");
	
	span.onclick = function() {
		bin_box.style.display = "none";
	};
};


//Todo - add a listener to the "devices" button to reload the new configuration menu

	
//Todo - Make new dropdown create...a popup screen? Where you can drop your bin

//Todo - Make function to interpret bin 

//Todo - Make function to grab the router ID you have selected

//Todo - Make function that uses your ncm keys/session cookies/whatever to send a put and upload your bin to the router ID

//Todo - Add all features to the cradlepointecm.com/groups page