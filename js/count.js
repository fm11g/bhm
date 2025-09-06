$(function () {
  // ===== 유틸: 안전한 텍스트 세팅 =====
  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = text;
  }

  // ===== 오늘 23:59:59.999를 반환 =====
  function endOfToday() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  }

  // ===== "오늘 23:59:59"가 이미 지났다면 "내일 23:59:59"로, 아니면 오늘로 설정 =====
  function computeDailyTarget() {
    var now = new Date();
    var target = endOfToday();
    if (now.getTime() > target.getTime()) {
      // 이미 자정을 지나 새벽 시간대라면 → 내일 23:59:59로.
      target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59, 999);
    }
    return target;
  }

  var targetDate = computeDailyTarget();

  // 1초마다 업데이트
  var timer = setInterval(function () {
    var now = new Date();
    var distance = targetDate.getTime() - now.getTime();

    // 날짜 표기는 항상 "현재 날짜"로 갱신
    var year  = now.getFullYear();
    var month = (now.getMonth() + 1);
    var day   = now.getDate();

    // 화면 상단 날짜(있으면 표시)
    setText("day2", year + "." + month + "." + day);
    setText("day3", year + ". " + month + ". " + day);

    // 자정 도달 or 초과 → 다음 사이클로 즉시 재설정 (자동 초기화)
    if (distance <= 0) {
      targetDate = computeDailyTarget(); // 새 타깃으로 재설정
      distance = targetDate.getTime() - now.getTime();
    }

    // 남은 시/분/초
    var hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                  .toString().padStart(2, "0");
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                  .toString().padStart(2, "0");
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)
                  .toString().padStart(2, "0");

    // 표시
    setText("countdown2", hours + "시 " + minutes + "분 " + seconds + "초 남음");
    setText("countdown3", hours + "시 " + minutes + "분 " + seconds + "초 남음");
  }, 1000);

  // ===== ticker 예시 (원 코드 유지) =====
  function upslide() {
    var h = $('#ticker').find('tbody > tr').outerHeight();
    var item = $('#ticker').find('tbody > tr:first-child');
    var itemClone = item.clone();
    $('#ticker > tbody').append(itemClone);

    $('#ticker_wrap').css({ 'top': 0 }).animate({ 'top': '-' + h + 'px' }, function () {
      $('#ticker_wrap').css({ 'top': 0 });
      item.remove();
    });
  }
  setInterval(function () { upslide(); }, 1700);
});
