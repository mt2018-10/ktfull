let is_login = !1, is_process = !1;

function check_login() {

}
$(function () {
    $("[id*=keyword]").keypress(function (e) {
        var key = e.which;

        if ($("[id*=keyword]").val().length >= 3)  // the enter key code
        {
            if (key == 13)  // the enter key code
            {
                searchMovie();
                //$('input[name = butAssignProd]').click();
                return false;
            }
        }

    });
    $('body').click(function (event) {
        if ($(event.target).is('#keyword')) {
            $("[id*=hfCustomerId]").css("display", "block");
        } else if ($(event.target).is('#ResultUl')) {
            $("[id*=hfCustomerId]").css("display", "block");
        } else {
            $("[id*=hfCustomerId]").css("display", "none");
        }
    });
    $("[id*=keyword]").autocomplete({
        search: function (event, ui) {
            $('.search-suggest ul').empty();
        },
        source: function (request, response) {
            $.ajax({
                url: "/MODULES/AjaxUpdate.aspx/GetMoviesDetails",
                data: "{ 'prefix': '" + request.term + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    response($.map(data.d.slice(0, 5), function (item) {
                        return { image: item.ImageLink, name: item.Name, Duration: item.Duration, Link: item.RedirectToDetailsUrlSearch, Year: item.ReleaseYear, Point: item.VoteAverage, Genre: item.GenreArray, skey: item.skeyUrl }
                    }))
                },
                error: function (response) { alert(response.responseText); },
                failure: function (response) { alert(response.responseText); }
            });
        },
        open: function (event, ul) {
            var val = $('#keyword').val();
            $('.search-suggest ul').append('<li class="ss-bottom" style="padding: 0; border-bottom: none;"><a id="suggest-all"  href="javascript:void(0)" onclick="searchMovie()" > See All Result</a></li>'); //See all results
        },
        select: function (event, ui) {
            $("[id*=hfCustomerId]").val(ui.item.name);
            window.location.href = ui.item.RedirectToDetailsUrlSearch;
            return false;
        },
        minLength: 3
    }).autocomplete("instance")._renderItem = function (ul, item) {

        function sumAll(time, image, name, link, Year, Point, Genre) {
            var large = '<a style="background-image: url(' + image + ')" class="thumb" href="' + link + '"></a>' +
'<div class="ss-info">' +
'<a href="' + link + '" class="ss-title">' + name + '</a>' +
'<p><b> Duration: </b> ' + time + ' min, <b>IMDb: </b>' + Point + ', <b>Year:</b> ' + Year + ' </p>' +
'<p><b>Genre:</b> ' + Genre + '</p>' +
'</div>' +
'<p><div class="clearfix"></div></p>';
            return large;
        }

        return $("<li>").prepend(sumAll(item.Duration, item.image, item.name, item.Link, item.Year, item.Point, item.Genre))
                            .appendTo($('.search-suggest ul'));

    };


});

$(document).ready(function () {
    function e() {
        $(this).find(".sub-container").css("display", "block")
    }

    function t() {
        $(this).find(".sub-container").css("display", "none")
    }
    $("#toggle-register").click(function () {
        $("#tab-register").click()
    })
    $("#toggle-login").click(function () {
        $("#tab-login").click()
    })
    $(".ml-mask").qtip({
        content: {
            text: function (e, t) {
                $.ajax({
                    url: t.elements.target.attr("data-url"),
                    type: "GET",
                    loading: !1,
                    success: function (e) {
                        t.set("content.text", e)
                    }
                })
            },
            title: function () {
                return $(this).attr("title")
            }
        },
        position: {
            my: "top left",
            at: "top right",
            viewport: $(window),
            target: "mouse",
            adjust: {
                mouse: !1
            },
            show: {
                effect: function () {
                    $(this).slideDown(200)

                }
            }
        },
        hide: {
            fixed: !0
        },
        style: {
            classes: "qtip-dark",
            width: 320,
            tip: {
                corner: !1
            }
        }
    })

});

function searchMovie() {
    //var val = $('#keyword').val();
    //window.location.href = "skey/" + encodeURIComponent(val);
    let e = $('#keyword').val();
    "" !== e.trim() && (e = e.replace(/(<([^>]+)>)/gi, "").replace(/[`~!@#$%^&*()_|\=?;:'",.<>\{\}\[\]\\\/]/gi, ""), e = e.split(" ").join("_"), window.location.href = "/skey/" + e)
};

function removeFadeOut(el, speed) {
    let seconds = speed / 1000;
    el.style.transition = "opacity " + seconds + "s ease";

    el.style.opacity = 0;
    setTimeout(function () {
        el.parentNode.removeChild(el);
    }, speed);
}

$(document).ready(function () {
    function e() {
        $(this).find(".sub-container").css("display", "block")
    }

    function t() {
        $(this).find(".sub-container").css("display", "none")
    }
 $(".mobile-search").click(function () {
        $("#search,.mobile-search").toggleClass("active"), $("#menu, .mobile-menu").removeClass("active")
    }), $("#search a.box-title").click(function () {
        $("#search .box").toggleClass("active")
    }), $("#toggle-xsidebar").click(function () {
        $("#xsidebar").toggleClass("active"), $("#toggle-xsidebar").toggleClass("active")
    }), $(".mobile-menu").click(function () {
        $("#menu,.mobile-menu").toggleClass("active"), $("#search, .mobile-search").removeClass("active")
    }), $(".filter-toggle").click(function () {
        $("#filter").toggleClass("active"), $(".filter-toggle").toggleClass("active")
    }), $(".bp-btn-light").click(function () {
        $(".bp-btn-light, #overlay, #media-player, #main").toggleClass("active")
    }), $("#overlay").click(function () {
        $(".bp-btn-light, #overlay, #media-player, #main").removeClass("active")
    }), $("#toggle, .cac-close").click(function () {
        $("#comment").toggleClass("active")
    }), $("#toggle-login").click(function () {
        $("#tab-login").click()
    }),$("#toggle-register").click(function () {
        $("#tab-register").click()
    }), $(".top-menu> li").bind("mouseover", e), $(".top-menu> li").bind("mouseout", t), $(function () {
        function e() {
            var e = $(this),
                t = e.find(".modal-dialog");
            e.css("display", "block"), t.css("margin-top", Math.max(0, ($(window).height() - t.height()) / 2))
    }

        $(".modal").on("show.bs.modal", e), $(window).on("resize", function () {
            $(".modal:visible").each(e)
    })
    })
    if (check_login() , $("#slider").length > 0) {
        new Swiper("#slider", {
            pagination: ".swiper-pagination",
            paginationClickable: !0,
            loop: false,
            autoplay: 4e3
        })
    }
    $(".xlist, .pw-comment .content").perfectScrollbar(), $("#pop-trailer").on("shown.bs.modal", function () {
        $("#iframe-trailer").attr("src", mid.trailer)
    }), $("#pop-trailer").on("hide.bs.modal", function () {
        $("#iframe-trailer").attr("src", "")
    }), $("#login-form").submit(function (e) {
        $("#login-submit").prop("disabled", !0), $("#login-loading").show();
        var t = $(this).serializeArray();
        $.ajax({
            url: "/user/login.html",
            type: "POST",
            data: t,
            dataType: "json",
            success: function (e) {
                0 === e.status && ($("#error-message").show(), $("#error-message").text(e.message), $("#login-submit").removeAttr("disabled"), $("#login-loading").hide()), 1 === e.status && window.location.reload()
            }
        }), e.preventDefault()
    }), $("#register-form").submit(function (e) {
        $("#register-submit").prop("disabled", !0), $("#register-loading").show(), $(".error-message").hide();
        var t = $(this).serializeArray();
        $.ajax({
            url: "/user/register.html",
            type: "POST",
            data: t,
            dataType: "json",
            success: function (e) {
                if ($(".error-message").hide(), 0 === e.status) {
                    $("#register-error").show(), $("#register-error").text(e.message);
                    $("#register-submit").removeAttr("disabled"), $("#register-loading").hide()
                }
                1 === e.status && window.location.reload()
            }
        }), e.preventDefault()
    }), $("#request-form").submit(function (e) {
        $("#request-submit").prop("disabled", !0), $("#request-loading").show();
        var t = $(this).serializeArray();
        $.ajax({
            url: "/user/request.html",
            type: "POST",
            data: t,
            dataType: "json",
            success: function (e) {
                1 == e.status && ($("#message-success").show(), setTimeout(function () {
                    $("#message-success").hide()
                }, 5e3), document.getElementById("request-form").reset()), $("#request-submit").removeAttr("disabled"), $("#request-loading").hide()
            }
        }), e.preventDefault()
    }), $("#profile-form").submit(function (e) {
        $("#btn-update").prop("disabled", !0), $("#submit-loading").show();
        var t = new FormData(this);
        $.ajax({
            url: "/user/update.html",
            type: "POST",
            data: t,
            dataType: "json",
            mimeType: "multipart/form-data",
            contentType: !1,
            processData: !1,
            cache: !1,
            success: function (e) {
                if ($(".error-message").hide(), 0 == e.status) {
                    for (var t in e.messages) $("#error-" + t).show(), $("#error-" + t).text(e.messages[t]);
                    $("#btn-update").removeAttr("disabled"), $("#submit-loading").hide()
                }
                1 === e.status && window.location.reload()
            }
        }), e.preventDefault()
    });
    var a = !0,
        i = !0;

    var s = null,
        o = null;
    $("#forgot-form").submit(function (e) {
        $("#forgot-form").prop("disabled", !0);
        var t = $(this).serializeArray();
        $.ajax({
            url: "/user/forgot",
            type: "POST",
            data: t,
            dataType: "json",
            success: function (e) {
                0 === e.status && ($("#forgot-error-message").show(), $("#forgot-error-message").text(e.message)), 1 === e.status && ($("#forgot-success-message").show(), $("#forgot-success-message").text(e.message)), $("#forgot-submit").removeAttr("disabled")
            }
        }), e.preventDefault()
    });
});

function FavCall(Auth, Vid, User) {
    var FavLb = $("[id*=FavLb1]").html();
    var Fav = {};
    Fav.MovieID = Vid;
    Fav.UserID = User;
    $.ajax({
        type: "POST",
        async: true,
        url: "/MODULES/AjaxUpdate.aspx/UpdateFav",
        data: '{Fav: ' + JSON.stringify(Fav) + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d === '1') {
                if (FavLb === 'Remove Favorite') {
                    $("[id*=FavLb1]").text('Favorite');
                    $("[id*=FavCss]").removeClass('fa fa-heart SelectedFavIcon').addClass('fa fa-heart');
                }
                if (FavLb === 'Favorite') {
                    $("[id*=FavCss]").removeClass('fa fa-heart').addClass('fa fa-heart SelectedFavIcon');
                    $("[id*=FavLb1]").text('Remove Favorite');
                }
            }
            if (response.d === '0') {
                $("#Logbx").click();
            }
        },
        error: function (error) {
        }

    });
    return false;

};



function LgCheck() {
    if (($("[id*=usernameBox]").val() !== '') && ($("[id*=passwordBox]").val() !== '')) {
        var UserDetails = {};
        UserDetails.Username = $("[id*=usernameBox]").val();
        UserDetails.Password = $("[id*=passwordBox]").val();
        $("[id*=usernameBox]").popover('hide');
        $("[id*=passwordBox]").popover('hide');
        $.ajax({
            type: "POST",
            async: true,
            url: "/MODULES/AjaxUpdate.aspx/UserLogin",
            data: '{UserDetails: ' + JSON.stringify(UserDetails) + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d.Status === '1') {
                    $("[id*=signInLnk]").css("display", "none");
                    $("[id*=AccLinkbox]").css("display", "block");
                    $("[id*=auth-modal]").modal('toggle');
                    $("[id*=errorLb]").css("display", "none")
                    $("[id*=errorLb]").html("");
                    $("#tab-close").click();
                }
                if (response.d.Status === '0') {
                    $("[id*=signInLnk]").css("display", "block");
                    $("[id*=AccLinkbox]").css("display", "none");
                    $("[id*=errorLb]").removeClass('cssload-center alert alert-danger alert-dismissible').addClass('cssload-center alert alert-danger alert-dismissible');
                    $("[id*=errorLb]").css("display", "block");
                    $("[id*=errorLb]").html("");
                    $("[id*=errorLb]").append("<span>Invalid Username or Password</span>");
                }

            },
            error: function (error) {

                return false;

            }

        });
        return false;

    }
    else {
        if (($("[id*=usernameBox]").val() === '')) {
            $("[id*=usernameBox]").popover({
                html: true,
                trigger: 'manual',
                placement: 'left',
                content: function () {
                    return ("<span class='fa fa-info-circle'> Please fill in your username</span>");
                }
            }).popover('toggle');
        }
        if (($("[id*=passwordBox]").val() === '')) {
            $("[id*=passwordBox]").popover({
                html: true,
                trigger: 'manual',
                placement: 'left',
                content: function () {
                    return ("<span class='fa fa-info-circle'> Please fill in your password</span>");
                }
            }).popover('toggle');
        }
    }
};
function RgCheck() {

    if (($("[id*=fullNameBx]").val() !== '') && ($("[id*=usernameBx]").val() !== '' && ($("[id*=emailBx]").val() !== '') && ($("[id*=passwordBx]").val() !== '') && ($("[id*=confirmPasswordBx]").val() !== ''))) {
        if (isEmail($("[id*=emailBx]").val())) {
            RegDetails = {};
            RegDetails.fullName = $("[id*=fullNameBx]").val();
            RegDetails.username = $("[id*=usernameBx]").val();
            RegDetails.email = $("[id*=emailBx]").val();
            RegDetails.Password = $("[id*=passwordBx]").val();
            $("[id*=fullNameBx]").popover('hide');
            $("[id*=usernameBx]").popover('hide');
            $("[id*=emailBx]").popover('hide');
            $("[id*=passwordBx]").popover('hide');
            $("[id*=confirmPasswordBx]").popover('hide');
            if ($("[id*=confirmPasswordBx]").val() === $("[id*=passwordBx]").val()) {
                $.ajax({
                    type: "POST",
                    async: true,
                    url: "/MODULES/AjaxUpdate.aspx/InUser",
                    data: '{RegDetails: ' + JSON.stringify(RegDetails) + '}',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        if (response.d.Status === '1') {
                            ErMsg($("[id*=register-error]"), 'Email already registered', 'alert-success', 'alert-danger');
                        }
                        if (response.d.Status === '2') {
                            ErMsg($("[id*=register-error]"), 'Username already registered', 'alert-success', 'alert-danger');
                        }
                        if (response.d.Status === '0') {
                            ErMsg($("[id*=register-error]"), 'Thanks for registering!', 'alert-danger', 'alert-success');
                        }
                    },
                    error: function (error) {
                        return false;

                    }

                });
            } else {
                ValidateMsg($("[id*=confirmPasswordBx]"), '  Password Mismatch.')
            }

        } else {
            ValidateMsg($("[id*=emailBx]"), '  Invalid Email')
        }
    }
    else {
        if (($("[id*=fullNameBx]").val() === '')) {
            ValidateMsg($("[id*=fullNameBx]"), '  Please fill in your full names.');
        }
        if (($("[id*=usernameBx]").val() === '')) {
            ValidateMsg($("[id*=usernameBx]"), '  Please fill in your username.');
        }
        if (($("[id*=emailBx]").val() === '')) {
            ValidateMsg($("[id*=emailBx]"), '  Please fill in your email.');
        }
        if (($("[id*=passwordBx]").val() === '')) {
            ValidateMsg($("[id*=passwordBx]"), '  Please fill in your password.');
        }
        if (($("[id*=confirmPasswordBx]").val() === '')) {
            ValidateMsg($("[id*=confirmPasswordBx]"), '  Please confirm your password.');
        }
    }
};




//$(document).ready(function () {
//    function e() {
//        $(this).find(".sub-container").css("display", "block")
//    }

//    function t() {
//        $(this).find(".sub-container").css("display", "none")
//    }
//    $("#toggle-register").click(function () {
//        $("#tab-register").click()
//    })
//    $("#toggle-login").click(function () {
//        $("#tab-login").click()
//    })
//    $("[id*=mobile-menu]").click(function () {
//        $("#menu,.mobile-menu").toggleClass("active"), $("#search, .mobile-search").removeClass("active")
//    })
//    $(".mobile-search").click(function () {
//        $("#search,.mobile-search").toggleClass("active"), $("#menu, .mobile-menu").removeClass("active")
//    })
//});


function ValidateMsg(input, msg) {
    input.popover({
        html: true,
        trigger: 'manual',
        placement: 'left',
        content: function () {
            return ("<span class='fa fa-info-circle'>" + msg + "</span>");
        }
    }).popover('toggle');
}
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function ErMsg(input, msg, alterType1, alterType2) {
    input.removeClass('cssload-center alert ' + alterType1).addClass('cssload-center alert ' + alterType2);
    input.css("display", "block");
    input.html("");
    input.append("<span>" + msg + "</span>");
}
function ClearErMsg(input) {
    $("[id*=errorLb]").css("display", "none")
    $("[id*=errorLb]").html("");
    $("#tab-close").click();
}

function EmailRstS() {

    if (($("[id*=EmailRstBx]").val() !== '')) {
        if (isEmail($("[id*=EmailRstBx]").val())) {
            RegDetails = {};
            RegDetails.email = $("[id*=EmailRstBx]").val();
            $("[id*=EmailRstBx]").popover('hide');
            $.ajax({
                type: "POST",
                async: true,
                url: "/MODULES/AjaxUpdate.aspx/ResetPass",
                data: '{RegDetails: ' + JSON.stringify(RegDetails) + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    alert(response.d.Status);
                    if (response.d.Status === '0') {
                        ErMsg($("[id*=forgotmessage]"), 'Email does not exist', 'alert-success', 'alert-danger');
                    }
                    if (response.d.Status === '1') {
                        ErMsg($("[id*=forgotmessage]"), 'A reset password has been sent to your email.', 'alert-danger', 'alert-success');
                    }
                },
                error: function (error) {
                    return false;

                }

            });

        } else {
            ValidateMsg($("[id*=EmailRstBx]"), '  Invalid Email')
        }
    }
    else {
        if (($("[id*=EmailRstBx]").val() === '')) {
            ValidateMsg($("[id*=EmailRstBx]"), '  Please fill in your email.');
        }
    }
};
