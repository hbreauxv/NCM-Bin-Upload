// Find the router/devices view parent of the config menu
async function findParent(time) {

    console.log('search for parent');

    let divTags = document.getElementsByTagName("div");
    let parent;

    // loop until parent is found
    while (true) {
        for (let i = 0; i < divTags.length; i++) {
            // check if element has an id attributes
            if (divTags[i].getAttribute("id")){

                // check for id match
                if (divTags[i].getAttribute("id").includes("ecm-core-view-devices-Routers")){

                    // make sure it isn't the "...devices-Routers-1254-body" id
                    if (divTags[i].getAttribute("id").includes("body") === false) {
                        parent = divTags[i];
                    }
                }
            }
        }
        if (parent) {
            console.log('found parent');
            return parent;
        }
        else {
            console.log('searching again');
            await new Promise((resolve, reject) => setTimeout(resolve, time));
        }
    }
}

async function findChild(text, span_class, parent, time) {

    console.log('searching for child');
    console.log(parent);

    let spanTags = document.getElementsByTagName("span");
    let child;

    while (true) {
        parent = await findParent();

        for (let i = 0; i < spanTags.length; i++) {
            // check for class match
            if (spanTags[i].getAttribute("class") === span_class) {

                // check for text match
                if (spanTags[i].textContent === text){

                    // check that it's a child of parent
                    if (parent.contains(spanTags[i])){
                        child = spanTags[i];
                    }
                }
            }
        }

        // check if config menu was found.  Exit if it was, search again if it wasn't
        if (child) {
            console.log('found config menu');
            return child
        }
        else {
            console.log('searching again');
            await new Promise((resolve, reject) => setTimeout(resolve, time));
        }
    }
}

// Find the Configuration Menu by first finding the Routers page parent and then the config menu child of it
// We have to find the parent first otherwise the Access Points configuration menu gets chosen instead
findParent(5000)
    .then(parent => findChild('Configuration', "x-btn-inner x-btn-inner-center", parent, 5000)
        .then(child => run(child))); //Pass the config menu child to our run function

// all the functions to be run when program is activated.
function run(configuration_menu) {
    console.log(configuration_menu);

    // Add the listeners to insert the new upload bin button into the configuration dropdown
    addDropdownListeners(configuration_menu);

    // Add listeners to re-add all of our custom elements when returning to the devices page
    document.getElementById('app-devices-button').addEventListener('click', function(){
        // Add a listener so that we search for the configuration menu every time the Devices page is clicked/gone to
        findParent(5000)
            .then(parent => findChild('Configuration', "x-btn-inner x-btn-inner-center", parent, 5000)
                .then(child => redraw(child)));
    });

    // Add event listeners to reload when the devices button is clicked
    createUploadBox();
}

// function to re-add the upload bin option to the configuration menu
function redraw(configuration_menu) {
    console.log("re-adding configuration menu");
    // Add the listeners to insert the new upload bin button into the configuration dropdown
    addDropdownListeners(configuration_menu);
}


// Listen for menu clicks and respond accordingly
function addDropdownListeners(configuration_menu) {

    // Calculate number of main configuration button.
    let configuration_menu_num = configuration_menu.id.split("-")[1];
    let configuration = document.getElementById('button-' + configuration_menu_num);

    // find the number of the other config menu elements.  They're always the number of the config menu + 1
    let config_child_num = configuration_menu.id;
    config_child_num = (parseInt(config_child_num.split("-")[1], 10) + 1).toString();

    //listener for configuration button click
    configuration.addEventListener('click', function(){

        //Adds the upload bin option and expands the dropdown menu so you can see it
        addUploadOption(config_child_num);
        expandDropdown(config_child_num);

        //adds listener to redraw dropdown on mouseover
        configuration_menu.addEventListener('mouseover', function() {
            expandDropdown(config_child_num);
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


// Redraw the Configuration Dropdown
function addUploadOption(config_child_num) {
    // Check if upload bin menu item already exists
    if (document.getElementById("menuitem-1099")) {
        //Make dropdown area larger so you can see the new button
        return
    }
    //Create upload bin menu item
    else {
        //Find dropdown
        let dropdown = document.getElementById("menu-"+ config_child_num +"-targetEl");

        //Add upload bin item to dropdown
        dropdown.appendChild(upload_bin);

        // Event listener for opening dialog box and hidding dropdown
        let bin_box = document.getElementById('upload-bin-1099');

        // todo - manage shadow display
        let main_dropdown = document.getElementById('menu-'+ config_child_num);
        let dropdown_shadow = document.getElementById('ext-gen2472');

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
//There's a bug here.  The bottom column of devices gets bigger but the dropdown doesn't...lol
function expandDropdown(config_child_num) {
    //Increase Length of Dropdown and Shadow, everything gets +28 height
        console.log('expanding dropdown');
        let dropdown_parent = document.getElementById('menu-' + config_child_num);
        dropdown_parent.style.cssText += "height: 252px";

        let dropdown_body = document.getElementById('menu-' + config_child_num + '-body');
        dropdown_body.style.cssText += "height: 252px";

        let dropdown_inner = document.getElementById('menu-' + config_child_num + '-innerCt');
        dropdown_inner.style.cssText += "height: 252px";

        // Todo - Create method to find the shadow for the dropdown menu and expand the size
}






function createUploadBox() {
    //Create bin upload dialog box
    let bin_box = document.createElement('div');
    bin_box.style = 'display: none; position: fixed; width: 450px; height: 175px; right: auto; left: 40%; top: 30%; z-index: 19000;';
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
    let body = document.getElementById('ext-gen1024');
    body.appendChild(bin_box);

    // Close the modal listener :)
    let closeButton = document.getElementById("close-bin-1099");
    closeButton.onclick = function () {
        bin_box.style.display = "none";
    };

    // Onclick to read the file and upload to NCM
    let uploadFileButton = document.getElementById("upload-bin-button");
    uploadFileButton.onclick = readAndUpload;
}

// Reads and uploads the bin file.  Called when the Upload File button is clicked.
function readAndUpload(){

    // we have to recheck what file is selected here!!
    let chooseFileButton = document.getElementById("bin_file");
    let file = chooseFileButton.files[0];
    console.log(file);


    // Read file
    let fReader = new FileReader();
    fReader.readAsBinaryString(file);

    // Decodes and sends the config to NCM
    fReader.onload = function(e) {
        //decompress the bin file.  bins are compressed using zlib and the pako library inflates them to give the str result
        let decompressed = pako.inflate(e.target.result);
        let strData = String.fromCharCode.apply(null, new Uint16Array(decompressed));

        //decode the decompressed bin as json
        let binJson = JSON.parse(strData);

        // new var that stores the config in the format that NCM wants
        let ncmJson = {"configuration":[binJson[0]["config"],[]]};

        //remove the product name from the bin
        if (ncmJson["configuration"][0]["system"]["admin"]["product_name"]) {
            delete ncmJson["configuration"][0]["system"]["admin"].product_name
        }

        //remove ecm version from the bin
        if (ncmJson["configuration"][0]["ecm"]) {
            delete ncmJson["configuration"][0].ecm
        }

        //print the version of the JSON thats going to be sent to NCM
        console.log(ncmJson);

        PostConfig(ncmJson);

        //tell user upload request has begun
        document.getElementById('upload-modal-body-1099').innerHTML = "<p>Bin upload in progress...</p>"

        // Disable upload button
        let uploadFileButton = document.getElementById("upload-bin-button");
        uploadFileButton.disabled = true;
    };

}


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
        let bin_box_modal = document.getElementById("upload-modal-body-1099")
        console.log(xhrPut.statusText);

        //Print the result of the upload
        if (xhrPut.statusText === "Accepted") {

            bin_box_modal.innerHTML = "<p> Upload Result: " + xhrPut.statusText + "!</p>"
        } else {
            bin_box_modal.innerHTML = `<p> Upload Result: ` + xhrPut.statusText + `</p>
            <p>Check if the bin you uploaded is for the same router and firmware as the router you uploaded it to.</p>
            <p>Response details: ` + xhrPut.responseText + `</p>
            `
        }

        // Clear the message after the user closes the modal-body
        let closeButton = document.getElementById("close-bin-1099");

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
}


//Todo - Add all features to the cradlepointecm.com/groups page