

// loadClientsTable() will load agency clients in the garage
function loadClientsTable(){

    if(mainData.agence.voiture.getclientsNbr != 0){
        let table = document.getElementById("client-table");
        table.innerHTML = "";
        // console.log(mainData.agence.voiture.list);
        mainData.agence.client.list.forEach((client, index, list) => {
            let nom = client.prenomClient+" "+client.nomClient;
            table.innerHTML = `
            <tr id="${client.codeClient}" class="client "  >
                <td class="nomClient" title="${nom}">${nom}</td>
                <td>${client.numTelClient}</td>
                <td class="idClient">${client.identiteClient}</td>
                <td>${client.nationaliteClient}</td>
                <td class="client-status" style="color: ${client.etatReservation()=="active"? "#70AD47":"tomato"}; text-align:center">${client.etatReservation()}</td>
                <td> <a onclick="openConsultation('consultation-client');loadConsClient(${client.codeClient})" class="consulterBtn"> Consulter </a> </td>
            </tr>` + table.innerHTML;
        });
        table.innerHTML = `
        <tr>
            <th>Nom</th>
            <th>N° Telephone</th>
            <th>Identité</th>
            <th>Nationalité</th>
            <th>Reservation</th>
            <th>Action</th>
        </tr>
    ` + table.innerHTML;
    }
    clientsSearchBarListner();
}


// Gestion des clients
//fonction listner de la bare de recherche
function clientsSearchBarListner(){
    let searchByName = document.getElementById("searchByName");
    let searchByRegNum = document.getElementById("searchById");
    let status = document.getElementsByName("client-status");
    let checkedStatus;
    for(let i = 0; i < status.length; i++){
        if(status[i].checked){
            checkedStatus = status[i].value;
            break;
        }
    }
    searchByName.value = (searchByName.value)? searchByName.value:null;
    searchByRegNum.value = (searchByRegNum.value)? searchByRegNum.value:null;
    checkedStatus = (checkedStatus)? checkedStatus:null;
    // Display all clients
    let clients = document.getElementsByClassName("client");
    for(let i = 0; i < clients.length; i++)
        clients[i].setAttribute("class","client");

    //Filter clients by the 3 inputs
    filterBy(searchByName.value,"nomClient","client","normal");
    filterBy(searchByRegNum.value,"idClient","client","normal");
    filterBy(checkedStatus,"client-status","client","strict");
    // Check table length
    checkClientsTableLength();
}
//Check clients table length and hidden clients number
//so if the garage is empty a message that said "Aucun client pour le moment" will apear
//and if the number of clients after filtering equals to zero a message that said
//"aucune client n'est correspondante aux valeurs entrées" will apear
function checkClientsTableLength(){
    let clients = document.getElementsByClassName("client");
    let clientsHidden = document.getElementsByClassName("client hidden");
    let table = document.getElementsByClassName("clientsTabSection")[0];
    let emptyClientsTable = document.getElementsByClassName("emptyClientsTable")[0];
    table = table.getElementsByTagName("table")[0];
    //If the table is empty, we want to display a message and hidde the table header
    console.log("debug: client number : "+clients.length+" | hidded clients : "+clientsHidden.length);
    if(clients.length - clientsHidden.length == 0 && clients.length!=0){
        table.setAttribute("class","hidden");
        emptyClientsTable.setAttribute("class","emptyClientsTable");
        emptyClientsTable.innerHTML="aucune client n'est correspondante aux valeurs entrées";
    }
    else{
        //If there are no clients
        if(clients.length == 0){
            table.setAttribute("class","hidden");
            emptyClientsTable.setAttribute("class","emptyClientsTable");
            emptyClientsTable.innerHTML="Aucun client pour le moment";
        }else{
            table.setAttribute("class","");
            emptyClientsTable.setAttribute("class","emptyClientsTable hidden");
        }
    }
}

// loadConsClient() will load Client info for consultation
function loadConsClient(codeClient){
    document.getElementById("codeClient-cons").value = codeClient;
    let client = mainData.agence.client[codeClient];
    document.getElementById("nomClient-cons").value = client.nomClient;
    document.getElementById("typeIdentiteClient-cons").value = client.typeIdentiteClient;
    document.getElementById("emailClient-cons").value = client.emailClient;
    document.getElementById("nationaliteClient-cons").value = client.nationaliteClient;
    document.getElementById("adresseClient-cons").value = client.adresseClient;
    document.getElementById("prenomClient-cons").value = client.prenomClient;
    document.getElementById("identiteClient-cons").value = client.identiteClient;
    document.getElementById("numTelClient-cons").value = client.numTelClient;
    document.getElementById("villeClient-cons").value = client.villeClient;
    document.getElementById("numPermisClient-cons").value = client.numPermisClient;
    document.getElementById("sexeClient-cons").value = client.sexeClient;
    document.getElementById("exIdentiteClient-cons").value = client.exIdentiteClient;
    document.getElementById("dateNaissanceClient-cons").value = client.dateNaissanceClient;
    document.getElementById("regionClient-cons").value = client.regionClient;
    document.getElementById("exNumPermisClient-cons").value = client.exNumPermisClient;
}


// trait and submit client data
function runClientDataSubmit(){
    let form = document.getElementsByClassName("client-cons-data")[0];
    let listInputs = form.querySelectorAll(".client-input-cons");
    let modBtn = form.querySelector(".modDon-btn");
    let respondDiv = form.querySelector(".conf-btn");
    let yesSubmit = form.querySelector("#yesEditClientData");
    let noSubmit = form.querySelector("#noEditClientData");
    let codeClient = form.querySelector("#codeClient-cons").value;
    let checkHandler = true;        
    let errorStyle = "border-left: 5px solid rgb(202, 86, 65);";
    let correctStyle = "border-left: 5px solid #45af69;";


    // Define function the will check and submt new client's data
    let submitNewData = function(){
        // check if all inputs are not empty
        listInputs.forEach( input => {
            if( input.value )
                input.style = correctStyle;
            else{
                input.style = errorStyle;
                checkHandler = false;
            }
        } );

        // Submit data if checkHandler is true
        if(checkHandler){
            
            let listData = Array();
            let url = "../agence/updateClient.php?"
            listInputs.forEach( input => {
                listData.push(input.getAttribute("name")+'='+input.value);
            })
            url += listData.join("&");
            // window.open(url, "_blank");
            runIFrame("newClientDataForm", url, 5);
            setTimeout(checkMainData,2000);
            setTimeout(function(){loadConsClient(codeClient);},4000);
            // Display the mod btn
            modBtn.setAttribute("class", "modDon-btn");
            // Hidde confirm btns
            respondDiv.setAttribute("class", "input-div conf-btn hidden");
            // Prevent access to change inputs
            listInputs.forEach( input => {
                input.disabled = true;
            } );
            // Reset inputs style
            listInputs.forEach( input => {
                input.style = null;
            } );
        }
    };

    // Hidde the mod btn
    modBtn.setAttribute("class", "modDon-btn hidden");
    // Display confirm btns
    respondDiv.setAttribute("class", "input-div conf-btn");

    // Reset form if we clicked on noSubmit & remove event listener from yesSubmit & reset inputs style
    noSubmit.addEventListener("click", function(){
        // Remove event listener from yesSubmit
        yesSubmit.removeEventListener("click", submitNewData);
        // Reset inputs style
        listInputs.forEach( input => {
            input.style = null;
        } );
        // Display the mod btn
        modBtn.setAttribute("class", "modDon-btn");
        // Hidde confirm btns
        respondDiv.setAttribute("class", "input-div conf-btn hidden");
        // Prevent access to change inputs
        listInputs.forEach( input => {
            input.disabled = true;
        } );
        // Client old data
        loadConsClient(codeClient);
    })

    yesSubmit.addEventListener("click", submitNewData);

    // Give access to change inputs
    listInputs.forEach( input => {
        input.disabled = false;
    } );
}