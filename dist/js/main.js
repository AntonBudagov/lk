(function() {
    console.log("main");
    jQuery(function($) {
        $(".phoneValidation").mask("+7 (999) 999-99-99");
    });
    $(".select").on("click", ".default-value", function() {
        var parent = $(this).closest(".select");
        if (!parent.hasClass("is-open")) {
            parent.addClass("is-open");
            $(".select.is-open").not(parent).removeClass("is-open");
        } else {
            parent.removeClass("is-open");
        }
    }).on("click", "ul > li", function() {
        var parent = $(this).closest(".select");
        parent.removeClass("is-open").find(".default-value").text($(this).text());
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsImpRdWVyeSIsIiQiLCJtYXNrIiwib24iLCJwYXJlbnQiLCJ0aGlzIiwiY2xvc2VzdCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJub3QiLCJyZW1vdmVDbGFzcyIsImZpbmQiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiQ0FBRTtJQUVBQSxRQUFRQyxJQUFJO0lBT2RDLE9BQU8sU0FBU0M7UUFDZEEsRUFBRSxvQkFBb0JDLEtBQUs7O0lBUTdCRCxFQUFFLFdBQVdFLEdBQUcsU0FBUSxrQkFBaUI7UUFFckMsSUFBSUMsU0FBU0gsRUFBRUksTUFBTUMsUUFBUTtRQUMzQixLQUFLRixPQUFPRyxTQUFTLFlBQVc7WUFDOUJILE9BQU9JLFNBQVM7WUFDaEJQLEVBQUUsbUJBQW1CUSxJQUFJTCxRQUFRTSxZQUFZO2VBQzFDO1lBQ0hOLE9BQU9NLFlBQVk7O09BR3BCUCxHQUFHLFNBQVEsV0FBVTtRQUN0QixJQUFJQyxTQUFTSCxFQUFFSSxNQUFNQyxRQUFRO1FBQzdCRixPQUFPTSxZQUFZLFdBQVdDLEtBQUssa0JBQWtCQyxLQUFNWCxFQUFFSSxNQUFNTyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiOyhmdW5jdGlvbiAoKSB7XG5cbiAgY29uc29sZS5sb2coJ21haW4nKTtcblxuLypcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5qcXVlcnkubWFza2VkaW5wdXQubWluXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuKi9cbmpRdWVyeShmdW5jdGlvbigkKXtcbiAgJChcIi5waG9uZVZhbGlkYXRpb25cIikubWFzayhcIis3ICg5OTkpIDk5OS05OS05OVwiKTtcbn0pO1xuXG4vKlxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnNlbGVjdCBEcm9wRG93blxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiovXG4kKCcuc2VsZWN0Jykub24oJ2NsaWNrJywnLmRlZmF1bHQtdmFsdWUnLGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgcGFyZW50ID0gJCh0aGlzKS5jbG9zZXN0KCcuc2VsZWN0Jyk7XG4gICAgICBpZiAoIXBhcmVudC5oYXNDbGFzcygnaXMtb3BlbicpKXtcbiAgICAgICAgcGFyZW50LmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoJy5zZWxlY3QuaXMtb3BlbicpLm5vdChwYXJlbnQpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICB9XG5cbiAgICB9KS5vbignY2xpY2snLCd1bCA+IGxpJyxmdW5jdGlvbigpe1xuICAgICAgdmFyIHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLnNlbGVjdCcpO1xuICAgICAgcGFyZW50LnJlbW92ZUNsYXNzKCdpcy1vcGVuJykuZmluZCgnLmRlZmF1bHQtdmFsdWUnKS50ZXh0KCAkKHRoaXMpLnRleHQoKSApO1xuICAgIH0pO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
