const form1 = document.getElementById('form1');
form1.innerHTML = `
<div class="form-box" id="fm-box">
<div class="inner" style="text-align:-webkit-center;">
<div class="cd_font" style="text-align:-webkit-center;border:2px solid #000;border-radius:10px;width:93%;padding:10px 15px;max-width:450px;" > 
	<a href="#sec05" class="scroll box">
                
					<span class="timer" style="color:#000;font-weight:700;">
						혜택마감 | <span id="day3" style="font-weight:700;"></span>(<span id="countdown3" style="font-weight:700;"></span>)
						</span>
					  </a> </div>

    <div style="text-align:-webkit-center;">
       
          <!-- 새 상단 헤더 -->
  <div class="hero" aria-label="만기 후 100% 환급 배너">
    <h2 class="headline">프리미엄 가전도 얻고<br>목돈도 만들 기회!<br><span class="hl">바로 신청하세요!</span></h2>
    
    <h1 class="form-top-title" style="color:red;font-weight: 600;font-size:140%;line-height:120%;">-원하시는 제품 체크 후<br><신청하기> 버튼을 눌러주세요.</h1>
    <div class="form-box-inner">
        <form action="" id="form_e12" method="POST" target="hidden_iframe12" onsubmit="dll(); submitted=true;">
         <input type="hidden" name="entry.2134610496" value="">
        <input type="hidden" name='entry.1024743880' id="wishCombined" value="">
        <input type="hidden" name='entry.2031068747' id="phone-dash" value="">
            <div class="form-box-tb-out">
            <br>
                <table class="form-box-tb">
                    <tbody>
                    
                    <tr>
                        <th><!--<i class="fa fa-user" aria-hidden="true"></i>-->성함</th>
                        <td>
                            <input type='text' name='entry.606372973' id='name1' class="form-control" placeholder="성함" maxlength="4">
                        </td>
                    </tr>
                  
                   <!-- <tr>
                        <th>연령</th>
                        <td>
                            <input type='text' name='entry.1336420307' id='age1' class="form-control" placeholder="연령" maxlength="2">
                           
                        </td>
                    </tr> -->

                  
            <tr>
              <th><!--<i class="fa fa-phone" aria-hidden="true"></i>-->연락처</th>
              <td>
                  <input type='text'  id='phone1' class="form-control" placeholder="휴대폰번호" maxlength="11">
              </td>
          </tr>

         <tr id="select_lic">
                        <th>희망 제품 (1)<br><span style="color:red; font-size:12px;" id="currentDate1"></span></th>
                        <td>
    
                            <select  id='db3' class="form-control" placeholder="※ 희망제품 (1)">
    
						<option value="" selected disabled>-※ 희망제품 (1) 선택-</option>
			                 <option value="[삼성]갤북4울트라">[삼성]갤북4울트라</option>
                            <option value="[삼성]갤럭시북5프로360(NEW)">[삼성]갤럭시북5프로360(NEW)</option>
                            <option value="[LG]그램(17인치/15인치)노트북(NEW)">[LG]그램(17인치/15인치)노트북(NEW)</option>
                            <option value="[MSI]게이밍노트북세트(GF76신모델)">[MSI]게이밍노트북세트(GF76신모델)</option>
                            <option value="[애플]맥북 Pro 14 노트북">[애플]맥북 Pro 14 노트북</option>
                            <option value="[애플]아이패드프로11 M4칩+애플펜슬pro세트">[애플]아이패드프로11 M4칩+애플펜슬pro세트</option>
                            <option value="[LG]스마트TV-(60/75/86인치)+사운드바set">[LG]스마트TV-(60/75/86인치)+사운드바set</option>
                            <option value="[삼성]스마트TV-(60/75/85인치)+사운드바set">[삼성]스마트TV-(60/75/85인치)+사운드바set</option>
                            <option value="[삼성/LG]최신냉장고(양문형/4도어)">[삼성/LG]최신냉장고(양문형/4도어)</option>
                            <option value="[삼성/LG]김치냉장고(스탠드)">[삼성/LG]김치냉장고(스탠드)</option>
                            <option value="[삼성/LG]세탁기+건조기set">[삼성/LG]세탁기+건조기set</option>
                            <option value="[삼성/LG]세탁기">[삼성/LG]세탁기</option>
                            <option value="[삼성/LG]건조기">[삼성/LG]건조기</option>
                            <option value="[삼성/LG]에어드레서/스타일러(대용량)">[삼성/LG]에어드레서/스타일러(대용량)</option>
                            <option value="[삼성/LG]스탠드 에어컨">[삼성/LG]스탠드 에어컨</option>
                            <option value="[삼성/LG]2 in 1 에어컨(스탠드+벽걸이)">[삼성/LG]2 in 1 에어컨(스탠드+벽걸이)</option>
                            <option value="[삼성/LG]무선청소기">[삼성/LG]무선청소기</option>
                            <option value="[삼성/LG]공기청정기">[삼성/LG]공기청정기</option>
                            <option value="[바디프렌드]헬스케어로봇 안마의자">[바디프렌드]헬스케어로봇 안마의자</option>
                            <option value="[세라젬]더뉴마스터V4">[세라젬]더뉴마스터V4</option>
                            <option value="[바디프렌드/코지마/세라젬]안마의자">[바디프렌드/코지마/세라젬]안마의자</option>
                            <option value="[쿠쿠/코웨이/SK]얼음냉온정수기">[쿠쿠/코웨이/SK]얼음냉온정수기</option>
                            <option value="[기타제품]상담 후 결정">[기타제품]상담 후 결정</option>
                                                        
                                   
                                  
                            </select>
    
                        
                        </td>
                    </tr>

                      <tr id="select_lic">
                        <th>희망 제품 (2)<br><span style="color:red; font-size:12px;" id="currentDate1"></span></th>
                        <td>
    
                            <select id='db4' class="form-control" placeholder="※ 희망제품 (2)">
    
                                  <option value="" selected disabled>-※ 희망제품 (2) 선택-</option>
			                 <option value="[삼성]갤북4울트라">[삼성]갤북4울트라</option>
                            <option value="[삼성]갤럭시북5프로360(NEW)">[삼성]갤럭시북5프로360(NEW)</option>
                            <option value="[LG]그램(17인치/15인치)노트북(NEW)">[LG]그램(17인치/15인치)노트북(NEW)</option>
                            <option value="[MSI]게이밍노트북세트(GF76신모델)">[MSI]게이밍노트북세트(GF76신모델)</option>
                            <option value="[애플]맥북 Pro 14 노트북">[애플]맥북 Pro 14 노트북</option>
                            <option value="[애플]아이패드프로11 M4칩+애플펜슬pro세트">[애플]아이패드프로11 M4칩+애플펜슬pro세트</option>
                            <option value="[LG]스마트TV-(60/75/86인치)+사운드바set">[LG]스마트TV-(60/75/86인치)+사운드바set</option>
                            <option value="[삼성]스마트TV-(60/75/85인치)+사운드바set">[삼성]스마트TV-(60/75/85인치)+사운드바set</option>
                            <option value="[삼성/LG]최신냉장고(양문형/4도어)">[삼성/LG]최신냉장고(양문형/4도어)</option>
                            <option value="[삼성/LG]김치냉장고(스탠드)">[삼성/LG]김치냉장고(스탠드)</option>
                            <option value="[삼성/LG]세탁기+건조기set">[삼성/LG]세탁기+건조기set</option>
                            <option value="[삼성/LG]세탁기">[삼성/LG]세탁기</option>
                            <option value="[삼성/LG]건조기">[삼성/LG]건조기</option>
                            <option value="[삼성/LG]에어드레서/스타일러(대용량)">[삼성/LG]에어드레서/스타일러(대용량)</option>
                            <option value="[삼성/LG]스탠드 에어컨">[삼성/LG]스탠드 에어컨</option>
                            <option value="[삼성/LG]2 in 1 에어컨(스탠드+벽걸이)">[삼성/LG]2 in 1 에어컨(스탠드+벽걸이)</option>
                            <option value="[삼성/LG]무선청소기">[삼성/LG]무선청소기</option>
                            <option value="[삼성/LG]공기청정기">[삼성/LG]공기청정기</option>
                            <option value="[바디프렌드]헬스케어로봇 안마의자">[바디프렌드]헬스케어로봇 안마의자</option>
                            <option value="[세라젬]더뉴마스터V4">[세라젬]더뉴마스터V4</option>
                            <option value="[바디프렌드/코지마/세라젬]안마의자">[바디프렌드/코지마/세라젬]안마의자</option>
                            <option value="[쿠쿠/코웨이/SK]얼음냉온정수기">[쿠쿠/코웨이/SK]얼음냉온정수기</option>
                            <option value="[기타제품]상담 후 결정">[기타제품]상담 후 결정</option>
                                                        
                                   
                                  
                            </select>
    
                        
                        </td>
                    </tr>

                      <!-- <tr id="select_lic">
                        <th>신용카드<br></th>
                        <td>
    
                            <select name='entry.1160702980' id='card' class="form-control" placeholder="신용카드 사용여부">
    
                                <option value="신용카드 사용여부" selected disabled>신용카드 사용여부</option>
                                    <option value="신용카드 사용 중">신용카드 사용 중 [우대]</option>
                                    <option value="없음">없음</option>
                                   
                                  
                            </select>
    
                        
                        </td>
                    </tr> -->

                <!-- <tr id="select_lic">
                  <th><i class="fa fa-user" aria-hidden="true"></i>소득 유형<br></th>
                  <td>

                      <select name='entry.673750585' id='type' class="form-control" placeholder="소득 유형">

                          <option value="소득 유형" selected disabled>소득 유형</option>
                              <option value="4대보험가입자">4대보험가입 직장인</option>
                              <option value="3개월 이상 급여 근로자">3개월 이상 급여 근로자</option>
                              
                              
                             
                            
                      </select>

                  
                  </td>
              </tr> -->

           <!-- <tr>
                        <th>주의 확인</th>
                        <td>
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" id="warningCheck" name="warningCheck" style="width: 18px; height: 18px; margin-right: 8px;">
                                <span style="font-size: 13px; color: red; font-weight: 600;text-align:-webkit-left;line-height:140%;">
                                    과다대출, 파산, 회생, 회복, 연체자, 무직자는 신청이 불가함을 확인합니다.
                                </span>
                            </label>
                        </td>
                    </tr> -->


                    <!-- <tr>
                        <th>통화가능시간</th>
                        <td>
                            <select name="entry.882151947" id='position' class="form-control" placeholder="현재 조건">

                                <option value="통화가능시간" selected disabled>통화가능시간
                                    <option value="언제나 통화 가능">언제나 통화 가능</option>
                                    <option value="오전 09:00~10:00">오전 09:00 ~ 10:00</option>
                                    <option value="오전 10:00~11:00">오전 10:00 ~ 11:00</option>
                                    <option value="오전 11:00~12:00">오전 11:00 ~ 12:00</option>
                                    <option value="점심 12:00~01:00">점심 12:00 ~ 01:00</option>
                                    <option value="오후 01:00~02:00">오후 01:00 ~ 02:00</option>
                                    <option value="오후 02:00~03:00">오후 02:00 ~ 03:00</option>
                                    <option value="오후 03:00~04:00">오후 03:00 ~ 04:00</option>
                                    <option value="오후 04:00~05:00">오후 04:00 ~ 05:00</option>
                                    <option value="오후 05:00~06:00">오후 05:00 ~ 06:00</option>
                                    <option value="오후 06:00~07:00">오후 06:00 ~ 07:00</option>
                            </select>
                        </td>
                    </tr> -->

                   <!-- <tr id="select_lic">
                    <th>희망 장소<br></th>
                    <td>

                        <select name='entry.882151947' id='location' class="form-control" placeholder="교육 희망 지점">

                         
                            <option value="종로">종로</option>
                            <option value="강남">강남</option>
                            <option value="신촌">신촌</option>
                            <option value="천호">천호</option>
                            <option value="구로">구로</option>
                            <option value="안양">안양 </option>
                              
                        </select>

                   
                    </td>
                </tr>  -->

               <!--  <tr>
                <th><i class="fa fa-phone" aria-hidden="true"></i>희망금액</th>
                <td>
                    <input type='text' name='entry.882151947' id='loan' class="form-control" placeholder="희망 금액">
                </td>
            </tr>  -->

                
                   <!-- <tr>
                        <th>문의사항</th>
                        <td>
                            <textarea name='entry.2051055902' id='message' class="form-control" placeholder="문의사항을 적어주세요.(선택)" style="min-height:100px"></textarea>
                        </td>
                    </tr> -->
                   

                    

                    <tr>
                        <td colspan="2" style="border-bottom: none"> 
                          
                        
                            <input class="submit-btn" type='submit' id='send_message1' value='지금 신청하기' disabled >
                            <div class="form-agree-box">
                                <p class="form-info-agree">
                                    <span>
                                       
                                        <input type="checkbox" name="agree11" id="agree111" value="개인정보보호정책 동의" checked style="width:20px;">
                                        <label style="color:#000; font-weight:500;font-size:13px;" for="agree11">개인정보보호정책</label>
                    
                    
                                        <span class="privacyBtn" style="color:#000;font-weight:400; font-size: 13px;margin-top:-3px; " onclick="privacyPopUp()">
                                            [자세히 보기]
                                        </span>
                                    </span>
                                </p>

                                <script type="text/javascript">var submitted = false;</script>

                                <iframe name="hidden_iframe11" id="hidden_iframe11" style="display:none;" onload=""></iframe>
                                <iframe name="hidden_iframe12" id="hidden_iframe12" style="display:none;" onload=""></iframe>
                        
                            </div>
                        </td>
                    </tr>

                
                    
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</div>
</div><!----form-end------>







`;

document.body.appendChild(form1.content);