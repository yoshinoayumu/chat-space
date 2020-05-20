$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="main_chat__message-list__message-box">
          <div class="main_chat__message-list__message-box__message-info">
            <div class="main_chat__message-list__message-box__message-info__name">
              ${message.user_name}
            </div>
            <div class="main_chat__message-list__message-box__message-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main_chat__message-list__message-box__message">
            <p class="main_chat__message-list__message-box__message__contents">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="main_chat__message-list__message-box">
        <div class="main_chat__message-list__message-box__message-info">
          <div class="main_chat__message-list__message-box__message-info__name">
            ${message.user_name}
          </div>
          <div class="main_chat__message-list__message-box__message-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main_chat__message-list__message-box__message">
          <p class="main_chat__message-list__message-box__message__contents">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main_chat__message-list').append(html);
      $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});      
    })
    .fail(function(){
      alert("メッセージ送信失敗だよ")
    })
    .always(function(){
      $('.submit-btn').prop("disabled", false);
      $(‘form’)[0].reset();
    });
  });
});