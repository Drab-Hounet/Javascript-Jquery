//Déclaration des variables regexp

//================================================> Var regUrl 						<===============================================

var regUrl = new RegExp(/^((http|https):\/\/)?(www[.])?([a-zA-Z0-9])+([.][a-zA-Z0-9]{2,})+$/);

//Je veux : (http:// ou https://) de façon facultative, avec (www.) de façon facultative,
//puis les Alpha-numérique Maj ou  non à l'infini, et enfin un (.) suivi de minimum 2
//jusqu'à l'infini des Alpha-numérique Maj ou non
//NB : pour les Alpha-numérique Maj ou non, il est possible d'écrire tout simplement (\w)

//================================================> VAR CARACTERES SCRIPTABLES 		<===============================================

var regScriptable = new RegExp(/^[!^$(<>)[\]{:=}?.\\+\/|*]$/);											

// Je veux englober tous les caractères scriptables keyable depuis le clavier. 

//================================================> Var Password 					<===============================================


var regSpecial = new RegExp(/^(?=.*[^A-Za-z0-9_]).*$/) ;			
//J'exclu tous les caractères Alpha-Numérique et _ : Je garde donc seulement les caractères spéciaux.
var regCap = new RegExp(/^(?=.*[A-Z]).*$/)	;													
// Je ne veux que les majuscules de A à Z.
var regNumber = new RegExp(/^(?=.*[0-9]).*$/);													
// Je ne veux que les caractères numériques.
var regAlpha = new RegExp(/^(?=.*[a-z]).*$/);													
// Je ne veux que les Alpha minuscules.

//================================================> Var Mail 						<===============================================

var regMail = new RegExp(/^[a-z0-9._-]+@[a-z0-9_]{2,}\.[a-z]{2,}$/i);
//Je veux :  des Alpha-numérique et/ou (._-) de 1 à l'infini, puis un @ obligatoire, ensuite alpha-numérique et/ou (_) de 2 à l'infini
//et enfin un point (.) et des Alpha de 2 à l'infini. Pour finir, on ajoute un (i) après le slash pour signifier que pour toute la ligne 
//on inclu les maj.									

//==================================================  Var Password better 

var regBetterPassword = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,})$/);

//===================================================================================================================================

function validateScriptableJquery(chars) {
	//pas de caracteres "scriptables"

    // Caractères non autorisés 
    for (var x = 0 ; x < chars.length ; x ++) {
      	//console.log(regScriptable.test(chars.charAt(x)));
      	if (regScriptable.test(chars.charAt(x))) {
      		//console.log(chars.charAt(x) + "non valide");
      		return {val1 : false,
      			val2 : x};
      		}
      	}
      	return true;
      }

      function validateNumJquery(chars) {
	//pas de chiffres

	for (var x = 0; x < chars.length; x++) {
		if (/[0-9]/.test(chars[x])){
    		//console.log(chars[x]);
    		return {val1 : false,
    			val2 : x};
    		}
    	}	
    	return true;
    }

    function validateLengthMin(chars , min){
	//check la longueur
	if (chars.length <= min){
		return false;
	}else{
		return true;
	}
}

function validateLengthMax(chars , max){
	//check la longueur
	if (chars.length > max ){
		return false;
	}else{
		return true;
	}
}

function checkSpan(param){
	//ajoute le span si absent aprés le input
	if(param.next().length == 0){
		$(param).after('<span>ffff</span>');
	}
}

function validatePasswordJquery(param){
	//check le password si conforme
	var minLengthPassword = 8;
	if(param.length < minLengthPassword){
		return {val1 : false,
			val2 : "red"};
		}else if((param.length > minLengthPassword) && (regBetterPassword.test(param))){
			return {val1 : true,
				val2 : "green"};
			}else{
				return {val1 : true, 
					val2 : "orange"};
				}
			}

function validateLetterJquery(chars){

	for (var x = 0; x < chars.length; x++) {
		if (/[^0-9]/.test(chars[x])){
    		//console.log(chars[x]);
    		return {val1 : false,
	    			val2 : x
	    			};
   		}
	}	
	return true;
}

function validateLengthEqual(chars , equal){
	//check la longueur
	if (chars.length > equal){
		return false;
	}else{
		return true;
	}
}

function validateMailJquery(chars)
	//check mail
	{
		if(!regMail.test(chars)){
			return false;
		}
		return true;
	}

function validateUrl(chars){
    //check le regex url
    if(!regUrl.test(chars)){
    	return false;
    }
    else{
    	return true;
    }  
}

function addGlyphX(elmt){
	//add glyph X
	elmt.next().addClass('glyphicon glyphicon-remove');
}

function addGlyphOK(elmt){
	//add glyph ok
	elmt.next().addClass('glyphicon glyphicon-ok');
}

function removeGlyph(elmt){
	//remove all glyph
	elmt.next().removeClass('glyphicon glyphicon-ok');
	elmt.next().removeClass('glyphicon glyphicon-remove');
}

/////////////////champs obligatoire ////////////////---> voir si encore d actualité !!!!!

var tabChampsRequis = ["nametype"];
var tempEtat = false;

for (var i = 0 ; i < tabChampsRequis.length ; i ++ ){
	$('[data-control = ' + tabChampsRequis[i] + ']').data('etat' , tempEtat);
}

////////////////////////////////////////////////////

/////////////////fonction submit ///////////////////

var valEtatNameType = true;
var valEtatErreur  = true;
var valEtatMail = true;
var valEtatPassword = true;
var valEtatConfirmPassword = true;
var valEtatTextType = true;
var valEtatSiret = true;
var valEtatSelect = true;
var valEtatCheckbox = true;
var valEtatRadio = true;

function test(select){
	var pEtat;
	var nameForm = select.attr('name');
	var dataControlForm = select.attr('data-control');
	//console.log(dataControlForm + " : " + nameForm);
	select.keyup();
	//console.log(select.data('etat'));
	pEtat = select.data('etat')
	return pEtat;
}

$('[data-form]').on('submit', function(){
	var valEtatNameType = true;
	var valEtatErreur  = true;
	var valEtatMail = true;
	var valEtatPassword = true;
	var valEtatConfirmPassword = true;
	var valEtatTextType = true;
	var valEtatSiret = true;
	var valEtatSelect = true;
	var valEtatCheckbox = true;
	var valEtatRadio = true;
	var comptErreur = 0;

	$(this).find('[data-control]').each(function(){

		console.log(this);

		//nametype
		if ($(this).attr('data-control') == 'nameType'){
			valEtatNameType = test($(this) , 'nameType');
			console.log("----" + valEtatNameType);
		//mail
		}else if($(this).attr('data-control') == 'mail'){
			valEtatMail = test($(this) , 'mail');
			console.log("----" + valEtatMail);
		//password
		}else if($(this).attr('data-control') == 'password'){
			valEtatPassword = test($(this) , 'password');
			console.log("----" + valEtatPassword);
		//confirmpassword
		}else if($(this).attr('data-control') == 'confirmPassword'){
			valEtatConfirmPassword = test($(this) , 'confirmPassword');
			console.log("----" + valEtatConfirmPassword);
		//texttype
		}else if($(this).attr('data-control') == 'textType'){
			valEtatTextType = test($(this) , 'textType');
			console.log("----" + valEtatTextType);
		//siret
		}else if($(this).attr('data-control') == 'siret'){
			valEtatSiret = test($(this) , 'siret');
			console.log("----" + valEtatSiret);
		}
		else if ($(this).attr('data-control') == 'select'){
			if($(this).val() == 'default'){
				//console.log($(this).val());
				valEtatSelect = false;
			}else{
				valEtatSelect = true;
			}
			console.log(valEtatSelect);
		}else if ($(this).attr('data-control') == 'checkbox'){
			if($(this).prop('checked')){
				//console.log($(this).val());
				valEtatCheckbox = true;
			}else{
				valEtatCheckbox = false;
			}
			console.log(valEtatCheckbox);
		}else if ($(this).attr('data-control') == 'radio'){
			
			$(this).each(function(){
				if($(this).prop('checked')){
					comptErreur ++;
				}
				if (comptErreur != 0){
					valEtatRadio = true;
				}else {
					valEtatRadio = false;
				}
				
				console.log(valEtatRadio);
				//console.log($(this).prop('checked'));
				//console.log($(this).attr('name'));
				//console.log("--" + $(this[0]).val());
				
				});
			console.log("comptErreur : " + comptErreur);
		}
		
	});	


	valEtatErreur = valEtatNameType && valEtatMail && valEtatPassword && valEtatConfirmPassword && valEtatTextType && valEtatSiret && valEtatSelect && valEtatRadio && valEtatCheckbox;
	console.log("fin --- ++ " + valEtatErreur);
	return valEtatErreur;
});

////////////////////////////////////////////////////

/////////// PARAMETRE DE CONTROLE //////////////////

var paramNameType			= {min : 2 		,max: 10	, scriptables: true		, num : false	, password : false , numOnly : false , confirmPassword : null , textType : false , mail : false , equal : null };
var paramPassword 			= {min : null 	, max: null	, scriptables: false 	, num : false 	, password : true  , numOnly : false , confirmPassword : null , textType : false  , mail : false , equal : null };
var paramMail				= {min : null 	, max: null	, scriptables: false 	, num : false 	, password : false , numOnly : false , confirmPassword : null , textType : null  , mail : true , equal : null };
var paramConfirmPassword	= {min : null 	, max: null	, scriptables: false 	, num : false 	, password : false , numOnly : false , confirmPassword : true , textType : null  , mail : false, equal : null };
var paramTexteType 			= {min : null 	, max: 30	, scriptables: false 	, num : false 	, password : false , numOnly : false , confirmPassword : null , textType : true  , mail : false, equal : null };
var paramSiret 				= {min : null	, max: null	, scriptables: true 	, num : false 	, password : false , numOnly : true , confirmPassword : null , textType : false  , mail : false, equal : 14 };

////////////////////////////////////////////////////


///////////////// EVENEMENTS ///////////////////////

$('[data-control = "nameType"]').on('keyup' , paramNameType , validate);

$('[data-control = "password"]').on('keyup' , paramPassword,  validate);

$('[data-control = "mail"]').on('keyup' , paramMail, validate);

$('[data-control = "confirmPassword"]').on('keyup' , paramConfirmPassword , validate);

$('[data-control = "textType"]').on('keyup' , paramTexteType , validate);

$('[data-control = "siret"]').on('keydown keyup' , paramSiret , validate);

////////////////////////////////////////////////////


function validate(event) {
	var elmt = $(this).val();
	var etat = false;
	var etatMin = true;
	var etatPassword = true;
	var etatMail = true;
	var etatUrl = true;
	var etatconfirmPassword = true;
	var etatEqual = true;

	//console.log(event.data);

	removeGlyph($(this));
	checkSpan($(this));

	var msgErreur = "";
	$(this).next().css('color', "black");

	if(event.data.min != null){
		if(validateLengthMin(elmt , event.data.min) == false){
			msgErreur = " Attention " + event.data.min + " caractères minimum";
			$(this).next().css('color', "red");
			etatMin = false;
		}
	}

	if(event.data.max != null){
		if(validateLengthMax(elmt , event.data.max) == false){
			$(this).val(elmt.substr(0,event.data.max));
			msgErreur = " Attention limite atteinte! (max = " + event.data.max + " caractères)";
		}
	}

	if(event.data.password == true){

		var colorMessage = validatePasswordJquery(elmt).val2; 

		if(validatePasswordJquery(elmt).val1 == false){
			msgErreur = " Mot de passe de mauvaise qualité";
			$(this).next().css('color', colorMessage);
			etatPassword = false;
		}else if(validatePasswordJquery(elmt).val1 == true && colorMessage == "orange"){
			msgErreur = " Mot de passe moyen";
			$(this).next().css('color', colorMessage);
		}else{
			addGlyphOK($(this));
			//msgErreur = " Mot de passe de bonne qualité";
			$(this).next().css('color', colorMessage);
		}
	}

	if(event.data.num == true){
		if(validateNumJquery(elmt).val1 == false){
			var index = validateNumJquery(elmt).val2;
			$(this).val((elmt.substr(0,index) + elmt.substr(index + 1 )));
		}
	}
	
	if(event.data.scriptables == true){
		if(validateScriptableJquery(elmt).val1 == false){
			var index = validateScriptableJquery(elmt).val2;
			$(this).val((elmt.substr(0,index) + elmt.substr(index + 1 )));
		}
	}

	if(event.data.numOnly == true){
		if(validateLetterJquery(elmt).val1 == false){
			var index = validateLetterJquery(elmt).val2;
			$(this).val((elmt.substr(0,index) + elmt.substr(index + 1 )));
		}
	}

	if(event.data.equal != null){
		if(validateLengthEqual(elmt , event.data.equal) == false){
			$(this).val(elmt.substr(0,event.data.equal));
			etatEqual = false;
			msgErreur = "Attention seulement  " + event.data.equal + " caractères sont acceptés";
		}else if (elmt.length != event.data.equal){
			etatEqual = false;
			msgErreur = "Attention " + event.data.equal + " caractères sont requis";
		}
	}

	if(event.data.mail == true){
		if(validateMailJquery(elmt) == false){
			//console.log("non");
			$(this).next().css('color', 'red');
			msgErreur = " Cette adresse mail est invalide ";
			etatMail = false;
		} else {
			$(this).next().css('color', 'green');
			addGlyphOK($(this));
			//console.log("c'est bon");
		}
	}

	if(event.data.url == true){
		if(validateUrl(elmt) == false){
			$(this).next().css('color', 'red');
			msgErreur = " Cette url est invalide";
			etatUrl = false;
		} else {
			$(this).next().css('color', 'green');
			addGlyphOK($(this));
		}
	}

	if(event.data.confirmPassword == true){
		if(elmt != $('[data-control = "password"]').val()) {
			$(this).next().css('color', 'red');
			msgErreur = " Les mots de passe doivent être similaires";
			etatconfirmPassword = false;
		} else{
			$(this).next().css('color', 'green');
			addGlyphOK($(this));			
		}
	}

	if(event.data.textType == true){
		if (elmt.length < event.data.max){
			msgErreur = " il vous reste : " + (event.data.max - elmt.length) + " caractères";
		}else{
			msgErreur = "Attention limite atteinte";
		}
	}
	

	etat = etatMin && etatPassword && etatMail && etatUrl && etatconfirmPassword && etatEqual;
	console.log("etat ---> " + etat);

	//console.log($(this).data('etat'));


	$(this).data('etat' , etat);
	// Mise à jour du message span
	$(this).next().text(msgErreur);
	//$(this).next().show().fadeOut(5000);
	
}

