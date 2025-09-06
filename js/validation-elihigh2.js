$(document).ready(function(){
    $('#send_message1').click(function(){
        
          //Stop form submission & check the validation
        // e.preventDefault();
        
        // Variable declaration
        var error = false;
        const regex1 = /^[가-힣]+$/;
        const regex = /^[|0-9|]+$/;
        var mf = $('#mf').val();
        var age = $('#age').val();
        var nw = $('#now-wg').val();
        var height = $('#height').val();
        var hg = $('#hope-wg').val();
        // var id = $('#id-number').val();
        var name1 = $('#name1').val();
        // var email = $('#email').val();
        var phone1 = $('#phone1').val();
        var message = $('#message').val();
   
        var agree1 = $('#agree111').is(":checked");
        
        
        $('#name1,#phone1,#message,#agree111,#mf,#height,#now-wg,#hope-wg,#age').click(function(){
            $(this).removeClass("error_input");
        });
        


         // Form field validation
         if(!regex1.test(name1) || name1.length<0 ){
            var error = true;
            $('#name1').addClass("error_input");
           alert("이름 입력을 확인하세요.");
        }else{
            $('#name1').removeClass("error_input");
        }

        if(phone1.substr(0, 3) == "010" && phone1.length ==11 && regex.test(phone1) ){
            
            $('#phone1').removeClass("error_input");
        }else{
            var error = true;
            $('#phone1').addClass("error_input");
            alert("휴대폰 번호 입력을 확인하세요.");
        }

  

     


        if (agree1 == false){
            var error = true;
            $('#agree111').addClass("error_input");
            alert("개인정보동의를 체크해주세요.");
        }else{
            $('#agree111').removeClass("error_input");
        }
        
        
        // If there is no validation error, next to process the mail function
        if(error == false){
           // Disable submit button just after the form processed 1st time successfully.
          
           $('#form_e12').prop("action", "https://docs.google.com/forms/u/0/d/e/1FAIpQLSchCoviSWYWtARXi32fpfySC2vHEKvPGXBZy4eIyu34hyD3vQ/formResponse");
          $('#send_message1').attr({'disabled' : 'true', 'value' : '잠시만 기다려주세요' });
        const messages = ['정보를 확인 중입니다', '전송 준비 중입니다', '곧 신청이 완료됩니다.'];
        let msgIndex = 0;

        const msgInterval = setInterval(function () {
        msgIndex++;
        if (msgIndex < messages.length) {
            $('#send_message1').val(messages[msgIndex]);
        } else {
            clearInterval(msgInterval); // 3번째 메시지 후 반복 종료
        }
        }, 1000);
           
            
     $('#send_message1').prop("disabled", false);
    $('#send_message1').css({transition:"1s"});
    $('#send_message1').css({background:"#222222"});
    $('#send_message1').css({color:"#fff"});
    // $('#hidden_iframe11').attr("onload", "dll1();");
    $('#hidden_iframe12').attr("onload", "hoa1();");
   
        }
    });    

   

});


function dll1(){
    // var f = document.fm;
    // f.submit();
    // $('[name1="fm"],[name1="fm1"]').submit();

}
 
function maxLengthCheck(object){
  if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
  }    
}
 
 function hoa1(){ 
       setTimeout( function(){
        alert("신청이 완료되었습니다.");
        // $(window).scrollTop(0);
        // window.location.reload();
         window.location.href = './result.html';
       },1500);
 }
 
 function site1111(){
  //$('#mc-embedded-subscribe').click();
  

  window.location.reload();
 }


 function form_check2(){
    const regex2 = /^[|가-힣|0-9|]+$/;
    const regex1 = /^[|가-힣|]+$/;
    const regex = /^[|0-9|]+$/;
    var loan = $('#loan').val();
    var db3 = $('#db3').val();
    var db4 = $('#db4').val();
    var type = $('#type').val();
    var age = $('#age').val();
    var nw = $('#now-wg').val();
    var height = $('#height').val();
    var hw = $('#hope-wg').val();
    var card = $('#card').val();
    // var id = $('#id-number').val();
    var name1 = $('#name1').val();
    // var email = $('#email').val();
    var phone1 = $('#phone1').val();
    var message = $('#message').val();
    var agree1 = $('#agree111').is(":checked");
    var check = $('#warningCheck').is(":checked");
    
    var total= nw-hw;

  
       
    if(regex1.test(name1) && name1.length > 1 )
    {
            
            // if(regex.test(age) && age.length == 2 && age >=20 && age <34)
            // {
                    
                     
                            
                               

                    if(phone1.substr(0, 3) == "010" && phone1.length ==11 && regex.test(phone1))
                    {

                                if (db3 != null)
                                    {

                                          if (db4 != null)
                                             {
                                        // if (card != null)
                                        //     {
                                                    
                                                    
                                        //             if (type != null)
                                        //             {

                                        //                     if (check == true)
                                        //                         {

                                        //                                 if (regex2.test(loan) && loan.length > 1)
                                        //                                     {
                                                                    
                                                                                    if (agree1 == true)
                                                                                    {
                                                                                        $('#send_message1').css({transition:"1s"});
                                                                                        $('#send_message1').prop("disabled", false);
                                                                                        $('#send_message1').prop("value", "지금 신청하기");
                                                                                        $('#send_message1').css({background:"#0e3b64"});
                                                                                        $('#send_message1').css({cursor:"pointer"});
                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        $('#send_message1').css({transition:"1s"});
                                                                                        $('#send_message1').prop("disabled", true);
                                                                                        $('#send_message1').prop("value", "개인정보 동의를 확인해주세요");
                                                                                        $('#send_message1').css({background:"#121212"});
                                                                                        $('#send_message1').css({cursor:"default"});     
                                                                                    }


                                            //                                 }

                                            //                                 else
                                            //                                 {
                                            //                                     $('#send_message1').css({transition:"1s"});
                                            //                                     $('#send_message1').prop("disabled", true);
                                            //                                     $('#send_message1').prop("value", "신청 금액 입력을 확인하세요.");
                                            //                                     $('#send_message1').css({background:"#121212"});
                                            //                                     $('#send_message1').css({cursor:"default"});        
                                            //                                 }
                                            //                     }

                                            //                     else
                                            //                     {
                                            //                         $('#send_message1').css({transition:"1s"});
                                            //                         $('#send_message1').prop("disabled", true);
                                            //                         $('#send_message1').prop("value", "주의 사항 체크를 확인하세요.");
                                            //                         $('#send_message1').css({background:"#121212"});
                                            //                         $('#send_message1').css({cursor:"default"});        
                                            //                     }
                                                                
                                            //         }
                                            //         else
                                            //         {
                                            //             $('#send_message1').css({transition:"1s"});
                                            //             $('#send_message1').prop("disabled", true);
                                            //             $('#send_message1').prop("value", "소득 유형 선택을 확인하세요.");
                                            //             $('#send_message1').css({background:"#595959"});
                                            //             $('#send_message1').css({cursor:"default"});        
                                            //         }    

                                            // }
                                            // else
                                            // {
                                            //     $('#send_message1').css({transition:"1s"});
                                            //     $('#send_message1').prop("disabled", true);
                                            //     $('#send_message1').prop("value", "신용카드 선택을 확인하세요.");
                                            //     $('#send_message1').css({background:"#595959"});
                                            //     $('#send_message1').css({cursor:"default"});        
                                            // }
                                                        
                                         }
                                        else
                                        {
                                            $('#send_message1').css({transition:"1s"});
                                            $('#send_message1').prop("disabled", true);
                                            $('#send_message1').prop("value", "희망 제품(2)을 확인하세요.");
                                            $('#send_message1').css({background:"#595959"});
                                            $('#send_message1').css({cursor:"default"});        
                                        }

                                    }
                                    else
                                    {
                                        $('#send_message1').css({transition:"1s"});
                                        $('#send_message1').prop("disabled", true);
                                        $('#send_message1').prop("value", "희망 제품(1)을 확인하세요.");
                                        $('#send_message1').css({background:"#595959"});
                                        $('#send_message1').css({cursor:"default"});        
                                    }

        
                    }
                    else if(phone1.length == 0)
                    {
                        $('#send_message1').css({transition:"1s"});
                        $('#send_message1').prop("disabled", true);
                        $('#send_message1').prop("value", "전화번호를 확인하세요.");
                        $('#send_message1').css({background:"#121212"});
                        $('#send_message1').css({cursor:"default"});     
                    }
                    else
                    {
                        $('#send_message1').css({transition:"1s"});
                        $('#send_message1').prop("disabled", true);
                        $('#send_message1').prop("value", "전화번호 입력을 확인하세요.");
                        $('#send_message1').css({background:"#121212"});
                        $('#send_message1').css({cursor:"default"});     
                    }

                          
            // }
            // else if(age.length==0)
            // {
            // $('#send_message1').css({transition:"1s"});
            // $('#send_message1').prop("disabled", true);
            // $('#send_message1').prop("value", "연령을 입력을 확인하세요.");
            // $('#send_message1').css({background:"#121212"});
            // $('#send_message1').css({cursor:"default"});     
            // }
            // else 
            // {
            // $('#send_message1').css({transition:"1s"});
            // $('#send_message1').prop("disabled", true);
            // $('#send_message1').prop("value", "20세 ~ 33까지 가능합니다.");
            // $('#send_message1').css({background:"#121212"});
            // $('#send_message1').css({cursor:"default"});     
            // }
        
    }
    else if(name1.length == 0)
    {
        $('#send_message1').css({transition:"1s"});
        $('#send_message1').prop("disabled", true);
        $('#send_message1').prop("value", "성함을 입력을 확인하세요.");
        $('#send_message1').css({background:"#121212"});
        $('#send_message1').css({cursor:"default"});     
    }
    else
    {
        $('#send_message1').css({transition:"1s"});
        $('#send_message1').prop("disabled", true);
        $('#send_message1').prop("value", "성함의 입력을 확인하세요.");
        $('#send_message1').css({background:"#121212"});
        $('#send_message1').css({cursor:"default"});     
    }


   
 }
  




$(function(){
 $('#name1,#phone1,#loan,#age,#message,#agree111,#now-wg,#hope-wg,#height,#db3,#db4,#type,#warningCheck,#card').bind("keyup click change",form_check2);
//  $('#name1,#phone1,#loan,#age,#message,#agree111,#now-wg,#hope-wg,#height,#db1,#type,#warningCheck,#card').bind("keyup click change",form_check3);
//  $('#license').bind("keyup click change",lic_pick);
})