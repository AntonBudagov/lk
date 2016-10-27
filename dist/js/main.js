(function() {
    console.log("main");
    $(".modal-trigger").leanModal();
    $(".groupDay .btn").on("click", function() {
        $(".groupDay .btn").removeClass("active");
        $(this).addClass("active");
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsIiQiLCJsZWFuTW9kYWwiLCJvbiIsInJlbW92ZUNsYXNzIiwidGhpcyIsImFkZENsYXNzIiwialF1ZXJ5IiwibWFzayIsInBhcmVudCIsImNsb3Nlc3QiLCJoYXNDbGFzcyIsIm5vdCIsImZpbmQiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiQ0FBRTtJQUVBQSxRQUFRQyxJQUFJO0lBUWRDLEVBQUUsa0JBQWtCQztJQUVwQkQsRUFBRSxrQkFBa0JFLEdBQUcsU0FBUztRQUM5QkYsRUFBRSxrQkFBa0JHLFlBQVk7UUFDaENILEVBQUVJLE1BQU1DLFNBQVM7O0lBUW5CQyxPQUFPLFNBQVNOO1FBQ2RBLEVBQUUsb0JBQW9CTyxLQUFLOztJQVE3QlAsRUFBRSxXQUFXRSxHQUFHLFNBQVEsa0JBQWlCO1FBRXJDLElBQUlNLFNBQVNSLEVBQUVJLE1BQU1LLFFBQVE7UUFDM0IsS0FBS0QsT0FBT0UsU0FBUyxZQUFXO1lBQzlCRixPQUFPSCxTQUFTO1lBQ2hCTCxFQUFFLG1CQUFtQlcsSUFBSUgsUUFBUUwsWUFBWTtlQUMxQztZQUNISyxPQUFPTCxZQUFZOztPQUdwQkQsR0FBRyxTQUFRLFdBQVU7UUFDdEIsSUFBSU0sU0FBU1IsRUFBRUksTUFBTUssUUFBUTtRQUM3QkQsT0FBT0wsWUFBWSxXQUFXUyxLQUFLLGtCQUFrQkMsS0FBTWIsRUFBRUksTUFBTVMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIjsoZnVuY3Rpb24gKCkge1xuXG4gIGNvbnNvbGUubG9nKCdtYWluJyk7XG5cbi8qXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubW9kYWwgd2luZG93XG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuKi9cblxuJCgnLm1vZGFsLXRyaWdnZXInKS5sZWFuTW9kYWwoKTtcblxuJCgnLmdyb3VwRGF5IC5idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAkKCcuZ3JvdXBEYXkgLmJ0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG59KTtcbi8qXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuanF1ZXJ5Lm1hc2tlZGlucHV0Lm1pblxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiovXG5qUXVlcnkoZnVuY3Rpb24oJCl7XG4gICQoXCIucGhvbmVWYWxpZGF0aW9uXCIpLm1hc2soXCIrNyAoOTk5KSA5OTktOTktOTlcIik7XG59KTtcblxuLypcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5zZWxlY3QgRHJvcERvd25cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuJCgnLnNlbGVjdCcpLm9uKCdjbGljaycsJy5kZWZhdWx0LXZhbHVlJyxmdW5jdGlvbigpe1xuXG4gICAgdmFyIHBhcmVudCA9ICQodGhpcykuY2xvc2VzdCgnLnNlbGVjdCcpO1xuICAgICAgaWYgKCFwYXJlbnQuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XG4gICAgICAgIHBhcmVudC5hZGRDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuc2VsZWN0LmlzLW9wZW4nKS5ub3QocGFyZW50KS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHBhcmVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgfVxuXG4gICAgfSkub24oJ2NsaWNrJywndWwgPiBsaScsZnVuY3Rpb24oKXtcbiAgICAgIHZhciBwYXJlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zZWxlY3QnKTtcbiAgICAgIHBhcmVudC5yZW1vdmVDbGFzcygnaXMtb3BlbicpLmZpbmQoJy5kZWZhdWx0LXZhbHVlJykudGV4dCggJCh0aGlzKS50ZXh0KCkgKTtcbiAgICB9KTtcblxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
