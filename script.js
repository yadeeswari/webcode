// Add dropdown
let dropdown = document.createElement("select");
    dropdown.setAttribute("id", "mySelect");
    document.body.appendChild(dropdown);


    //Add GO Button
    let btnGo = document.createElement("button");
    btnGo.setAttribute("id", "btnGo");
    let text = document.createTextNode("Go");

    // appending text to button
    btnGo.appendChild(text);
    document.body.append(btnGo);


    //Add on click function
    document.getElementById("btnGo").onclick = function (oEvent) {
      //alert(document.getElementById("mySelect").value);
      
      //get table id
      let table = document.getElementById("mytable1");

      //remove table before every search
      table.remove();

      //call API  and get data from company name
      fetchDataAndCreateTable1();
    };


    //creare table container
    let tableContainer = document.createElement("TABLE");
    tableContainer.setAttribute("id", "myTable");
    document.body.appendChild(tableContainer);
    let data;



    async function getResponsebyname(name) {
     // alert(name);
      const response = await fetch(
        "https://api.openbrewerydb.org/v1/breweries?by_name=" + name,
        {
          method: "GET",
        }
      );
      data = await response.json(); // Extracting data as a JSON Object from the response
      return data;
    }

    
    //let tableContainer = document.getElementById('table-container');
    async function getResponse() {
      const response = await fetch(
        "https://api.openbrewerydb.org/v1/breweries",
        {
          method: "GET",
        }
      );
      data = await response.json(); // Extracting data as a JSON Object from the response
    
    }

    // function to create the table

    let createTable = (breweriesData, vTable) => {
          
      let table = document.createElement("table");
      
      table.setAttribute("id","mytable1")
      document.body.appendChild(table);
      table.classList.add("breweries-table");

      // create the table header row
      let headerRow = document.createElement("tr");
      let headers = ["Name", "Type", "Address", "website", "phone"];

      //create the table header cells
      headers.forEach((headerText) => {
        let headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
      });

      // Append the header row to the table
      table.appendChild(headerRow);

      
        data.forEach((brewery) => {
          let opt = document.createElement("option");
          opt.text = brewery.name;
          opt.value = brewery.name;
          dropdown.options.add(opt);
        });
     
      //iterate the breweries data
    
        //alert(document.getElementById("mytable1"))
        table = document.getElementById("mytable1");
        data.forEach((brewery) => {
        
          //create a new row for each brewery
          let row = document.createElement("tr");

          //create the cells for each property of the brewery

          let nameCell = document.createElement("td");
          debugger;
          nameCell.textContent = brewery.name;
          row.appendChild(nameCell);

          let typeCell = document.createElement("td");
          typeCell.textContent = brewery.brewery_type;
          row.appendChild(typeCell);

          let addressCell = document.createElement("td");
          addressCell.textContent = `${brewery.street},${brewery.city},${brewery.state},${brewery.postal_code}`;
          row.appendChild(addressCell);

          let websiteCell = document.createElement("td");
          let websiteLink = document.createElement("a");
          websiteLink.href = brewery.website_url;
          websiteLink.textContent = brewery.website_url;
          websiteCell.appendChild(websiteLink);
          row.appendChild(websiteCell);

          let phoneCell = document.createElement("td");
          phoneCell.textContent = brewery.phone;
          row.appendChild(phoneCell);

          //append the table to row
          table.appendChild(row);
          
        });
      
      tableContainer.appendChild(table);
    };

    let fetchDataAndCreateTable = async () => {
      try {
        debugger;
        let breweriesData = await getResponse();
        createTable(breweriesData);
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    // call the function to fetch data
    fetchDataAndCreateTable();

    let fetchDataAndCreateTable1 = async () => {
      try {
        //get the company name from dropdown and pass it to the function
        let breweriesData = await getResponsebyname(document.getElementById("mySelect").value );
        //pass the data to table
        createTable(breweriesData, "table");
      } catch (error) {
        console.log("Error:", error.message);
      }
    };