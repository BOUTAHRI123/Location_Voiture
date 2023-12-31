<?php
    session_start();
    $nomPersonnel = $_GET["personnel"];
    $codePaiement = $_GET["code"];
    if(isset($nomPersonnel) && isset($codePaiement) && isset($_SESSION["emailUtilisateur"])){
        echo "<input style='display: hidden' id='nomPersonnel' type='hidden' value='".$nomPersonnel."'>
       <input style='display: hidden' id='codePaiement' type='hidden' value='".$codePaiement."'>";
    }
    else{
        header("Location: dashboard.php?page=reservation");
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js" ></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js" ></script> -->
    <script src="../Script/database.js"></script>
    <script src="../Script/printThis.js"></script>
    <script src="../Script/facture.js"></script>
    <link rel="stylesheet" href="../Style/all.css">
    <link rel="stylesheet" href="../Style/font.css">
    <link rel="stylesheet" href="../Style/facture.css">
    <title>Facture</title>
</head>
<body onload="checkMainData();">
    <div class="bg-layer">
        
    </div>
    <div id="pdf-content">

        <div class="fact-header margin">
            <div class="logo">
                <img id="logoAgence" src="../Media/Images/logo.png" alt="">
            </div>
            <div class="ag-info">
                <span id="nomAgence">Votre agence</span>
                <span id="adresseAgence">Adresse de votre agence</span>
                <span id="paysAgence">Ville - Maroc</span>
                <span>Tél : <span id="teleAgence">0600000000</span></span>
            </div>
        </div>
        <div class="fact-date margin">
            <div class="num-fact">
                Facture de location <br>N°<span id="numFacture">001/2022</span>
            </div>
            <pre class="ice-ag">N° ICE : <span id="iceAgence">24123/2018</span><br>Date   : <span id="dateReservation">20/06/2018</span>
            </pre>
        </div>
        <div class="fact-sect margin">
            <div>Facturé à: </div>
            <div class="client-info">
                <div class="data white-with-border">
                    <table>
                        <tr>
                            <td colspan="2">Nom et prénom: </td>
                            <td colspan="2"><span id="nomClient">Ahmed SLIMANI</span></td>
                        </tr>
                        <tr>
                            <td>Adresse: </td>
                            <td colspan="3"><span id="addClient">NR 05 RUE 07 AV ZENNOUHIA</span></td>
                        </tr>
                        <tr>
                            <td>Né le: </td>
                            <td><span id="birthClient">01/05/2000</span></td>
                            <td>Nationalité: </td>
                            <td><span id="natClient">maroccain</span></td>
                        </tr>
                        <tr>
                            <td>Ville: </td>
                            <td><span id="villeClient">Jorf</span></td>
                            <!-- <td>Pays: </td>
                            <td><span id="payClient">Maroc</span></td> -->
                            <td>Téléphone: </td>
                            <td><span id="teleClient">+212675784675</span></td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <td><span id="emailClient">itsmustaphahere@gmail.com</span></td>
                        </tr>
                        <tr>
                            <td>Type d'identité: </td>
                            <td><span id="typeIdClient">CIN</span></td>
                            <td>N° identité</td>
                            <td><span id="idClient">UC453445</span></td>
                        </tr>
                        <tr>
                            <td>N° Permis</td>
                            <td><span id="permisClient">342/2020</span></td>
                        </tr>
                    </table>
                </div>
                <div class="fact-info">
                    <table>
                        <tr class="white-with-border">
                            <td>
                                Numéro de contrat: <span id="numContrat">01/2022</span>
                            </td>
                        </tr>
                        <tr class="white-with-border">
                            <td>
                                Agent commercial: <span id="agentCom">Mustapha</span>
                            </td>
                        </tr>
                        <tr class="white-with-border">
                            <td>
                                Véhicule
                                <div>Matricule: <span id="immVoiture">12312 A 25</span></div>
                                <div>Marque: <span id="maqrueVoiture">audi</span></div>
                                <div>Modèle: <span id="modeleVoiture">rs3</span></div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="fact-details margin">
            <table class="fact-list">
                <tr>
                    <th>Détails de la location</th>
                    <th>P.U. HT</th>
                    <th>Quantité/Nbr jour</th>
                    <th>Montant HT</th>
                </tr>
                <tr>
                    <td>Location de voiture <span id="idVoiture">audi rs3 - 431412 A 25</span></td>
                    <td><span id="prixParJour">350.00</span> DH</td>
                    <td><span id="nbrJour">2</span></td>
                    <td><span id="totalTTC">700.00</span> DH</td>
                </tr>
                <tr></tr>
            </table>
            <div class="payment">
                <table>
                    <tr>
                        <td>Total HT: </td>
                        <td><span id="totalTTC2">700.00</span> DH</td>
                        <td>Total payé: </td>
                        <td><span id="totalPayed">500.00</span> DH</td>
                    </tr>
                    <tr>
                        <th>Montant dans la facture: </th>
                        <th><span id="curPayed">200.00</span> DH</th>
                        <td>Le reste: </td>
                        <td><span id="totalRest">200.00</span> DH</td>
                    </tr>
                </table>
            </div>
            <div class="pay-mod">
                <table>
                    <tr>
                        <td>
                            <div class="box"></div><label>Espéce</label>
                        </td>
                        <td>
                            <div class="box">X</div><label>Chèque bancaire</label>
                        </td>
                        <td>
                            <div class="box"></div><label>Carte bancaire</label>
                        </td>
                        <td>
                            <div class="box"></div><label>Virement bancaire</label>
                        </td>
                    </tr>
                </table>
                <div class="signature">
                    <div class="sign-area">
                        Signature Client
                    </div>
                    <div class="sign-area">
                        La direction
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="footer">
        <button class="save-btn" id="print-btn">Imprimer la facture</button>
        <button class="save-btn"  id="download-btn">Telecharger fichier PDF</button>
    </div>
</body>
</html>

