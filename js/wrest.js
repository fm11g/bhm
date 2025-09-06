var wrestMsg = "";
var wrestFld = null;
var wrestFldDefaultColor = "";
//var wrestFldBackColor = "#ff3061";

// subject �띿꽦媛믪쓣 �살뼱 return, �놁쑝硫� tag�� name�� �섍�
function wrestItemname(fld)
{
    return fld.getAttribute("title") ? fld.getAttribute("title") : ( fld.getAttribute("alt") ? fld.getAttribute("alt") : fld.name );
   /* var id = fld.getAttribute("id");
    var labels = document.getElementsByTagName("label");
    var el = null;

    for(i=0; i<labels.length; i++) {
        if(id == labels[i].htmlFor) {
            el = labels[i];
            break;
        }
    }

    if(el != null) {
        var text =  el.innerHTML.replace(/[<].*[>].*[<]\/+.*[>]/gi, "");

        if(text == '') {
            return fld.getAttribute("title") ? fld.getAttribute("title") : ( fld.getAttribute("placeholder") ? fld.getAttribute("placeholder") : fld.name );
        } else {
            return text;
        }
    } else {
        return fld.getAttribute("title") ? fld.getAttribute("title") : ( fld.getAttribute("placeholder") ? fld.getAttribute("placeholder") : fld.name );
    }*/
}

// �묒そ 怨듬갚 �놁븷湲�
function wrestTrim(fld)
{
    var pattern = /(^\s+)|(\s+$)/g; // \s 怨듬갚 臾몄옄
    return fld.value.replace(pattern, "");
}

// �꾩닔 �낅젰 寃���
function wrestRequired(fld)
{
    if (wrestTrim(fld) == "") {
        if (wrestFld == null) {
            // ���됲듃諛뺤뒪�� 寃쎌슦�먮룄 �꾩닔 �좏깮 寃��ы빀�덈떎.
            wrestMsg = wrestItemname(fld) + " : �꾩닔 "+(fld.type=="select-one"?"�좏깮":"�낅젰")+"�낅땲��.\n";
            wrestFld = fld;
        }
    }
}

// 源��좎슜 2006.3 - �꾪솕踰덊샇(�대���) �뺤떇 寃��� : 123-123(4)-5678
function wrestTelNum(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if(!pattern.test(fld.value)){
        if(wrestFld == null){
            wrestMsg = wrestItemname(fld)+" : �꾪솕踰덊샇 �뺤떇�� �щ컮瑜댁� �딆뒿�덈떎.\n\n�섏씠��(-)�� �ы븿�섏뿬 �낅젰�섏꽭��.\n";
            wrestFld = fld;
            fld.select();
        }
    }
}

// �대찓�쇱＜�� �뺤떇 寃���
function wrestEmail(fld)
{
    if (!wrestTrim(fld)) return;

    //var pattern = /(\S+)@(\S+)\.(\S+)/; �대찓�쇱＜�뚯뿉 �쒓� �ъ슜��
    var pattern = /([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)\.([0-9a-zA-Z_-]+)/;
    if (!pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + " : �대찓�쇱＜�� �뺤떇�� �꾨떃�덈떎.\n";
            wrestFld = fld;
        }
    }
}

// �쒓��몄� 寃��� (�먯쓬, 紐⑥쓬 議고빀�� �쒓�留� 媛���)
function wrestHangul(fld)
{
    if (!wrestTrim(fld)) return;

    //var pattern = /([^媛�-��\x20])/i;
    var pattern = /([^媛�-��\x20])/;

    if (pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + ' : �쒓��� �꾨떃�덈떎. (�먯쓬, 紐⑥쓬 議고빀�� �쒓�留� 媛���)\n';
            wrestFld = fld;
        }
    }
}

// �쒓��몄� 寃���2 (�먯쓬, 紐⑥쓬留� �덈뒗 �쒓��� 媛���)
function wrestHangul2(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /([^媛�-�ｃ꽦-�롢뀖-��\x20])/i;
    //var pattern = /([^媛�-�ｃ꽦-�롢뀖-��\x20])/;

    if (pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + ' : �쒓��� �꾨떃�덈떎.\n';
            wrestFld = fld;
        }
    }
}

// �쒓�,�곷Ц,�レ옄�몄� 寃���3
function wrestHangulAlNum(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /([^媛�-��\x20^a-z^A-Z^0-9])/i;

    if (pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + ' : �쒓�, �곷Ц, �レ옄媛� �꾨떃�덈떎.\n';
            wrestFld = fld;
        }
    }
}

// �쒓�,�곷Ц �몄� 寃���
function wrestHangulAlpha(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /([^媛�-��\x20^a-z^A-Z])/i;

    if (pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + ' : �쒓�, �곷Ц�� �꾨떃�덈떎.\n';
            wrestFld = fld;
        }
    }
}

// �レ옄�몄�寃���
// 諛곕�瑜멸�轅��대떂 異붽� (http://dasir.com) 2003-06-24
function wrestNumeric(fld)
{
	if (!wrestTrim(fld)) return;

    //var pattern = /^[0-9][0-9]+$/;
	var pattern = /^[0-9]+$/;

	if (!pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + ' : �レ옄媛� �꾨떃�덈떎.\n';
            wrestFld = fld;
        }
    }

    /*if (fld.value.length > 0) {
        for (i = 0; i < fld.value.length; i++) {
            if (fld.value.charAt(i) < '0' || fld.value.charAt(i) > '9') {
                wrestMsg = wrestItemname(fld) + " : �レ옄媛� �꾨떃�덈떎.\n";
                wrestFld = fld;
            }
        }
    }*/
}

// �곷Ц�� 寃���
// 諛곕�瑜멸�轅��대떂 異붽� (http://dasir.com) 2003-06-24
function wrestAlpha(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /(^[a-zA-Z]+$)/;

    if (!pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + " : �곷Ц�� �꾨떃�덈떎.\n";
            wrestFld = fld;
        }
    }
}

// �곷Ц�먯� �レ옄 寃���
// 諛곕�瑜멸�轅��대떂 異붽� (http://dasir.com) 2003-07-07
function wrestAlNum(fld)
{
   if (!wrestTrim(fld)) return;

   var pattern = /(^[a-zA-Z0-9]+$)/;

   if (!pattern.test(fld.value)) {
       if (wrestFld == null) {
           wrestMsg = wrestItemname(fld) + " : �곷Ц �먮뒗 �レ옄媛� �꾨떃�덈떎.\n";
           wrestFld = fld;
       }
   }
}

// �곷Ц�먯� �レ옄 洹몃━怨� _ 寃���
function wrestAlNum_(fld)
{
   if (!wrestTrim(fld)) return;

   var pattern = /(^[a-zA-Z0-9\_]+$)/;

   if (!pattern.test(fld.value)) {
       if (wrestFld == null) {
           wrestMsg = wrestItemname(fld) + " : �곷Ц, �レ옄, _ 媛� �꾨떃�덈떎.\n";
           wrestFld = fld;
       }
   }
}

// 理쒖냼 湲몄씠 寃���
function wrestMinLength(fld)
{
    if (!wrestTrim(fld)) return;

    var minlength = fld.getAttribute("minlength");

    if (wrestFld == null) {
        if (fld.value.length < parseInt(minlength)) {
            wrestMsg = wrestItemname(fld) + " : 理쒖냼 "+minlength+"湲��� �댁긽 �낅젰�섏꽭��.\n";
            wrestFld = fld;
        }
    }
}

// �대�吏� �뺤옣��
function wrestImgExt(fld)
{
    if (!wrestTrim(fld)) return;

    var pattern = /\.(gif|jpg|png)$/i; // jpeg �� �쒖쇅
    if(!pattern.test(fld.value)){
        if(wrestFld == null){
            wrestMsg = wrestItemname(fld)+" : �대�吏� �뚯씪�� �꾨떃�덈떎.\n.gif .jpg .png �뚯씪留� 媛��ν빀�덈떎.\n";
            wrestFld = fld;
            fld.select();
        }
    }
}

// �뺤옣��
function wrestExtension(fld, css)
{
    if (!wrestTrim(fld)) return;

    var str = css.split("="); // ext=?? <-- str[1]
    var src = fld.value.split(".");
    var ext = src[src.length - 1];

    if (wrestFld == null) {
        if (ext.toLowerCase() < str[1].toLowerCase()) {
            wrestMsg = wrestItemname(fld) + " : ."+str[1]+" �뚯씪留� 媛��ν빀�덈떎.\n";
            wrestFld = fld;
        }
    }
}

// 怨듬갚 寃��ы썑 怨듬갚�� "" 濡� 蹂���
function wrestNospace(fld)
{
    var pattern = /(\s)/g; // \s 怨듬갚 臾몄옄

    if (pattern.test(fld.value)) {
        if (wrestFld == null) {
            wrestMsg = wrestItemname(fld) + " : 怨듬갚�� �놁뼱�� �⑸땲��.\n";
            wrestFld = fld;
        }
    }
}

// submit �� �� �띿꽦�� 寃��ы븳��.
function wrestSubmit()
{
    wrestMsg = "";
    wrestFld = null;

    var attr = null;

    // �대떦�쇱뿉 ���� �붿냼�� 媛쒖닔留뚰겮 �뚮젮��
    for (var i=0; i<this.elements.length; i++) {
        var el = this.elements[i];

        // Input tag �� type �� text, file, password �쇰븣留�
        // ���됲듃 諛뺤뒪�쇰븣�� �꾩닔 �좏깮 寃��ы빀�덈떎. select-one
        if (el.type=="text" || el.type=="hidden" || el.type=="file" || el.type=="password" || el.type=="select-one" || el.type=="textarea" || el.type=="tel") {
            if (el.getAttribute("required") != null) {
                wrestRequired(el);
            }

            if (el.getAttribute("minlength") != null) {
                wrestMinLength(el);
            }

            var array_css = el.className.split(" "); // class 瑜� 怨듬갚�쇰줈 �섎닎

            el.style.backgroundColor = wrestFldDefaultColor;

            // 諛곗뿴�� 湲몄씠留뚰겮 �뚮젮��
            for (var k=0; k<array_css.length; k++) {
                var css = array_css[k];
                switch (css) {
                    case "required"     : wrestRequired(el); break;
                    case "trim"         : wrestTrim(el); break;
                    case "email"        : wrestEmail(el); break;
                    case "hangul"       : wrestHangul(el); break;
                    case "hangul2"      : wrestHangul2(el); break;
                    case "hangulalpha"  : wrestHangulAlpha(el); break;
                    case "hangulalnum"  : wrestHangulAlNum(el); break;
                    case "nospace"      : wrestNospace(el); break;
                    case "numeric"      : wrestNumeric(el); break;
                    case "alpha"        : wrestAlpha(el); break;
                    case "alnum"        : wrestAlNum(el); break;
                    case "alnum_"       : wrestAlNum_(el); break;
                    case "telnum"       : wrestTelNum(el); break; // 源��좎슜 2006.3 - �꾪솕踰덊샇 �뺤떇 寃���
                    case "imgext"       : wrestImgExt(el); break;
                    default :
                        if (/^extension\=/.test(css)) {
                            wrestExtension(el, css); break;
                        }
                } // switch (css)
            } // for (k)
        } // if (el)
    } // for (i)

    // �꾨뱶媛� null �� �꾨땲�쇰㈃ �ㅻ쪟硫붿꽭吏� 異쒕젰�� �ъ빱�ㅻ� �대떦 �ㅻ쪟 �꾨뱶濡� ���
    // �ㅻ쪟 �꾨뱶�� 諛곌꼍�됱긽�� 諛붽씔��.
    if (wrestFld != null) {
        // 寃쎄퀬硫붿꽭吏� 異쒕젰
        alert(wrestMsg);

        if (wrestFld.style.display != "none") {
            var id = wrestFld.getAttribute("id");

            // �ㅻ쪟硫붿꽭吏�瑜� �꾪븳 element 異붽�
            var msg_el = document.createElement("strong");
            msg_el.id = "msg_"+id;
            msg_el.className = "msg_sound_only";
            //msg_el.innerHTML = wrestMsg;
            wrestFld.parentNode.insertBefore(msg_el, wrestFld);

            var new_href = document.location.href.replace(/#msg.+$/, "")+"#msg_"+id;

            //document.location.href = new_href;

            //wrestFld.style.backgroundColor = wrestFldBackColor;
            if (typeof(wrestFld.select) != "undefined")
                wrestFld.select();
            wrestFld.focus();
        }
        return false;
    }

    if (this.oldsubmit && this.oldsubmit() == false)
        return false;

    return true;
}


// 珥덇린�� onsubmit�� 媛�濡쒖콈�꾨줉 �쒕떎.
function wrestInitialized()
{
    for (var i = 0; i < document.forms.length; i++) {
        // onsubmit �대깽�멸� �덈떎硫� ���ν빐 �볥뒗��.
        if (document.forms[i].onsubmit) {
            document.forms[i].oldsubmit = document.forms[i].onsubmit;
        }
        document.forms[i].onsubmit = wrestSubmit;
    }
}

// �쇳븘�� �먮룞寃���
$(document).ready(function(){
    // onload
    wrestInitialized();
});

var is_reload = true;
function req(id)
{

	
	if(!id){
		id="reqFrm";
	}

	if($("#"+id+" [name='agree1']") && $("#"+id+" [name='agree1']").prop("checked")==false){
		var chkTitle = $("#"+id+" [name='agree1']").attr("title");
		if(!chkTitle || chkTitle=="undefined" ){
			chkTitle = "媛쒖씤�뺣낫 �섏쭛 諛� �댁슜";
		}
		alert(chkTitle+'�� �숈쓽 �섏뀛�� �댁슜媛��ν빀�덈떎.\n�뺤씤�� 吏꾪뻾�댁＜�쒓만 諛붾엻�덈떎.');
		return false;
	}

	if($("#"+id+" [name='agree2']") && $("#"+id+" [name='agree2']").prop("checked")==false){
		var chkTitle = $("#"+id+" [name='agree2']").attr("title");
		if(!chkTitle || chkTitle=="undefined" ){
			chkTitle = "��3�� �뺣낫�쒓났�숈쓽";
		}
		alert(chkTitle+'�� �숈쓽 �섏뀛�� �댁슜媛��ν빀�덈떎.\n�뺤씤�� 吏꾪뻾�댁＜�쒓만 諛붾엻�덈떎.');
		return false;
	}

	if($("#"+id+" [name='agree3']") && $("#"+id+" [name='agree3']").prop("checked")==false){
		var chkTitle = $("#"+id+" [name='agree3']").attr("title");
		if(!chkTitle || chkTitle=="undefined" ){
			chkTitle = "留덉��� �뺣낫�섏떊�숈쓽";
		}
		alert(chkTitle+'�� �숈쓽 �섏뀛�� �댁슜媛��ν빀�덈떎.\n�뺤씤�� 吏꾪뻾�댁＜�쒓만 諛붾엻�덈떎.');
		return false;
	}

	var queryString = $("#"+id).serialize();
	$.support.cors = true;
	$.ajax({
		type : 'POST',
		url : '../../proc/submit.php',
		data : queryString,
		dataType : 'json',
		crossDomain: true,
		async:false,
		xhrFields: {
			withCredentials: true
		},
		error: function(xhr, status, error){
			//alert(error+"!");
			alert("�쒕쾭�듭떊�� 臾몄젣媛� �덉뒿�덈떎. �좎떆�� �ㅼ떆 �쒕룄�� 二쇱꽭��.");
		},
		success : function(json){
			alert(json.msg);
			if(json.res==true){
				if(is_reload)	location.reload();
			}
		}
	});

	return false;
}
function _frmreq(id)
{
	if(!id){
		id="reqFrm";
	}

	if($("#"+id+" [name='agree1']") && $("#"+id+" [name='agree1']").prop("checked")==false){
		var chkTitle = $("#"+id+" [name='agree1']").attr("title");
		if(!chkTitle || chkTitle=="undefined" ){
			chkTitle = "媛쒖씤�뺣낫 �섏쭛 諛� �댁슜";
		}
		if(confirm(chkTitle+'�� �숈쓽 �섏뀛�� �댁슜媛��ν빀�덈떎. �숈쓽 �섏떆寃좎뒿�덇퉴?')){
			$("#"+id+" [name='agree1']").click();
		}else{
			return false;
		}
	}
	var queryString = $("#"+id).serialize();
	$.support.cors = true;
	$.ajax({
		type : 'POST',
		url : '../../proc/submit.frm.php',
		data : queryString,
		dataType : 'json',
		crossDomain: true,
		async:false,
		xhrFields: {
			withCredentials: true
		},
		error: function(xhr, status, error){
			//alert(error+"!");
			alert("�쒕쾭�듭떊�� 臾몄젣媛� �덉뒿�덈떎. �좎떆�� �ㅼ떆 �쒕룄�� 二쇱꽭��.");
		},
		success : function(json){
			if(json.res==false){
				alert(json.msg);
			}else{
				alert(json.msg);
				if(submit_reload)	location.reload();
			}
		}
	});

	return false;
}
$(document).ready(function() {
	
	// �곕씫泥� �먮쾲吏�
	$("[name='hp2']").on('change keyup',function(e) {
		var keyCode = e.which ? e.which : e.keyCode;
		var txt = $(this).val();
		if(keyCode != 37 && keyCode != 39) {
			var pattern = /^[0-9]+$/;

			if (!pattern.test(txt)) {
				txt = txt.substr(0, txt.length - 1);
				$(this).val(txt);
			}
		}

		if(txt.length>3){
			var thisFrm = $(this).parents("form").attr("id");
			$("#"+thisFrm+" [name='hp3']").focus();
		}
	});
	
	//�곕씫泥� 3踰덉㎏
	$("[name='hp3']").on('change keyup',function(e) {
		var keyCode = e.which ? e.which : e.keyCode;
		var txt = $(this).val();
		if(keyCode != 37 && keyCode != 39) {
			var pattern = /^[0-9]+$/;

			if (!pattern.test(txt)) {
				txt = txt.substr(0, txt.length - 1);
				$(this).val(txt);
			}
		}

		/*if(txt.length>3){
			var thisFrm = $(this).parents("form").attr("id");
			$("#"+thisFrm+" [name='hp3']").focus();
		}*/
	});
	
	// �곕씫泥� �먮쾲吏�
	$("[name='tel2']").on('change keyup',function(e) {
		var keyCode = e.which ? e.which : e.keyCode;
		var txt = $(this).val();
		if(keyCode != 37 && keyCode != 39) {
			var pattern = /^[0-9]+$/;

			if (!pattern.test(txt)) {
				txt = txt.substr(0, txt.length - 1);
				$(this).val(txt);
			}
		}

		if(txt.length>3){
			var thisFrm = $(this).parents("form").attr("id");
			$("#"+thisFrm+" [name='tel3']").focus();
		}
	});
	
	//�곕씫泥� 3踰덉㎏
	$("[name='tel3']").on('change keyup',function(e) {
		var keyCode = e.which ? e.which : e.keyCode;
		var txt = $(this).val();
		if(keyCode != 37 && keyCode != 39) {
			var pattern = /^[0-9]+$/;

			if (!pattern.test(txt)) {
				txt = txt.substr(0, txt.length - 1);
				$(this).val(txt);
			}
		}

		/*if(txt.length>3){
			var thisFrm = $(this).parents("form").attr("id");
			$("#"+thisFrm+" [name='hp3']").focus();
		}*/
	});

	//�대쫫
	$("[name='name']").on('change keyup',function(e) {
		var keyCode = e.which ? e.which : e.keyCode;
		var txt = $(this).val();
		if(keyCode != 37 && keyCode != 39) {
			var pattern = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+��<>@\#$%&\'\"\\\(\=]/gi;

			if (pattern.test(txt)) {
				txt = txt.substr(0, txt.length - 1);
				$(this).val(txt);
			}
		}
	});

	//�섏씠
	$(".numeric").on('change keyup',function(e) {
		var keyCode = e.which ? e.which : e.keyCode;
		var txt = $(this).val();
		if(keyCode != 37 && keyCode != 39) {
			var pattern = /^[0-9]+$/;

			if (!pattern.test(txt)) {
				txt = txt.substr(0, txt.length - 1);
				$(this).val(txt);
			}
		}
	});
});

