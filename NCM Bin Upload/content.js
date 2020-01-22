//This function waits for element with given id to appear, then add clickListener
function waitForElementToDisplay(id, time) {
        
		console.log('waiting');
		if(document.getElementById(id)!=null) {
            console.log('found it');
			run();
            return true;
        }
        else {
            setTimeout(function() {
                waitForElementToDisplay(id, time);
            }, time);
        }
    }


// all the functions to be run when program is activated.  This is probably bad practice but its better than what I had before. 
function run() {
	addDropdownListeners();
	
	// This is here because the page has to load before the upload box can be inserted
	createUploadBox();
};


//Wait for the Configuration botton/Page to appear and then add div to the menu
waitForElementToDisplay('button-1060', 5000);

// Listen for menu clicks and respond accordingly 
function addDropdownListeners() {
	console.log('found menu');
	
	//listener for configuration button click
	var configuration = document.getElementById('button-1060');
	
	//adds custom div 
	configuration.addEventListener('click', function(){
		addUploadOption();
		expandDropdown();
		
		//adds listener to redraw dropdown on mouseover
		configuration.addEventListener('mouseover', function() {
			expandDropdown();
		});
	});
}



//Create upload_bin dropdown item
var upload_bin = document.createElement('div');
upload_bin.setAttribute('class', 'x-component x-box-item x-component-default x-menu-item');
upload_bin.id = "menuitem-binupload";
upload_bin.style = "right: auto; left: 0px; top: 224px; margin: 0px; width: 163px;";
upload_bin.innerHTML = `
	<a id="menuitem-1073-itemEl" class="x-menu-item-link" href="#" hidefocus="true" unselectable="on" data-qtip="">
		<div role="img" id="menuitem-1073-iconEl" class="x-menu-item-icon gear-icon " style="">
		</div>
		<span id="menuitem-1073-textEl" class="x-menu-item-text" unselectable="on">Upload Bin</span>
		<img id="menuitem-1073-arrowEl" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="">
	</a>
`;

//Add event listeners for highlighting dropdown on mouseover
upload_bin.addEventListener('mouseover', function(){
upload_bin.setAttribute('class', 'x-component x-box-item x-component-default x-menu-item x-menu-item-active')});

upload_bin.addEventListener('mouseout', function(){
upload_bin.setAttribute('class', 'x-component x-box-item x-component-default x-menu-item')});


//Redraw the Configuration Dropdown 
function addUploadOption () {
	//Check if upload bin menu item already exists
	if (document.getElementById("menuitem-1099")) {
		//Make dropdown area larger so you can see the new button 
		return
	}
	//Create upload bin menu item
	else {
		//Find dropdown
		dropdown = document.getElementById("menu-1061-targetEl");
		
		//Add upload bin item to dropdown
		dropdown.appendChild(upload_bin);
		
		// Event listener for opening dialog box and hidding dropdown
		var bin_box = document.getElementById('upload-bin-1099');
		var main_dropdown = document.getElementById('menu-1061');
		var dropdown_shadow = document.getElementById('ext-gen2472');
		
		upload_bin.addEventListener('click', function(){
			if (bin_box.style.display = "none") {
				bin_box.style.display = "block";
				//main_dropdown.style.visibility = "hidden";
				//dropdown_shadow.style.visibility = "hidden";
			}
			else {
				bin_box.style.display = "none"
			}
		});

	}
}



//Function to expand height of the configuration dropdown menu so you can see the new option
//There's a bug here.  The bottom colum of devices gets bigger but the dropdown doesn't...lol
function expandDropdown () {
	//Increase Length of Dropdown and Shadow, everything gets +28 height
		dropdown_parent = document.getElementById('menu-1061');
		dropdown_parent.style.cssText += "height: 252px"
		
		dropdown_body = document.getElementById('menu-1061-body');
		dropdown_body.style.cssText += "height: 252px";
		
		dropdown_inner = document.getElementById('menu-1061-innerCt');
		dropdown_inner.style.cssText += "height: 252px"
		
		// this number appears to change!
		dropdown_shadow = document.getElementById('ext-gen2475');
		dropdown_shadow.style.cssText += 'height: 248px;';
		
		// hide shadow when user mouses away from configuration 
		//dropdown.addEventListener('blur', function(){dropdown_shadow.style = 'z-index: 19000; right: auto; left: 253px; top: 183px; width: 163px; height: 248px; box-shadow: rgb(136, 136, 136) 0px 0px 6px; display: hidden;'});
}






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
			<button class="upload-button" id="upload-bin-button">Upload Configuration</button>
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
	
	//Add choose file button listener
	var chooseFileButton = document.getElementById("bin_file");
	var fReader = new FileReader();
	
	//Decodes and sends the config to your device when upload bin is pressed
	fReader.onload = function(e) {
		//decompress the bin file.  bins are compressed using zlib and the pako library inflates them to give the str result
		var decompressed = pako.inflate(e.target.result);
		var strData = String.fromCharCode.apply(null, new Uint16Array(decompressed));
		
		//decode the decompressed bin as json
		var binJson = JSON.parse(strData);
		//new var that stores the config in the format that NCM wants
		var ncmJson = {"configuration":[binJson[0]["config"],[]]};
		
		//remove the product name from the bin
		if (ncmJson["configuration"][0]["system"]["admin"]["product_name"]) {
			delete ncmJson["configuration"][0]["system"]["admin"].product_name
		}
		//remove ecmversion from the bin
		if (ncmJson["configuration"][0]["ecm"]) {
			delete ncmJson["configuration"][0].ecm
		}
		
		//print the version of the JSON thats going to be sent to NCM
		console.log(ncmJson);
		
		PostConfig(ncmJson);

	};

	
	//Read the bin when upload file is clicked
	var uploadFileButton = document.getElementById("upload-bin-button");
	uploadFileButton.addEventListener("click", function(){
		var file = chooseFileButton.files[0];
		fReader.readAsBinaryString(file);
	});
	
	//Upload configuration to selected router 
};



//Todo - add a listener to the "devices" button to reload the new configuration menu

//Todo - Make function to grab the router ID you have selected

//Todo - Make function that uses your ncm keys/session cookies/whatever to send a put and upload your bin to the router ID
//https://developer.chrome.com/extensions/xhr expalins xmlhttprequest to make requests
function PostConfig(ncmJson) {
	
	//Send request to create configuration_editor endpoint so that the configuration can be edited
	let getConfigManagerId = new Promise((resolve, reject) => {
		setTimeout( function() {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://www.cradlepointecm.com/api/v1/configuration_managers/?router.id=1617509", true);
			xhr.send();
			console.log(xhr.responseText);
			// Actions to take if the promise is resolved or rejected
			xhr.onload = () => resolve(xhr.response);
			xhr.onerror = () => reject(xhr.statusText);
		}, 500);
	});
	
	//After editor is created, parse the editor uri 
	getConfigManagerId.then((xhr_response) => {
		
		//Parse response to find the configuration_managers uri. xhr_response = the response of a succesful post to create a config_editor in createConfigEditor		
		console.log(xhr_response);
		var response = JSON.parse(xhr_response);
		var resource_uri = JSON.stringify(response["data"][0]["resource_uri"]);
		var url = "https://www.cradlepointecm.com" + resource_uri.replace(/"/g, '');
		console.log(url);
		
		//Create request to send config to router.
		var xhrPut = new XMLHttpRequest();
		xhrPut.open("PUT", url, true);
		xhrPut.setRequestHeader("Content-Type", "application/json");

		//Send data
		xhrPut.send(JSON.stringify(ncmJson));
		
		//log results
		console.log(xhrPut);
		return resource_uri
		

	})
};
	
	

//Todo - Add all features to the cradlepointecm.com/groups page