$(function() {
  if (!$('#recommendation-list').length) {
    const $list = $('<ul class="list-group" id="recommendation-list"></ul>');
    $('body').append($list);
  } else {
    const rows = $('#recommendation-list').children();
    for (const i=0; i<rows.length; i++) {
      rows[i].remove();
    }
  }

  $.ajax({
    url: "/recommendation/list",
    type: 'GET',
    success: function(result) {
      if (result.length) {
        for (const i in result) {
          const item = result[i];
          $('#recommendation-list').append(
            `<li class="list-group-item">${item.name}</li>`
          );
        }
      }
    }
  });
});
