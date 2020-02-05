// Find the router/devices view parent of the config menu
async function findParent(time) {

	console.log('search for parent');
	
	var divTags = document.getElementsByTagName("div");
	var parent;
	
	// loop until parent is found
	while (true) {
		for (var i = 0; i < divTags.length; i++) {
			// check if element has an id attributes
			if (divTags[i].getAttribute("id")){
				
				// check for id match
				if (divTags[i].getAttribute("id").includes("ecm-core-view-devices-Routers")){
					
					// make sure it isn't the "...devices-Routers-1254-body" id
					if (divTags[i].getAttribute("id").includes("body") == false) {
						parent = divTags[i];
					}
				}
			}
		};
		if (parent) {
			console.log('found parent');
			return parent;
		}
		else {
			console.log('searching again');
			await new Promise((resolve, reject) => setTimeout(resolve, time));
		};
	}
}

async function findChild(text, span_class, parent, time) {

	console.log('searching for child');
	console.log(parent);
	
	var spanTags = document.getElementsByTagName("span");
	var child;
	
	while (true) {
		var parent = await findParent();
		
		for (var i = 0; i < spanTags.length; i++) {
			// check for class match
			if (spanTags[i].getAttribute("class") == span_class) {
				// check for text match
				if (spanTags[i].textContent == text){
					// check that it's a child of parent
					console.log(spanTags[i])
					if (parent.contains(spanTags[i])){
						child = spanTags[i];
					}
				}
			}
		}
	
		// check if config menu was found.  Exit if it was, search again if it wasn't
		if (child) {
			console.log('found config menu');
			console.log(child);
			return child
		}
		else {
			console.log('searching again');
			await new Promise((resolve, reject) => setTimeout(resolve, time));
		};
	};
}


findParent(5000).then(parent => findChild('Configuration', "x-btn-inner x-btn-inner-center", parent, 5000));


// all the functions to be run when program is activated.  This is probably bad practice but its better than what I had before. 
function run(configuration_menu) {
	addDropdownListeners(configuration_menu);
	
	document.getElementById('app-devices-button').addEventListener('click', function(){
		searchForConfigurationButton('Configuration', 5000);
	});
	
	// recursively add event listeners to reload when the devices button is clicked
	createUploadBox();
};



//Wait for the Devices button to display and add listeners to re-add the upload bin button to the page. od 'app-devices-button'


// Listen for menu clicks and respond accordingly 
function addDropdownListeners(configuration_menu) {
	//listener for configuration button click
	configuration_menu.addEventListener('click', function(){
		// BUG / TODO both of these functions need new ways to find the config menu elements they need 
		addUploadOption();
		expandDropdown();
		
		//adds listener to redraw dropdown on mouseover
		configuration_menu.addEventListener('mouseover', function() {
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
		  <div class="modal-body" id="upload-modal-body-1099">
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
	
	var closeButton = document.getElementById("close-bin-1099");
	
	closeButton.onclick = function() {
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
		//tell user request has been sent
		document.getElementById('upload-modal-body-1099').innerHTML = "<p>Bin upload in progress...</p>"
		
		uploadFileButton.disabled = true;
		
		var file = chooseFileButton.files[0];
		fReader.readAsBinaryString(file);
	});
	

};







//This function sends your configuration to a router
function PostConfig(ncmJson) {
	
	//find selected router
	var selected_router = document.getElementsByClassName("x-grid-row-selected");
	console.log(selected_router);
	selected_router = selected_router[0]["dataset"]["recordid"];
	
	//Send request to create configuration_editor endpoint so that the configuration can be edited
	let getConfigManagerId = new Promise((resolve, reject) => {
		setTimeout( function() {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "https://www.cradlepointecm.com/api/v1/configuration_managers/?router.id=" + selected_router, true);
			xhr.send();
			console.log(xhr.responseText);
			// Actions to take if the promise is resolved or rejected
			xhr.onload = () => resolve(xhr.response);
			xhr.onerror = () => reject(xhr.statusText);
		}, 500);
	});
	
	//After editor is created, parse the editor uri 
	getConfigManagerId.then( (xhr_response) => {
		
		//Parse response to find the configuration_managers uri. xhr_response = the response of a succesful post to create a config_editor in createConfigEditor		
		console.log(xhr_response);
		var response = JSON.parse(xhr_response);
		var resource_uri = JSON.stringify(response["data"][0]["resource_uri"]);
		var url = "https://www.cradlepointecm.com" + resource_uri.replace(/"/g, '');
		console.log(url);
		
		//Create request to send config to router.
		return new Promise((resolve, reject) => {
			setTimeout( function() {
				var xhrPut = new XMLHttpRequest();
				xhrPut.open("PUT", url, true);
				xhrPut.setRequestHeader("Content-Type", "application/json");

				//Send data
				xhrPut.send(JSON.stringify(ncmJson));
				
				// Return result to next .then function 
				xhrPut.onload = () => resolve(xhrPut);
				xhrPut.onerror = () => reject(xhrPut);
				
				//log results
				console.log(xhrPut);
			}, 500)
		});
		
	}).then( function(xhrPut) {
		
		//get bin_box so we can fill it with the result of the put
		var bin_box_modal = document.getElementById("upload-modal-body-1099")
		console.log(xhrPut.statusText);

		//Print the result of the upload
		if (xhrPut.statusText === "Accepted") {
			
			bin_box_modal.innerHTML = "<p> Upload Result: " + xhrPut.statusText + "!</p>"
		} else {
			bin_box_modal.innerHTML = `<p> Upload Result: ` + xhrPut.statusText + `</p>
			<p>Check if the bin you upload is for the same router and firmware as the router you uploaded it to.</p>
			<p>Response details: ` + xhrPut.responseText + `</p>
			`
		}
		
		// Clear the message after the user closes the modal-body
		var closeButton = document.getElementById("close-bin-1099");
		
		function resetText() {
			// reset inner text
			bin_box_modal.innerHTML = `<p>Select Bin File</p>
			<input type="file" id="bin_file" name="bin"></input>`
			
			//make upload bin button clickable again
			document.getElementById("upload-bin-button").disabled = false;
			
			closeButton.removeEventListener("click", resetText)
		}
		
		closeButton.addEventListener("click", resetText);
	});
};


//Todo - add a listener to the "devices" button to reload the new configuration menu	
	

//Todo - Add all features to the cradlepointecm.com/groups page