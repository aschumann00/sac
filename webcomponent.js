(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
	<html>
		<body>
		<h2>Headline</h2>
		<br>
        <div id="headline"><b>Hello World</b></div>
		<br><br>
		</body>
	</html>
    `;

    customElements.define('com-sap-sample-helloworld1', class HelloWorld1 extends HTMLElement {


		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw();
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            if (this._firstConnection){

/* 				let inputFile =	document.createElement("input");
				inputFile.setAttribute("id","readLocalFile");
				inputFile.setAttribute("type","file");
				inputFile.setAttribute("accept","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel");
				inputFile.setAttribute("multiple", false);  //Multiple choices are allowed. Set to no here
				inputFile.click();
				
				document.body.appendChild(inputFile);
					console.log("Use ID by readLocalFile Of input dom Object to get the contents of the uploaded file json Format data return");
					document.getElementById('readLocalFile').addEventListener('change', function(e) {   //Execute after selecting file
						let  files = e.target.files;
						if(files.length == 0) return;
						let  file = files[0];
						let  reader = new FileReader();
						reader.readAsBinaryString(file);
						reader.onload = function(e) {   //Handle the load event. Triggered when the read operation completes.
							let  data = e.target.result;
							let  workbook = XLSX.read(data, {type: 'binary'}); //XLSX: / xlsx.core.min.js read excel through XLSX.read(data, {type: type}) method
							console.log(workbook ); 
							let  sheetNames = workbook.SheetNames; // Sheet name collection
							let  worksheet = workbook.Sheets[sheetNames[0]]; // Here we only read the first sheet 
							let  json = XLSX.utils.sheet_to_json(worksheet); //  Read the workbook, you can write your own methods to output the table. Here it is recommended to use XLSX.utils. Tool class to output the data. Here you can output the data in json format and other format codes
							if(typeof(callback) == "function") callback(json);   //Callback 
							 document.getElementById('readLocalFile').value = null; //Clear after reading
						};
					}); */

                MessageToast.show("Maximum records are 2000.");
				console.log(oChangedProperties['value']);
				alert("Alert");
                this.redraw();
            }
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
            redraw()
        }
        */

        redraw(){
        }
    });
})();
