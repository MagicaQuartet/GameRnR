$(function() {
  $('#search-review-btn').on('click', function(e) {
    e.preventDefault();
    const $reviewGroup = $('#review-group');
    let $reviewList = $reviewGroup.children('#review-list');
    if (!$reviewList.length) {
      const $list = $('<ul class="list-group" id="review-list"></ul>');
      $reviewGroup.append($list);
      $reviewList = $reviewGroup.children('#review-list');
    } else {
      $('#review-list').children().remove();
    }

    $.ajax({
      url: "/review/list",
      type: 'GET',
      data: {
        name: $('#search-review-text').val()
      },
      success: function(result) {
        for (let i in result) {
          const item = result[i];
          $reviewList.append(
            `<li class="list-group-item radio"><label><input type="radio" name="review-opt" value="${item.name}">${item.name}\t(${item.rating})</label></li>`);
        }

        $reviewGroup.append('<button class="btn btn-default" id="delete-review-btn" type="button" onclick="click" style="display:none;">Delete</button>');
      }
    });
  });

  $('#search-game-btn').on('click', function(e) {
    e.preventDefault();
    const $gameGroup = $('#game-group');
    let $gameList = $gameGroup.children('#game-list');
    if (!$gameList.length) {
      var $list = $('<ul class="list-group" id="game-list"></ul>');
      $gameGroup.append($list);
      $gameList = $gameGroup.children('#game-list');
    } else {
      $gameList.children().remove();
    }

    $.ajax({
      url: "/review/games",
      type: 'GET',
      data: {
        name: $('#search-game-text').val()
      },
      success: function(result) {
        for (let i in result) {
          const item = result[i];
          $gameList.append(
            `<li class="list-group-item radio"><label><input type="radio" name="game-opt" value="${item.name}">${item.name}</label></li>`
          );
        }

        $gameGroup.append('<button class="btn btn-default" id="write-review-btn" type="button" onclick="click" style="display:none;">Write</button>');
      }
    });
  });

  $('ul.nav-tabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  });

  $('body').on('change', 'input[name=game-opt]', function(e){
    e.preventDefault();
    $('#write-review-btn').show();
  });

  $('body').on('change', 'input[name=review-opt]', function(e){
    e.preventDefault();
    $('#delete-review-btn').show();
  });

  $('body').on('click', '#write-review-btn', function(e){
    e.preventDefault();
    const game = $('input[name=game-opt]:checked').val();
    const rating = parseFloat(prompt(`[${game}] Rating: `, "Please enter 0 ~ 10 real number"));

    if (isNaN(rating) || rating < 0 || rating > 10) {
      alert("Please enter 0 ~ 10 real number");
    } else {
      $.ajax({
        url: "/review/write",
        type: 'PUT',
        data: {
          name: game,
          rating: rating
        }
      });
    }
  });

  $('body').on('click', '#delete-review-btn', function(event) {
    event.preventDefault();

    const row = $('input[name=review-opt]:checked');
    const game = row.val();

    $.ajax({
      url: "/review/delete",
      type: 'PUT',
      data: {
        name: game
      },
      success: function(event) {
        row.parent().parent().remove();
        $('#delete-review-btn').hide();
      }
    });
  });
});
