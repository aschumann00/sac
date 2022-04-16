// MessageToast
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

				var fU = this.getView().byId("idfileUploader");
				var domRef = fU.getFocusDomRef();
				var file = domRef.files[0];
				var this_ = this;

				var oModel = new JSONModel();
				oModel.setData({
				result_final: null
				});

				var reader = new FileReader();
				reader.onload = async function(e) {
				var strCSV = e.target.result;

				var workbook = XLSX.read(strCSV, {
				  type: 'binary'
				});

				var result_final = [];
				var result = [];
				var correctsheet = false;

				workbook.SheetNames.forEach(function(sheetName) {
				  if (sheetName === "Sheet1") {
					correctsheet = true;
					var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
					if (csv.length) {
					  result.push(csv);
					}
					result = result.join("[$@~!~@$]")
				  }
				});

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
