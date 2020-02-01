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

/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function (a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function (a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function (b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function (b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function (b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove()
        }
        var e = a(this),
            f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
        var g = a(f);
        b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function (b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.3.4", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function (b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function () {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        a && this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
    })
}(jQuery), + function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function (b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, c.prototype.keydown = function (a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            a.preventDefault()
        }
    }, c.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function (a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.getItemForDirection = function (a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;
        return this.$items.eq(f)
    }, c.prototype.to = function (a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            b.to(a)
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
    }, c.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function (b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;
        if (f.hasClass("active")) return this.sliding = !1;
        var j = f[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(f)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: h
            });
            return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = d, this
    };
    var e = function (c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    };
    a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function (a) {
    "use strict";

    function b(b) {
        var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
        return a(d)
    }

    function c(b) {
        return this.each(function () {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
            !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
        })
    }
    var d = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.4", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
        toggle: !0
    }, d.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, d.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");
                if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
                    var g = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var h = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition) return h.call(this);
                    var i = a.camelCase(["scroll", g].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
                }
            }
        }
    }, d.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var e = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
            }
        }
    }, d.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, d.prototype.getParent = function () {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
            var e = a(d);
            this.addAriaAndCollapsedClass(b(e), e)
        }, this)).end()
    }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
    };
    var e = a.fn.collapse;
    a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = e, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
        var e = a(this);
        e.attr("data-target") || d.preventDefault();
        var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
        c.call(f, h)
    })
}(jQuery), + function (a) {
    "use strict";

    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function () {
            var d = a(this),
                e = c(d),
                f = {
                    relatedTarget: this
                };
            e.hasClass("open") && (e.trigger(b = a.Event("hide.bs.dropdown", f)), b.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger("hidden.bs.dropdown", f)))
        }))
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function d(b) {
        return this.each(function () {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function (b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.3.4", g.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function (b) {
        if (/(38|40|27|32)/.test(b.which) && !/input|textarea/i.test(b.target.tagName)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d),
                    g = e.hasClass("open");
                if (!g && 27 != b.which || g && 27 == b.which) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.disabled):visible a",
                    i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(b.target);
                    38 == b.which && j > 0 && j--, 40 == b.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', g.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', g.prototype.keydown)
}(jQuery), + function (a) {
    "use strict";

    function b(b, d) {
        return this.each(function () {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function (b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function (b) {
        var d = this,
            e = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            d.$element.one("mouseup.dismiss.bs.modal", function (b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var e = a.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in").attr("aria-hidden", !1), d.enforceFocus();
            var f = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            e ? d.$dialog.one("bsTransitionEnd", function () {
                d.$element.trigger("focus").trigger(f)
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
        }))
    }, c.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
    }, c.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, c.prototype.resize = function () {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }, c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function (b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;
            if (this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                    return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
            }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var g = function () {
                d.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
        } else b && b()
    }, c.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, c.prototype.adjustDialog = function () {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
        })
    }, c.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, c.prototype.checkScrollbar = function () {
        var a = window.innerWidth;
        if (!a) {
            var b = document.documentElement.getBoundingClientRect();
            a = b.right - Math.abs(b.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
    }, c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function (a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function (b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function () {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c && c.$tip && c.$tip.is(":visible") ? void (c.hoverState = "in") : (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show())
    }, c.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !d) return;
            var e = this,
                f = this.tip(),
                g = this.getUID(this.type);
            this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
            var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);
            j && (h = h.replace(i, "") || "top"), f.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element);
            var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;
            if (j) {
                var n = h,
                    o = this.options.container ? a(this.options.container) : this.$element.parent(),
                    p = this.getPosition(o);
                h = "bottom" == h && k.bottom + m > p.bottom ? "top" : "top" == h && k.top - m < p.top ? "bottom" : "right" == h && k.right + l > p.width ? "left" : "left" == h && k.left - l < p.left ? "right" : h, f.removeClass(n).addClass(h)
            }
            var q = this.getCalculatedOffset(h, k, l, m);
            this.applyPlacement(q, h);
            var r = function () {
                var a = e.hoverState;
                e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
            };
            a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", r).emulateTransitionEnd(c.TRANSITION_DURATION) : r()
        }
    }, c.prototype.applyPlacement = function (b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function (a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l)
    }, c.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
    }, c.prototype.setContent = function () {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function (b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
        }
        var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function () {
        return this.getTitle()
    }, c.prototype.getPosition = function (b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();
        null == e.width && (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var f = d ? {
            top: 0,
            left: 0
        } : b.offset(),
            g = {
                scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
            },
            h = d ? {
                width: a(window).width(),
                height: a(window).height()
            } : null;
        return a.extend({}, e, g, h, f)
    }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function () {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function (a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function () {
        return this.$tip = this.$tip || a(this.options.template)
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.enable = function () {
        this.enabled = !0
    }, c.prototype.disable = function () {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function (b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function () {
        var a = this;
        clearTimeout(this.timeout), this.hide(function () {
            a.$element.off("." + a.type).removeData("bs." + a.type)
        })
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || !/destroy|hide/.test(b)) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function (a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.3.4", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
        return c.DEFAULTS
    }, c.prototype.setContent = function () {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function () {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
        return a.fn.popover = d, this
    }
}(jQuery), + function (a) {
    "use strict";

    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.3.4", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function () {
        var b = this,
            c = "offset",
            d = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[c]().top + d, e]
            ] || null
        }).sort(function (a, b) {
            return a[0] - b[0]
        }).each(function () {
            b.offsets.push(this[0]), b.targets.push(this[1])
        })
    }, b.prototype.process = function () {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return this.activeTarget = null, this.clear();
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, this.clear();
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    }, b.prototype.clear = function () {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function (b) {
        this.element = a(b)
    };
    c.VERSION = "3.3.4", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", {
                    relatedTarget: b[0]
                }),
                g = a.Event("show.bs.tab", {
                    relatedTarget: e[0]
                });
            if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);
                this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
                    e.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: b[0]
                    }), b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e[0]
                    })
                })
            }
        }
    }, c.prototype.activate = function (b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
        }
        var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
        g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
        return a.fn.tab = d, this
    };
    var e = function (c) {
        c.preventDefault(), b.call(a(this), "show")
    };
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function (a) {
    "use strict";

    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function (b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.3.4", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getState = function (a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed) return null != c ? e + this.unpin <= f.top ? !1 : "bottom" : a - d >= e + g ? !1 : "bottom";
        var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;
        return null != c && c >= e ? "top" : null != d && i + j >= a - d ? "bottom" : !1
    }, c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = a(document.body).height();
            "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
            var h = this.getState(g, b, e, f);
            if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");
                var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == h && this.$element.offset({
                top: g - b - f
            })
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
        return a.fn.affix = d, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);
(function(e){e.fn.hoverIntent=function(a,l,p){var b={interval:100,sensitivity:6,timeout:0},b="object"===typeof a?e.extend(b,a):e.isFunction(l)?e.extend(b,{over:a,out:l,selector:p}):e.extend(b,{over:a,out:a,selector:l}),f,g,h,k,m=function(b){f=b.pageX;g=b.pageY},n=function(a,d){d.hoverIntent_t=clearTimeout(d.hoverIntent_t);if(Math.sqrt((h-f)*(h-f)+(k-g)*(k-g))<b.sensitivity)return e(d).off("mousemove.hoverIntent",m),d.hoverIntent_s=!0,b.over.apply(d,[a]);h=f;k=g;d.hoverIntent_t=setTimeout(function(){n(a,d)},b.interval)};a=function(a){var d=e.extend({},a),c=this;c.hoverIntent_t&&(c.hoverIntent_t=clearTimeout(c.hoverIntent_t));"mouseenter"===a.type?(h=d.pageX,k=d.pageY,e(c).on("mousemove.hoverIntent",m),c.hoverIntent_s||(c.hoverIntent_t=setTimeout(function(){n(d,c)},b.interval))):(e(c).off("mousemove.hoverIntent",m),c.hoverIntent_s&&(c.hoverIntent_t=setTimeout(function(){c.hoverIntent_t=clearTimeout(c.hoverIntent_t);c.hoverIntent_s=!1;b.out.apply(c,[d])},b.timeout)))};return this.on({"mouseenter.hoverIntent":a,"mouseleave.hoverIntent":a},b.selector)}})(jQuery);
/* qTip2 v2.2.1 | Plugins: tips modal viewport svg imagemap ie6 | Styles: core basic css3 | qtip2.com | Licensed MIT | Sat Sep 06 2014 23:12:07 */ ! function (a, b, c) {
    ! function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], a) : jQuery && !jQuery.fn.qtip && a(jQuery)
    }(function (d) {
        "use strict";

        function e(a, b, c, e) {
            this.id = c, this.target = a, this.tooltip = F, this.elements = {
                target: a
            }, this._id = S + "-" + c, this.timers = {
                img: {}
            }, this.options = b, this.plugins = {}, this.cache = {
                event: {},
                target: d(),
                disabled: E,
                attr: e,
                onTooltip: E,
                lastClass: ""
            }, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = E
        }

        function f(a) {
            return a === F || "object" !== d.type(a)
        }

        function g(a) {
            return !(d.isFunction(a) || a && a.attr || a.length || "object" === d.type(a) && (a.jquery || a.then))
        }

        function h(a) {
            var b, c, e, h;
            return f(a) ? E : (f(a.metadata) && (a.metadata = {
                type: a.metadata
            }), "content" in a && (b = a.content, f(b) || b.jquery || b.done ? b = a.content = {
                text: c = g(b) ? E : b
            } : c = b.text, "ajax" in b && (e = b.ajax, h = e && e.once !== E, delete b.ajax, b.text = function (a, b) {
                var f = c || d(this).attr(b.options.content.attr) || "Loading...",
                    g = d.ajax(d.extend({}, e, {
                        context: b
                    })).then(e.success, F, e.error).then(function (a) {
                        return a && h && b.set("content.text", a), a
                    }, function (a, c, d) {
                        b.destroyed || 0 === a.status || b.set("content.text", c + ": " + d)
                    });
                return h ? f : (b.set("content.text", f), g)
            }), "title" in b && (d.isPlainObject(b.title) && (b.button = b.title.button, b.title = b.title.text), g(b.title || E) && (b.title = E))), "position" in a && f(a.position) && (a.position = {
                my: a.position,
                at: a.position
            }), "show" in a && f(a.show) && (a.show = a.show.jquery ? {
                target: a.show
            } : a.show === D ? {
                ready: D
            } : {
                event: a.show
            }), "hide" in a && f(a.hide) && (a.hide = a.hide.jquery ? {
                target: a.hide
            } : {
                event: a.hide
            }), "style" in a && f(a.style) && (a.style = {
                classes: a.style
            }), d.each(R, function () {
                this.sanitize && this.sanitize(a)
            }), a)
        }

        function i(a, b) {
            for (var c, d = 0, e = a, f = b.split(".") ; e = e[f[d++]];) d < f.length && (c = e);
            return [c || a, f.pop()]
        }

        function j(a, b) {
            var c, d, e;
            for (c in this.checks)
                for (d in this.checks[c]) (e = new RegExp(d, "i").exec(a)) && (b.push(e), ("builtin" === c || this.plugins[c]) && this.checks[c][d].apply(this.plugins[c] || this, b))
        }

        function k(a) {
            return V.concat("").join(a ? "-" + a + " " : " ")
        }

        function l(a, b) {
            return b > 0 ? setTimeout(d.proxy(a, this), b) : void a.call(this)
        }

        function m(a) {
            this.tooltip.hasClass(ab) || (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this.timers.show = l.call(this, function () {
                this.toggle(D, a)
            }, this.options.show.delay))
        }

        function n(a) {
            if (!this.tooltip.hasClass(ab) && !this.destroyed) {
                var b = d(a.relatedTarget),
                    c = b.closest(W)[0] === this.tooltip[0],
                    e = b[0] === this.options.show.target[0];
                if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== b[0] && "mouse" === this.options.position.target && c || this.options.hide.fixed && /mouse(out|leave|move)/.test(a.type) && (c || e)) try {
                    a.preventDefault(), a.stopImmediatePropagation()
                } catch (f) { } else this.timers.hide = l.call(this, function () {
                    this.toggle(E, a)
                }, this.options.hide.delay, this)
            }
        }

        function o(a) {
            !this.tooltip.hasClass(ab) && this.options.hide.inactive && (clearTimeout(this.timers.inactive), this.timers.inactive = l.call(this, function () {
                this.hide(a)
            }, this.options.hide.inactive))
        }

        function p(a) {
            this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(a)
        }

        function q(a, c, e) {
            d(b.body).delegate(a, (c.split ? c : c.join("." + S + " ")) + "." + S, function () {
                var a = y.api[d.attr(this, U)];
                a && !a.disabled && e.apply(a, arguments)
            })
        }

        function r(a, c, f) {
            var g, i, j, k, l, m = d(b.body),
                n = a[0] === b ? m : a,
                o = a.metadata ? a.metadata(f.metadata) : F,
                p = "html5" === f.metadata.type && o ? o[f.metadata.name] : F,
                q = a.data(f.metadata.name || "qtipopts");
            try {
                q = "string" == typeof q ? d.parseJSON(q) : q
            } catch (r) { }
            if (k = d.extend(D, {}, y.defaults, f, "object" == typeof q ? h(q) : F, h(p || o)), i = k.position, k.id = c, "boolean" == typeof k.content.text) {
                if (j = a.attr(k.content.attr), k.content.attr === E || !j) return E;
                k.content.text = j
            }
            if (i.container.length || (i.container = m), i.target === E && (i.target = n), k.show.target === E && (k.show.target = n), k.show.solo === D && (k.show.solo = i.container.closest("body")), k.hide.target === E && (k.hide.target = n), k.position.viewport === D && (k.position.viewport = i.container), i.container = i.container.eq(0), i.at = new A(i.at, D), i.my = new A(i.my), a.data(S))
                if (k.overwrite) a.qtip("destroy", !0);
                else if (k.overwrite === E) return E;
            return a.attr(T, c), k.suppress && (l = a.attr("title")) && a.removeAttr("title").attr(cb, l).attr("title", ""), g = new e(a, k, c, !!j), a.data(S, g), g
        }

        function s(a) {
            return a.charAt(0).toUpperCase() + a.slice(1)
        }

        function t(a, b) {
            var d, e, f = b.charAt(0).toUpperCase() + b.slice(1),
                g = (b + " " + rb.join(f + " ") + f).split(" "),
                h = 0;
            if (qb[b]) return a.css(qb[b]);
            for (; d = g[h++];)
                if ((e = a.css(d)) !== c) return qb[b] = d, e
        }

        function u(a, b) {
            return Math.ceil(parseFloat(t(a, b)))
        }

        function v(a, b) {
            this._ns = "tip", this.options = b, this.offset = b.offset, this.size = [b.width, b.height], this.init(this.qtip = a)
        }

        function w(a, b) {
            this.options = b, this._ns = "-modal", this.init(this.qtip = a)
        }

        function x(a) {
            this._ns = "ie6", this.init(this.qtip = a)
        }
        var y, z, A, B, C, D = !0,
            E = !1,
            F = null,
            G = "x",
            H = "y",
            I = "width",
            J = "height",
            K = "top",
            L = "left",
            M = "bottom",
            N = "right",
            O = "center",
            P = "flipinvert",
            Q = "shift",
            R = {},
            S = "qtip",
            T = "data-hasqtip",
            U = "data-qtip-id",
            V = ["ui-widget", "ui-tooltip"],
            W = "." + S,
            X = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),
            Y = S + "-fixed",
            Z = S + "-default",
            $ = S + "-focus",
            _ = S + "-hover",
            ab = S + "-disabled",
            bb = "_replacedByqTip",
            cb = "oldtitle",
            db = {
                ie: function () {
                    for (var a = 4, c = b.createElement("div") ;
                        (c.innerHTML = "<!--[if gt IE " + a + "]><i></i><![endif]-->") && c.getElementsByTagName("i")[0]; a += 1);
                    return a > 4 ? a : 0 / 0
                }(),
                iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || E
            };
        z = e.prototype, z._when = function (a) {
            return d.when.apply(d, a)
        }, z.render = function (a) {
            if (this.rendered || this.destroyed) return this;
            var b, c = this,
                e = this.options,
                f = this.cache,
                g = this.elements,
                h = e.content.text,
                i = e.content.title,
                j = e.content.button,
                k = e.position,
                l = ("." + this._id + " ", []);
            return d.attr(this.target[0], "aria-describedby", this._id), f.posClass = this._createPosClass((this.position = {
                my: k.my,
                at: k.at
            }).my), this.tooltip = g.tooltip = b = d("<div/>", {
                id: this._id,
                "class": [S, Z, e.style.classes, f.posClass].join(" "),
                width: e.style.width || "",
                height: e.style.height || "",
                tracking: "mouse" === k.target && k.adjust.mouse,
                role: "alert",
                "aria-live": "polite",
                "aria-atomic": E,
                "aria-describedby": this._id + "-content",
                "aria-hidden": D
            }).toggleClass(ab, this.disabled).attr(U, this.id).data(S, this).appendTo(k.container).append(g.content = d("<div />", {
                "class": S + "-content",
                id: this._id + "-content",
                "aria-atomic": D
            })), this.rendered = -1, this.positioning = D, i && (this._createTitle(), d.isFunction(i) || l.push(this._updateTitle(i, E))), j && this._createButton(), d.isFunction(h) || l.push(this._updateContent(h, E)), this.rendered = D, this._setWidget(), d.each(R, function (a) {
                var b;
                "render" === this.initialize && (b = this(c)) && (c.plugins[a] = b)
            }), this._unassignEvents(), this._assignEvents(), this._when(l).then(function () {
                c._trigger("render"), c.positioning = E, c.hiddenDuringWait || !e.show.ready && !a || c.toggle(D, f.event, E), c.hiddenDuringWait = E
            }), y.api[this.id] = this, this
        }, z.destroy = function (a) {
            function b() {
                if (!this.destroyed) {
                    this.destroyed = D;
                    var a, b = this.target,
                        c = b.attr(cb);
                    this.rendered && this.tooltip.stop(1, 0).find("*").remove().end().remove(), d.each(this.plugins, function () {
                        this.destroy && this.destroy()
                    });
                    for (a in this.timers) clearTimeout(this.timers[a]);
                    b.removeData(S).removeAttr(U).removeAttr(T).removeAttr("aria-describedby"), this.options.suppress && c && b.attr("title", c).removeAttr(cb), this._unassignEvents(), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = F, delete y.api[this.id]
                }
            }
            return this.destroyed ? this.target : (a === D && "hide" !== this.triggering || !this.rendered ? b.call(this) : (this.tooltip.one("tooltiphidden", d.proxy(b, this)), !this.triggering && this.hide()), this.target)
        }, B = z.checks = {
            builtin: {
                "^id$": function (a, b, c, e) {
                    var f = c === D ? y.nextid : c,
                        g = S + "-" + f;
                    f !== E && f.length > 0 && !d("#" + g).length ? (this._id = g, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + "-content", this.elements.title[0].id = this._id + "-title")) : a[b] = e
                },
                "^prerender": function (a, b, c) {
                    c && !this.rendered && this.render(this.options.show.ready)
                },
                "^content.text$": function (a, b, c) {
                    this._updateContent(c)
                },
                "^content.attr$": function (a, b, c, d) {
                    this.options.content.text === this.target.attr(d) && this._updateContent(this.target.attr(c))
                },
                "^content.title$": function (a, b, c) {
                    return c ? (c && !this.elements.title && this._createTitle(), void this._updateTitle(c)) : this._removeTitle()
                },
                "^content.button$": function (a, b, c) {
                    this._updateButton(c)
                },
                "^content.title.(text|button)$": function (a, b, c) {
                    this.set("content." + b, c)
                },
                "^position.(my|at)$": function (a, b, c) {
                    "string" == typeof c && (this.position[b] = a[b] = new A(c, "at" === b))
                },
                "^position.container$": function (a, b, c) {
                    this.rendered && this.tooltip.appendTo(c)
                },
                "^show.ready$": function (a, b, c) {
                    c && (!this.rendered && this.render(D) || this.toggle(D))
                },
                "^style.classes$": function (a, b, c, d) {
                    this.rendered && this.tooltip.removeClass(d).addClass(c)
                },
                "^style.(width|height)": function (a, b, c) {
                    this.rendered && this.tooltip.css(b, c)
                },
                "^style.widget|content.title": function () {
                    this.rendered && this._setWidget()
                },
                "^style.def": function (a, b, c) {
                    this.rendered && this.tooltip.toggleClass(Z, !!c)
                },
                "^events.(render|show|move|hide|focus|blur)$": function (a, b, c) {
                    this.rendered && this.tooltip[(d.isFunction(c) ? "" : "un") + "bind"]("tooltip" + b, c)
                },
                "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function () {
                    if (this.rendered) {
                        var a = this.options.position;
                        this.tooltip.attr("tracking", "mouse" === a.target && a.adjust.mouse), this._unassignEvents(), this._assignEvents()
                    }
                }
            }
        }, z.get = function (a) {
            if (this.destroyed) return this;
            var b = i(this.options, a.toLowerCase()),
                c = b[0][b[1]];
            return c.precedance ? c.string() : c
        };
        var eb = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
            fb = /^prerender|show\.ready/i;
        z.set = function (a, b) {
            if (this.destroyed) return this; {
                var c, e = this.rendered,
                    f = E,
                    g = this.options;
                this.checks
            }
            return "string" == typeof a ? (c = a, a = {}, a[c] = b) : a = d.extend({}, a), d.each(a, function (b, c) {
                if (e && fb.test(b)) return void delete a[b];
                var h, j = i(g, b.toLowerCase());
                h = j[0][j[1]], j[0][j[1]] = c && c.nodeType ? d(c) : c, f = eb.test(b) || f, a[b] = [j[0], j[1], c, h]
            }), h(g), this.positioning = D, d.each(a, d.proxy(j, this)), this.positioning = E, this.rendered && this.tooltip[0].offsetWidth > 0 && f && this.reposition("mouse" === g.position.target ? F : this.cache.event), this
        }, z._update = function (a, b) {
            var c = this,
                e = this.cache;
            return this.rendered && a ? (d.isFunction(a) && (a = a.call(this.elements.target, e.event, this) || ""), d.isFunction(a.then) ? (e.waiting = D, a.then(function (a) {
                return e.waiting = E, c._update(a, b)
            }, F, function (a) {
                return c._update(a, b)
            })) : a === E || !a && "" !== a ? E : (a.jquery && a.length > 0 ? b.empty().append(a.css({
                display: "block",
                visibility: "visible"
            })) : b.html(a), this._waitForContent(b).then(function (a) {
                c.rendered && c.tooltip[0].offsetWidth > 0 && c.reposition(e.event, !a.length)
            }))) : E
        }, z._waitForContent = function (a) {
            var b = this.cache;
            return b.waiting = D, (d.fn.imagesLoaded ? a.imagesLoaded() : d.Deferred().resolve([])).done(function () {
                b.waiting = E
            }).promise()
        }, z._updateContent = function (a, b) {
            this._update(a, this.elements.content, b)
        }, z._updateTitle = function (a, b) {
            this._update(a, this.elements.title, b) === E && this._removeTitle(E)
        }, z._createTitle = function () {
            var a = this.elements,
                b = this._id + "-title";
            a.titlebar && this._removeTitle(), a.titlebar = d("<div />", {
                "class": S + "-titlebar " + (this.options.style.widget ? k("header") : "")
            }).append(a.title = d("<div />", {
                id: b,
                "class": S + "-title",
                "aria-atomic": D
            })).insertBefore(a.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function (a) {
                d(this).toggleClass("ui-state-active ui-state-focus", "down" === a.type.substr(-4))
            }).delegate(".qtip-close", "mouseover mouseout", function (a) {
                d(this).toggleClass("ui-state-hover", "mouseover" === a.type)
            }), this.options.content.button && this._createButton()
        }, z._removeTitle = function (a) {
            var b = this.elements;
            b.title && (b.titlebar.remove(), b.titlebar = b.title = b.button = F, a !== E && this.reposition())
        }, z._createPosClass = function (a) {
            return S + "-pos-" + (a || this.options.position.my).abbrev()
        }, z.reposition = function (c, e) {
            if (!this.rendered || this.positioning || this.destroyed) return this;
            this.positioning = D;
            var f, g, h, i, j = this.cache,
                k = this.tooltip,
                l = this.options.position,
                m = l.target,
                n = l.my,
                o = l.at,
                p = l.viewport,
                q = l.container,
                r = l.adjust,
                s = r.method.split(" "),
                t = k.outerWidth(E),
                u = k.outerHeight(E),
                v = 0,
                w = 0,
                x = k.css("position"),
                y = {
                    left: 0,
                    top: 0
                },
                z = k[0].offsetWidth > 0,
                A = c && "scroll" === c.type,
                B = d(a),
                C = q[0].ownerDocument,
                F = this.mouse;
            if (d.isArray(m) && 2 === m.length) o = {
                x: L,
                y: K
            }, y = {
                left: m[0],
                top: m[1]
            };
            else if ("mouse" === m) o = {
                x: L,
                y: K
            }, (!r.mouse || this.options.hide.distance) && j.origin && j.origin.pageX ? c = j.origin : !c || c && ("resize" === c.type || "scroll" === c.type) ? c = j.event : F && F.pageX && (c = F), "static" !== x && (y = q.offset()), C.body.offsetWidth !== (a.innerWidth || C.documentElement.clientWidth) && (g = d(b.body).offset()), y = {
                left: c.pageX - y.left + (g && g.left || 0),
                top: c.pageY - y.top + (g && g.top || 0)
            }, r.mouse && A && F && (y.left -= (F.scrollX || 0) - B.scrollLeft(), y.top -= (F.scrollY || 0) - B.scrollTop());
            else {
                if ("event" === m ? c && c.target && "scroll" !== c.type && "resize" !== c.type ? j.target = d(c.target) : c.target || (j.target = this.elements.target) : "event" !== m && (j.target = d(m.jquery ? m : this.elements.target)), m = j.target, m = d(m).eq(0), 0 === m.length) return this;
                m[0] === b || m[0] === a ? (v = db.iOS ? a.innerWidth : m.width(), w = db.iOS ? a.innerHeight : m.height(), m[0] === a && (y = {
                    top: (p || m).scrollTop(),
                    left: (p || m).scrollLeft()
                })) : R.imagemap && m.is("area") ? f = R.imagemap(this, m, o, R.viewport ? s : E) : R.svg && m && m[0].ownerSVGElement ? f = R.svg(this, m, o, R.viewport ? s : E) : (v = m.outerWidth(E), w = m.outerHeight(E), y = m.offset()), f && (v = f.width, w = f.height, g = f.offset, y = f.position), y = this.reposition.offset(m, y, q), (db.iOS > 3.1 && db.iOS < 4.1 || db.iOS >= 4.3 && db.iOS < 4.33 || !db.iOS && "fixed" === x) && (y.left -= B.scrollLeft(), y.top -= B.scrollTop()), (!f || f && f.adjustable !== E) && (y.left += o.x === N ? v : o.x === O ? v / 2 : 0, y.top += o.y === M ? w : o.y === O ? w / 2 : 0)
            }
            return y.left += r.x + (n.x === N ? -t : n.x === O ? -t / 2 : 0), y.top += r.y + (n.y === M ? -u : n.y === O ? -u / 2 : 0), R.viewport ? (h = y.adjusted = R.viewport(this, y, l, v, w, t, u), g && h.left && (y.left += g.left), g && h.top && (y.top += g.top), h.my && (this.position.my = h.my)) : y.adjusted = {
                left: 0,
                top: 0
            }, j.posClass !== (i = this._createPosClass(this.position.my)) && k.removeClass(j.posClass).addClass(j.posClass = i), this._trigger("move", [y, p.elem || p], c) ? (delete y.adjusted, e === E || !z || isNaN(y.left) || isNaN(y.top) || "mouse" === m || !d.isFunction(l.effect) ? k.css(y) : d.isFunction(l.effect) && (l.effect.call(k, this, d.extend({}, y)), k.queue(function (a) {
                d(this).css({
                    opacity: "",
                    height: ""
                }), db.ie && this.style.removeAttribute("filter"), a()
            })), this.positioning = E, this) : this
        }, z.reposition.offset = function (a, c, e) {
            function f(a, b) {
                c.left += b * a.scrollLeft(), c.top += b * a.scrollTop()
            }
            if (!e[0]) return c;
            var g, h, i, j, k = d(a[0].ownerDocument),
                l = !!db.ie && "CSS1Compat" !== b.compatMode,
                m = e[0];
            do "static" !== (h = d.css(m, "position")) && ("fixed" === h ? (i = m.getBoundingClientRect(), f(k, -1)) : (i = d(m).position(), i.left += parseFloat(d.css(m, "borderLeftWidth")) || 0, i.top += parseFloat(d.css(m, "borderTopWidth")) || 0), c.left -= i.left + (parseFloat(d.css(m, "marginLeft")) || 0), c.top -= i.top + (parseFloat(d.css(m, "marginTop")) || 0), g || "hidden" === (j = d.css(m, "overflow")) || "visible" === j || (g = d(m))); while (m = m.offsetParent);
            return g && (g[0] !== k[0] || l) && f(g, 1), c
        };
        var gb = (A = z.reposition.Corner = function (a, b) {
            a = ("" + a).replace(/([A-Z])/, " $1").replace(/middle/gi, O).toLowerCase(), this.x = (a.match(/left|right/i) || a.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (a.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(), this.forceY = !!b;
            var c = a.charAt(0);
            this.precedance = "t" === c || "b" === c ? H : G
        }).prototype;
        gb.invert = function (a, b) {
            this[a] = this[a] === L ? N : this[a] === N ? L : b || this[a]
        }, gb.string = function (a) {
            var b = this.x,
                c = this.y,
                d = b !== c ? "center" === b || "center" !== c && (this.precedance === H || this.forceY) ? [c, b] : [b, c] : [b];
            return a !== !1 ? d.join(" ") : d
        }, gb.abbrev = function () {
            var a = this.string(!1);
            return a[0].charAt(0) + (a[1] && a[1].charAt(0) || "")
        }, gb.clone = function () {
            return new A(this.string(), this.forceY)
        }, z.toggle = function (a, c) {
            var e = this.cache,
                f = this.options,
                g = this.tooltip;
            if (c) {
                if (/over|enter/.test(c.type) && e.event && /out|leave/.test(e.event.type) && f.show.target.add(c.target).length === f.show.target.length && g.has(c.relatedTarget).length) return this;
                e.event = d.event.fix(c)
            }
            if (this.waiting && !a && (this.hiddenDuringWait = D), !this.rendered) return a ? this.render(1) : this;
            if (this.destroyed || this.disabled) return this;
            var h, i, j, k = a ? "show" : "hide",
                l = this.options[k],
                m = (this.options[a ? "hide" : "show"], this.options.position),
                n = this.options.content,
                o = this.tooltip.css("width"),
                p = this.tooltip.is(":visible"),
                q = a || 1 === l.target.length,
                r = !c || l.target.length < 2 || e.target[0] === c.target;
            return (typeof a).search("boolean|number") && (a = !p), h = !g.is(":animated") && p === a && r, i = h ? F : !!this._trigger(k, [90]), this.destroyed ? this : (i !== E && a && this.focus(c), !i || h ? this : (d.attr(g[0], "aria-hidden", !a), a ? (this.mouse && (e.origin = d.event.fix(this.mouse)), d.isFunction(n.text) && this._updateContent(n.text, E), d.isFunction(n.title) && this._updateTitle(n.title, E), !C && "mouse" === m.target && m.adjust.mouse && (d(b).bind("mousemove." + S, this._storeMouse), C = D), o || g.css("width", g.outerWidth(E)), this.reposition(c, arguments[2]), o || g.css("width", ""), l.solo && ("string" == typeof l.solo ? d(l.solo) : d(W, l.solo)).not(g).not(l.target).qtip("hide", d.Event("tooltipsolo"))) : (clearTimeout(this.timers.show), delete e.origin, C && !d(W + '[tracking="true"]:visible', l.solo).not(g).length && (d(b).unbind("mousemove." + S), C = E), this.blur(c)), j = d.proxy(function () {
                a ? (db.ie && g[0].style.removeAttribute("filter"), g.css("overflow", ""), "string" == typeof l.autofocus && d(this.options.show.autofocus, g).focus(), this.options.show.target.trigger("qtip-" + this.id + "-inactive")) : g.css({
                    display: "",
                    visibility: "",
                    opacity: "",
                    left: "",
                    top: ""
                }), this._trigger(a ? "visible" : "hidden")
            }, this), l.effect === E || q === E ? (g[k](), j()) : d.isFunction(l.effect) ? (g.stop(1, 1), l.effect.call(g, this), g.queue("fx", function (a) {
                j(), a()
            })) : g.fadeTo(90, a ? 1 : 0, j), a && l.target.trigger("qtip-" + this.id + "-inactive"), this))
        }, z.show = function (a) {
            return this.toggle(D, a)
        }, z.hide = function (a) {
            return this.toggle(E, a)
        }, z.focus = function (a) {
            if (!this.rendered || this.destroyed) return this;
            var b = d(W),
                c = this.tooltip,
                e = parseInt(c[0].style.zIndex, 10),
                f = y.zindex + b.length;
            return c.hasClass($) || this._trigger("focus", [f], a) && (e !== f && (b.each(function () {
                this.style.zIndex > e && (this.style.zIndex = this.style.zIndex - 1)
            }), b.filter("." + $).qtip("blur", a)), c.addClass($)[0].style.zIndex = f), this
        }, z.blur = function (a) {
            return !this.rendered || this.destroyed ? this : (this.tooltip.removeClass($), this._trigger("blur", [this.tooltip.css("zIndex")], a), this)
        }, z.disable = function (a) {
            return this.destroyed ? this : ("toggle" === a ? a = !(this.rendered ? this.tooltip.hasClass(ab) : this.disabled) : "boolean" != typeof a && (a = D), this.rendered && this.tooltip.toggleClass(ab, a).attr("aria-disabled", a), this.disabled = !!a, this)
        }, z.enable = function () {
            return this.disable(E)
        }, z._createButton = function () {
            var a = this,
                b = this.elements,
                c = b.tooltip,
                e = this.options.content.button,
                f = "string" == typeof e,
                g = f ? e : "Close tooltip";
            b.button && b.button.remove(), b.button = e.jquery ? e : d("<a />", {
                "class": "qtip-close " + (this.options.style.widget ? "" : S + "-icon"),
                title: g,
                "aria-label": g
            }).prepend(d("<span />", {
                "class": "ui-icon ui-icon-close",
                html: "&times;"
            })), b.button.appendTo(b.titlebar || c).attr("role", "button").click(function (b) {
                return c.hasClass(ab) || a.hide(b), E
            })
        }, z._updateButton = function (a) {
            if (!this.rendered) return E;
            var b = this.elements.button;
            a ? this._createButton() : b.remove()
        }, z._setWidget = function () {
            var a = this.options.style.widget,
                b = this.elements,
                c = b.tooltip,
                d = c.hasClass(ab);
            c.removeClass(ab), ab = a ? "ui-state-disabled" : "qtip-disabled", c.toggleClass(ab, d), c.toggleClass("ui-helper-reset " + k(), a).toggleClass(Z, this.options.style.def && !a), b.content && b.content.toggleClass(k("content"), a), b.titlebar && b.titlebar.toggleClass(k("header"), a), b.button && b.button.toggleClass(S + "-icon", !a)
        }, z._storeMouse = function (a) {
            return (this.mouse = d.event.fix(a)).type = "mousemove", this
        }, z._bind = function (a, b, c, e, f) {
            if (a && c && b.length) {
                var g = "." + this._id + (e ? "-" + e : "");
                return d(a).bind((b.split ? b : b.join(g + " ")) + g, d.proxy(c, f || this)), this
            }
        }, z._unbind = function (a, b) {
            return a && d(a).unbind("." + this._id + (b ? "-" + b : "")), this
        }, z._trigger = function (a, b, c) {
            var e = d.Event("tooltip" + a);
            return e.originalEvent = c && d.extend({}, c) || this.cache.event || F, this.triggering = a, this.tooltip.trigger(e, [this].concat(b || [])), this.triggering = E, !e.isDefaultPrevented()
        }, z._bindEvents = function (a, b, c, e, f, g) {
            var h = c.filter(e).add(e.filter(c)),
                i = [];
            h.length && (d.each(b, function (b, c) {
                var e = d.inArray(c, a);
                e > -1 && i.push(a.splice(e, 1)[0])
            }), i.length && (this._bind(h, i, function (a) {
                var b = this.rendered ? this.tooltip[0].offsetWidth > 0 : !1;
                (b ? g : f).call(this, a)
            }), c = c.not(h), e = e.not(h))), this._bind(c, a, f), this._bind(e, b, g)
        }, z._assignInitialEvents = function (a) {
            function b(a) {
                return this.disabled || this.destroyed ? E : (this.cache.event = a && d.event.fix(a), this.cache.target = a && d(a.target), clearTimeout(this.timers.show), void (this.timers.show = l.call(this, function () {
                    this.render("object" == typeof a || c.show.ready)
                }, c.prerender ? 0 : c.show.delay)))
            }
            var c = this.options,
                e = c.show.target,
                f = c.hide.target,
                g = c.show.event ? d.trim("" + c.show.event).split(" ") : [],
                h = c.hide.event ? d.trim("" + c.hide.event).split(" ") : [];
            this._bind(this.elements.target, ["remove", "removeqtip"], function () {
                this.destroy(!0)
            }, "destroy"), /mouse(over|enter)/i.test(c.show.event) && !/mouse(out|leave)/i.test(c.hide.event) && h.push("mouseleave"), this._bind(e, "mousemove", function (a) {
                this._storeMouse(a), this.cache.onTarget = D
            }), this._bindEvents(g, h, e, f, b, function () {
                return this.timers ? void clearTimeout(this.timers.show) : E
            }), (c.show.ready || c.prerender) && b.call(this, a)
        }, z._assignEvents = function () {
            var c = this,
                e = this.options,
                f = e.position,
                g = this.tooltip,
                h = e.show.target,
                i = e.hide.target,
                j = f.container,
                k = f.viewport,
                l = d(b),
                q = (d(b.body), d(a)),
                r = e.show.event ? d.trim("" + e.show.event).split(" ") : [],
                s = e.hide.event ? d.trim("" + e.hide.event).split(" ") : [];
            d.each(e.events, function (a, b) {
                c._bind(g, "toggle" === a ? ["tooltipshow", "tooltiphide"] : ["tooltip" + a], b, null, g)
            }), /mouse(out|leave)/i.test(e.hide.event) && "window" === e.hide.leave && this._bind(l, ["mouseout", "blur"], function (a) {
                /select|option/.test(a.target.nodeName) || a.relatedTarget || this.hide(a)
            }), e.hide.fixed ? i = i.add(g.addClass(Y)) : /mouse(over|enter)/i.test(e.show.event) && this._bind(i, "mouseleave", function () {
                clearTimeout(this.timers.show)
            }), ("" + e.hide.event).indexOf("unfocus") > -1 && this._bind(j.closest("html"), ["mousedown", "touchstart"], function (a) {
                var b = d(a.target),
                    c = this.rendered && !this.tooltip.hasClass(ab) && this.tooltip[0].offsetWidth > 0,
                    e = b.parents(W).filter(this.tooltip[0]).length > 0;
                b[0] === this.target[0] || b[0] === this.tooltip[0] || e || this.target.has(b[0]).length || !c || this.hide(a)
            }), "number" == typeof e.hide.inactive && (this._bind(h, "qtip-" + this.id + "-inactive", o, "inactive"), this._bind(i.add(g), y.inactiveEvents, o)), this._bindEvents(r, s, h, i, m, n), this._bind(h.add(g), "mousemove", function (a) {
                if ("number" == typeof e.hide.distance) {
                    var b = this.cache.origin || {},
                        c = this.options.hide.distance,
                        d = Math.abs;
                    (d(a.pageX - b.pageX) >= c || d(a.pageY - b.pageY) >= c) && this.hide(a)
                }
                this._storeMouse(a)
            }), "mouse" === f.target && f.adjust.mouse && (e.hide.event && this._bind(h, ["mouseenter", "mouseleave"], function (a) {
                return this.cache ? void (this.cache.onTarget = "mouseenter" === a.type) : E
            }), this._bind(l, "mousemove", function (a) {
                this.rendered && this.cache.onTarget && !this.tooltip.hasClass(ab) && this.tooltip[0].offsetWidth > 0 && this.reposition(a)
            })), (f.adjust.resize || k.length) && this._bind(d.event.special.resize ? k : q, "resize", p), f.adjust.scroll && this._bind(q.add(f.container), "scroll", p)
        }, z._unassignEvents = function () {
            var c = this.options,
                e = c.show.target,
                f = c.hide.target,
                g = d.grep([this.elements.target[0], this.rendered && this.tooltip[0], c.position.container[0], c.position.viewport[0], c.position.container.closest("html")[0], a, b], function (a) {
                    return "object" == typeof a
                });
            e && e.toArray && (g = g.concat(e.toArray())), f && f.toArray && (g = g.concat(f.toArray())), this._unbind(g)._unbind(g, "destroy")._unbind(g, "inactive")
        }, d(function () {
            q(W, ["mouseenter", "mouseleave"], function (a) {
                var b = "mouseenter" === a.type,
                    c = d(a.currentTarget),
                    e = d(a.relatedTarget || a.target),
                    f = this.options;
                b ? (this.focus(a), c.hasClass(Y) && !c.hasClass(ab) && clearTimeout(this.timers.hide)) : "mouse" === f.position.target && f.position.adjust.mouse && f.hide.event && f.show.target && !e.closest(f.show.target[0]).length && this.hide(a), c.toggleClass(_, b)
            }), q("[" + U + "]", X, o)
        }), y = d.fn.qtip = function (a, b, e) {
            var f = ("" + a).toLowerCase(),
                g = F,
                i = d.makeArray(arguments).slice(1),
                j = i[i.length - 1],
                k = this[0] ? d.data(this[0], S) : F;
            return !arguments.length && k || "api" === f ? k : "string" == typeof a ? (this.each(function () {
                var a = d.data(this, S);
                if (!a) return D;
                if (j && j.timeStamp && (a.cache.event = j), !b || "option" !== f && "options" !== f) a[f] && a[f].apply(a, i);
                else {
                    if (e === c && !d.isPlainObject(b)) return g = a.get(b), E;
                    a.set(b, e)
                }
            }), g !== F ? g : this) : "object" != typeof a && arguments.length ? void 0 : (k = h(d.extend(D, {}, a)), this.each(function (a) {
                var b, c;
                return c = d.isArray(k.id) ? k.id[a] : k.id, c = !c || c === E || c.length < 1 || y.api[c] ? y.nextid++ : c, b = r(d(this), c, k), b === E ? D : (y.api[c] = b, d.each(R, function () {
                    "initialize" === this.initialize && this(b)
                }), void b._assignInitialEvents(j))
            }))
        }, d.qtip = e, y.api = {}, d.each({
            attr: function (a, b) {
                if (this.length) {
                    var c = this[0],
                        e = "title",
                        f = d.data(c, "qtip");
                    if (a === e && f && "object" == typeof f && f.options.suppress) return arguments.length < 2 ? d.attr(c, cb) : (f && f.options.content.attr === e && f.cache.attr && f.set("content.text", b), this.attr(cb, b))
                }
                return d.fn["attr" + bb].apply(this, arguments)
            },
            clone: function (a) {
                var b = (d([]), d.fn["clone" + bb].apply(this, arguments));
                return a || b.filter("[" + cb + "]").attr("title", function () {
                    return d.attr(this, cb)
                }).removeAttr(cb), b
            }
        }, function (a, b) {
            if (!b || d.fn[a + bb]) return D;
            var c = d.fn[a + bb] = d.fn[a];
            d.fn[a] = function () {
                return b.apply(this, arguments) || c.apply(this, arguments)
            }
        }), d.ui || (d["cleanData" + bb] = d.cleanData, d.cleanData = function (a) {
            for (var b, c = 0;
                (b = d(a[c])).length; c++)
                if (b.attr(T)) try {
                    b.triggerHandler("removeqtip")
                } catch (e) { }
            d["cleanData" + bb].apply(this, arguments)
        }), y.version = "2.2.1", y.nextid = 0, y.inactiveEvents = X, y.zindex = 15e3, y.defaults = {
            prerender: E,
            id: E,
            overwrite: D,
            suppress: D,
            content: {
                text: D,
                attr: "title",
                title: E,
                button: E
            },
            position: {
                my: "top left",
                at: "bottom right",
                target: E,
                container: E,
                viewport: E,
                adjust: {
                    x: 0,
                    y: 0,
                    mouse: D,
                    scroll: D,
                    resize: D,
                    method: "flipinvert flipinvert"
                },
                effect: function (a, b) {
                    d(this).animate(b, {
                        duration: 200,
                        queue: E
                    })
                }
            },
            show: {
                target: E,
                event: "mouseenter",
                effect: D,
                delay: 90,
                solo: E,
                ready: E,
                autofocus: E
            },
            hide: {
                target: E,
                event: "mouseleave",
                effect: D,
                delay: 0,
                fixed: E,
                inactive: E,
                leave: "window",
                distance: E
            },
            style: {
                classes: "",
                widget: E,
                width: E,
                height: E,
                def: D
            },
            events: {
                render: F,
                move: F,
                show: F,
                hide: F,
                toggle: F,
                visible: F,
                hidden: F,
                focus: F,
                blur: F
            }
        };
        var hb, ib = "margin",
            jb = "border",
            kb = "color",
            lb = "background-color",
            mb = "transparent",
            nb = " !important",
            ob = !!b.createElement("canvas").getContext,
            pb = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,
            qb = {},
            rb = ["Webkit", "O", "Moz", "ms"];
        if (ob) var sb = a.devicePixelRatio || 1,
            tb = function () {
                var a = b.createElement("canvas").getContext("2d");
                return a.backingStorePixelRatio || a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || 1
            }(),
            ub = sb / tb;
        else var vb = function (a, b, c) {
            return "<qtipvml:" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (b || "") + ' style="behavior: url(#default#VML); ' + (c || "") + '" />'
        };
        d.extend(v.prototype, {
            init: function (a) {
                var b, c;
                c = this.element = a.elements.tip = d("<div />", {
                    "class": S + "-tip"
                }).prependTo(a.tooltip), ob ? (b = d("<canvas />").appendTo(this.element)[0].getContext("2d"), b.lineJoin = "miter", b.miterLimit = 1e5, b.save()) : (b = vb("shape", 'coordorigin="0,0"', "position:absolute;"), this.element.html(b + b), a._bind(d("*", c).add(c), ["click", "mousedown"], function (a) {
                    a.stopPropagation()
                }, this._ns)), a._bind(a.tooltip, "tooltipmove", this.reposition, this._ns, this), this.create()
            },
            _swapDimensions: function () {
                this.size[0] = this.options.height, this.size[1] = this.options.width
            },
            _resetDimensions: function () {
                this.size[0] = this.options.width, this.size[1] = this.options.height
            },
            _useTitle: function (a) {
                var b = this.qtip.elements.titlebar;
                return b && (a.y === K || a.y === O && this.element.position().top + this.size[1] / 2 + this.options.offset < b.outerHeight(D))
            },
            _parseCorner: function (a) {
                var b = this.qtip.options.position.my;
                return a === E || b === E ? a = E : a === D ? a = new A(b.string()) : a.string || (a = new A(a), a.fixed = D), a
            },
            _parseWidth: function (a, b, c) {
                var d = this.qtip.elements,
                    e = jb + s(b) + "Width";
                return (c ? u(c, e) : u(d.content, e) || u(this._useTitle(a) && d.titlebar || d.content, e) || u(d.tooltip, e)) || 0
            },
            _parseRadius: function (a) {
                var b = this.qtip.elements,
                    c = jb + s(a.y) + s(a.x) + "Radius";
                return db.ie < 9 ? 0 : u(this._useTitle(a) && b.titlebar || b.content, c) || u(b.tooltip, c) || 0
            },
            _invalidColour: function (a, b, c) {
                var d = a.css(b);
                return !d || c && d === a.css(c) || pb.test(d) ? E : d
            },
            _parseColours: function (a) {
                var b = this.qtip.elements,
                    c = this.element.css("cssText", ""),
                    e = jb + s(a[a.precedance]) + s(kb),
                    f = this._useTitle(a) && b.titlebar || b.content,
                    g = this._invalidColour,
                    h = [];
                return h[0] = g(c, lb) || g(f, lb) || g(b.content, lb) || g(b.tooltip, lb) || c.css(lb), h[1] = g(c, e, kb) || g(f, e, kb) || g(b.content, e, kb) || g(b.tooltip, e, kb) || b.tooltip.css(e), d("*", c).add(c).css("cssText", lb + ":" + mb + nb + ";" + jb + ":0" + nb + ";"), h
            },
            _calculateSize: function (a) {
                var b, c, d, e = a.precedance === H,
                    f = this.options.width,
                    g = this.options.height,
                    h = "c" === a.abbrev(),
                    i = (e ? f : g) * (h ? .5 : 1),
                    j = Math.pow,
                    k = Math.round,
                    l = Math.sqrt(j(i, 2) + j(g, 2)),
                    m = [this.border / i * l, this.border / g * l];
                return m[2] = Math.sqrt(j(m[0], 2) - j(this.border, 2)), m[3] = Math.sqrt(j(m[1], 2) - j(this.border, 2)), b = l + m[2] + m[3] + (h ? 0 : m[0]), c = b / l, d = [k(c * f), k(c * g)], e ? d : d.reverse()
            },
            _calculateTip: function (a, b, c) {
                c = c || 1, b = b || this.size;
                var d = b[0] * c,
                    e = b[1] * c,
                    f = Math.ceil(d / 2),
                    g = Math.ceil(e / 2),
                    h = {
                        br: [0, 0, d, e, d, 0],
                        bl: [0, 0, d, 0, 0, e],
                        tr: [0, e, d, 0, d, e],
                        tl: [0, 0, 0, e, d, e],
                        tc: [0, e, f, 0, d, e],
                        bc: [0, 0, d, 0, f, e],
                        rc: [0, 0, d, g, 0, e],
                        lc: [d, 0, d, e, 0, g]
                    };
                return h.lt = h.br, h.rt = h.bl, h.lb = h.tr, h.rb = h.tl, h[a.abbrev()]
            },
            _drawCoords: function (a, b) {
                a.beginPath(), a.moveTo(b[0], b[1]), a.lineTo(b[2], b[3]), a.lineTo(b[4], b[5]), a.closePath()
            },
            create: function () {
                var a = this.corner = (ob || db.ie) && this._parseCorner(this.options.corner);
                return (this.enabled = !!this.corner && "c" !== this.corner.abbrev()) && (this.qtip.cache.corner = a.clone(), this.update()), this.element.toggle(this.enabled), this.corner
            },
            update: function (b, c) {
                if (!this.enabled) return this;
                var e, f, g, h, i, j, k, l, m = this.qtip.elements,
                    n = this.element,
                    o = n.children(),
                    p = this.options,
                    q = this.size,
                    r = p.mimic,
                    s = Math.round;
                b || (b = this.qtip.cache.corner || this.corner), r === E ? r = b : (r = new A(r), r.precedance = b.precedance, "inherit" === r.x ? r.x = b.x : "inherit" === r.y ? r.y = b.y : r.x === r.y && (r[b.precedance] = b[b.precedance])), f = r.precedance, b.precedance === G ? this._swapDimensions() : this._resetDimensions(), e = this.color = this._parseColours(b), e[1] !== mb ? (l = this.border = this._parseWidth(b, b[b.precedance]), p.border && 1 > l && !pb.test(e[1]) && (e[0] = e[1]), this.border = l = p.border !== D ? p.border : l) : this.border = l = 0, k = this.size = this._calculateSize(b), n.css({
                    width: k[0],
                    height: k[1],
                    lineHeight: k[1] + "px"
                }), j = b.precedance === H ? [s(r.x === L ? l : r.x === N ? k[0] - q[0] - l : (k[0] - q[0]) / 2), s(r.y === K ? k[1] - q[1] : 0)] : [s(r.x === L ? k[0] - q[0] : 0), s(r.y === K ? l : r.y === M ? k[1] - q[1] - l : (k[1] - q[1]) / 2)], ob ? (g = o[0].getContext("2d"), g.restore(), g.save(), g.clearRect(0, 0, 6e3, 6e3), h = this._calculateTip(r, q, ub), i = this._calculateTip(r, this.size, ub), o.attr(I, k[0] * ub).attr(J, k[1] * ub), o.css(I, k[0]).css(J, k[1]), this._drawCoords(g, i), g.fillStyle = e[1], g.fill(), g.translate(j[0] * ub, j[1] * ub), this._drawCoords(g, h), g.fillStyle = e[0], g.fill()) : (h = this._calculateTip(r), h = "m" + h[0] + "," + h[1] + " l" + h[2] + "," + h[3] + " " + h[4] + "," + h[5] + " xe", j[2] = l && /^(r|b)/i.test(b.string()) ? 8 === db.ie ? 2 : 1 : 0, o.css({
                    coordsize: k[0] + l + " " + (k[1] + l),
                    antialias: "" + (r.string().indexOf(O) > -1),
                    left: j[0] - j[2] * Number(f === G),
                    top: j[1] - j[2] * Number(f === H),
                    width: k[0] + l,
                    height: k[1] + l
                }).each(function (a) {
                    var b = d(this);
                    b[b.prop ? "prop" : "attr"]({
                        coordsize: k[0] + l + " " + (k[1] + l),
                        path: h,
                        fillcolor: e[0],
                        filled: !!a,
                        stroked: !a
                    }).toggle(!(!l && !a)), !a && b.html(vb("stroke", 'weight="' + 2 * l + 'px" color="' + e[1] + '" miterlimit="1000" joinstyle="miter"'))
                })), a.opera && setTimeout(function () {
                    m.tip.css({
                        display: "inline-block",
                        visibility: "visible"
                    })
                }, 1), c !== E && this.calculate(b, k)
            },
            calculate: function (a, b) {
                if (!this.enabled) return E;
                var c, e, f = this,
                    g = this.qtip.elements,
                    h = this.element,
                    i = this.options.offset,
                    j = (g.tooltip.hasClass("ui-widget"), {});
                return a = a || this.corner, c = a.precedance, b = b || this._calculateSize(a), e = [a.x, a.y], c === G && e.reverse(), d.each(e, function (d, e) {
                    var h, k, l;
                    e === O ? (h = c === H ? L : K, j[h] = "50%", j[ib + "-" + h] = -Math.round(b[c === H ? 0 : 1] / 2) + i) : (h = f._parseWidth(a, e, g.tooltip), k = f._parseWidth(a, e, g.content), l = f._parseRadius(a), j[e] = Math.max(-f.border, d ? k : i + (l > h ? l : -h)))
                }), j[a[c]] -= b[c === G ? 0 : 1], h.css({
                    margin: "",
                    top: "",
                    bottom: "",
                    left: "",
                    right: ""
                }).css(j), j
            },
            reposition: function (a, b, d) {
                function e(a, b, c, d, e) {
                    a === Q && j.precedance === b && k[d] && j[c] !== O ? j.precedance = j.precedance === G ? H : G : a !== Q && k[d] && (j[b] = j[b] === O ? k[d] > 0 ? d : e : j[b] === d ? e : d)
                }

                function f(a, b, e) {
                    j[a] === O ? p[ib + "-" + b] = o[a] = g[ib + "-" + b] - k[b] : (h = g[e] !== c ? [k[b], -g[b]] : [-k[b], g[b]], (o[a] = Math.max(h[0], h[1])) > h[0] && (d[b] -= k[b], o[b] = E), p[g[e] !== c ? e : b] = o[a])
                }
                if (this.enabled) {
                    var g, h, i = b.cache,
                        j = this.corner.clone(),
                        k = d.adjusted,
                        l = b.options.position.adjust.method.split(" "),
                        m = l[0],
                        n = l[1] || l[0],
                        o = {
                            left: E,
                            top: E,
                            x: 0,
                            y: 0
                        },
                        p = {};
                    this.corner.fixed !== D && (e(m, G, H, L, N), e(n, H, G, K, M), (j.string() !== i.corner.string() || i.cornerTop !== k.top || i.cornerLeft !== k.left) && this.update(j, E)), g = this.calculate(j), g.right !== c && (g.left = -g.right), g.bottom !== c && (g.top = -g.bottom), g.user = this.offset, (o.left = m === Q && !!k.left) && f(G, L, N), (o.top = n === Q && !!k.top) && f(H, K, M), this.element.css(p).toggle(!(o.x && o.y || j.x === O && o.y || j.y === O && o.x)), d.left -= g.left.charAt ? g.user : m !== Q || o.top || !o.left && !o.top ? g.left + this.border : 0, d.top -= g.top.charAt ? g.user : n !== Q || o.left || !o.left && !o.top ? g.top + this.border : 0, i.cornerLeft = k.left, i.cornerTop = k.top, i.corner = j.clone()
                }
            },
            destroy: function () {
                this.qtip._unbind(this.qtip.tooltip, this._ns), this.qtip.elements.tip && this.qtip.elements.tip.find("*").remove().end().remove()
            }
        }), hb = R.tip = function (a) {
            return new v(a, a.options.style.tip)
        }, hb.initialize = "render", hb.sanitize = function (a) {
            if (a.style && "tip" in a.style) {
                var b = a.style.tip;
                "object" != typeof b && (b = a.style.tip = {
                    corner: b
                }), /string|boolean/i.test(typeof b.corner) || (b.corner = D)
            }
        }, B.tip = {
            "^position.my|style.tip.(corner|mimic|border)$": function () {
                this.create(), this.qtip.reposition()
            },
            "^style.tip.(height|width)$": function (a) {
                this.size = [a.width, a.height], this.update(), this.qtip.reposition()
            },
            "^content.title|style.(classes|widget)$": function () {
                this.update()
            }
        }, d.extend(D, y.defaults, {
            style: {
                tip: {
                    corner: D,
                    mimic: E,
                    width: 6,
                    height: 6,
                    border: D,
                    offset: 0
                }
            }
        });
        var wb, xb, yb = "qtip-modal",
            zb = "." + yb;
        xb = function () {
            function a(a) {
                if (d.expr[":"].focusable) return d.expr[":"].focusable;
                var b, c, e, f = !isNaN(d.attr(a, "tabindex")),
                    g = a.nodeName && a.nodeName.toLowerCase();
                return "area" === g ? (b = a.parentNode, c = b.name, a.href && c && "map" === b.nodeName.toLowerCase() ? (e = d("img[usemap=#" + c + "]")[0], !!e && e.is(":visible")) : !1) : /input|select|textarea|button|object/.test(g) ? !a.disabled : "a" === g ? a.href || f : f
            }

            function c(a) {
                k.length < 1 && a.length ? a.not("body").blur() : k.first().focus()
            }

            function e(a) {
                if (i.is(":visible")) {
                    var b, e = d(a.target),
                        h = f.tooltip,
                        j = e.closest(W);
                    b = j.length < 1 ? E : parseInt(j[0].style.zIndex, 10) > parseInt(h[0].style.zIndex, 10), b || e.closest(W)[0] === h[0] || c(e), g = a.target === k[k.length - 1]
                }
            }
            var f, g, h, i, j = this,
                k = {};
            d.extend(j, {
                init: function () {
                    return i = j.elem = d("<div />", {
                        id: "qtip-overlay",
                        html: "<div></div>",
                        mousedown: function () {
                            return E
                        }
                    }).hide(), d(b.body).bind("focusin" + zb, e), d(b).bind("keydown" + zb, function (a) {
                        f && f.options.show.modal.escape && 27 === a.keyCode && f.hide(a)
                    }), i.bind("click" + zb, function (a) {
                        f && f.options.show.modal.blur && f.hide(a)
                    }), j
                },
                update: function (b) {
                    f = b, k = b.options.show.modal.stealfocus !== E ? b.tooltip.find("*").filter(function () {
                        return a(this)
                    }) : []
                },
                toggle: function (a, e, g) {
                    var k = (d(b.body), a.tooltip),
                        l = a.options.show.modal,
                        m = l.effect,
                        n = e ? "show" : "hide",
                        o = i.is(":visible"),
                        p = d(zb).filter(":visible:not(:animated)").not(k);
                    return j.update(a), e && l.stealfocus !== E && c(d(":focus")), i.toggleClass("blurs", l.blur), e && i.appendTo(b.body), i.is(":animated") && o === e && h !== E || !e && p.length ? j : (i.stop(D, E), d.isFunction(m) ? m.call(i, e) : m === E ? i[n]() : i.fadeTo(parseInt(g, 10) || 90, e ? 1 : 0, function () {
                        e || i.hide()
                    }), e || i.queue(function (a) {
                        i.css({
                            left: "",
                            top: ""
                        }), d(zb).length || i.detach(), a()
                    }), h = e, f.destroyed && (f = F), j)
                }
            }), j.init()
        }, xb = new xb, d.extend(w.prototype, {
            init: function (a) {
                var b = a.tooltip;
                return this.options.on ? (a.elements.overlay = xb.elem, b.addClass(yb).css("z-index", y.modal_zindex + d(zb).length), a._bind(b, ["tooltipshow", "tooltiphide"], function (a, c, e) {
                    var f = a.originalEvent;
                    if (a.target === b[0])
                        if (f && "tooltiphide" === a.type && /mouse(leave|enter)/.test(f.type) && d(f.relatedTarget).closest(xb.elem[0]).length) try {
                            a.preventDefault()
                        } catch (g) { } else (!f || f && "tooltipsolo" !== f.type) && this.toggle(a, "tooltipshow" === a.type, e)
                }, this._ns, this), a._bind(b, "tooltipfocus", function (a, c) {
                    if (!a.isDefaultPrevented() && a.target === b[0]) {
                        var e = d(zb),
                            f = y.modal_zindex + e.length,
                            g = parseInt(b[0].style.zIndex, 10);
                        xb.elem[0].style.zIndex = f - 1, e.each(function () {
                            this.style.zIndex > g && (this.style.zIndex -= 1)
                        }), e.filter("." + $).qtip("blur", a.originalEvent), b.addClass($)[0].style.zIndex = f, xb.update(c);
                        try {
                            a.preventDefault()
                        } catch (h) { }
                    }
                }, this._ns, this), void a._bind(b, "tooltiphide", function (a) {
                    a.target === b[0] && d(zb).filter(":visible").not(b).last().qtip("focus", a)
                }, this._ns, this)) : this
            },
            toggle: function (a, b, c) {
                return a && a.isDefaultPrevented() ? this : void xb.toggle(this.qtip, !!b, c)
            },
            destroy: function () {
                this.qtip.tooltip.removeClass(yb), this.qtip._unbind(this.qtip.tooltip, this._ns), xb.toggle(this.qtip, E), delete this.qtip.elements.overlay
            }
        }), wb = R.modal = function (a) {
            return new w(a, a.options.show.modal)
        }, wb.sanitize = function (a) {
            a.show && ("object" != typeof a.show.modal ? a.show.modal = {
                on: !!a.show.modal
            } : "undefined" == typeof a.show.modal.on && (a.show.modal.on = D))
        }, y.modal_zindex = y.zindex - 200, wb.initialize = "render", B.modal = {
            "^show.modal.(on|blur)$": function () {
                this.destroy(), this.init(), this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth > 0)
            }
        }, d.extend(D, y.defaults, {
            show: {
                modal: {
                    on: E,
                    effect: D,
                    blur: D,
                    stealfocus: D,
                    escape: D
                }
            }
        }), R.viewport = function (c, d, e, f, g, h, i) {
            function j(a, b, c, e, f, g, h, i, j) {
                var k = d[f],
                    s = u[a],
                    t = v[a],
                    w = c === Q,
                    x = s === f ? j : s === g ? -j : -j / 2,
                    y = t === f ? i : t === g ? -i : -i / 2,
                    z = q[f] + r[f] - (n ? 0 : m[f]),
                    A = z - k,
                    B = k + j - (h === I ? o : p) - z,
                    C = x - (u.precedance === a || s === u[b] ? y : 0) - (t === O ? i / 2 : 0);
                return w ? (C = (s === f ? 1 : -1) * x, d[f] += A > 0 ? A : B > 0 ? -B : 0, d[f] = Math.max(-m[f] + r[f], k - C, Math.min(Math.max(-m[f] + r[f] + (h === I ? o : p), k + C), d[f], "center" === s ? k - x : 1e9))) : (e *= c === P ? 2 : 0, A > 0 && (s !== f || B > 0) ? (d[f] -= C + e, l.invert(a, f)) : B > 0 && (s !== g || A > 0) && (d[f] -= (s === O ? -C : C) + e, l.invert(a, g)), d[f] < q && -d[f] > B && (d[f] = k, l = u.clone())), d[f] - k
            }
            var k, l, m, n, o, p, q, r, s = e.target,
                t = c.elements.tooltip,
                u = e.my,
                v = e.at,
                w = e.adjust,
                x = w.method.split(" "),
                y = x[0],
                z = x[1] || x[0],
                A = e.viewport,
                B = e.container,
                C = (c.cache, {
                    left: 0,
                    top: 0
                });
            return A.jquery && s[0] !== a && s[0] !== b.body && "none" !== w.method ? (m = B.offset() || C, n = "static" === B.css("position"), k = "fixed" === t.css("position"), o = A[0] === a ? A.width() : A.outerWidth(E), p = A[0] === a ? A.height() : A.outerHeight(E), q = {
                left: k ? 0 : A.scrollLeft(),
                top: k ? 0 : A.scrollTop()
            }, r = A.offset() || C, ("shift" !== y || "shift" !== z) && (l = u.clone()), C = {
                left: "none" !== y ? j(G, H, y, w.x, L, N, I, f, h) : 0,
                top: "none" !== z ? j(H, G, z, w.y, K, M, J, g, i) : 0,
                my: l
            }) : C
        }, R.polys = {
            polygon: function (a, b) {
                var c, d, e, f = {
                    width: 0,
                    height: 0,
                    position: {
                        top: 1e10,
                        right: 0,
                        bottom: 0,
                        left: 1e10
                    },
                    adjustable: E
                },
                    g = 0,
                    h = [],
                    i = 1,
                    j = 1,
                    k = 0,
                    l = 0;
                for (g = a.length; g--;) c = [parseInt(a[--g], 10), parseInt(a[g + 1], 10)], c[0] > f.position.right && (f.position.right = c[0]), c[0] < f.position.left && (f.position.left = c[0]), c[1] > f.position.bottom && (f.position.bottom = c[1]), c[1] < f.position.top && (f.position.top = c[1]), h.push(c);
                if (d = f.width = Math.abs(f.position.right - f.position.left), e = f.height = Math.abs(f.position.bottom - f.position.top), "c" === b.abbrev()) f.position = {
                    left: f.position.left + f.width / 2,
                    top: f.position.top + f.height / 2
                };
                else {
                    for (; d > 0 && e > 0 && i > 0 && j > 0;)
                        for (d = Math.floor(d / 2), e = Math.floor(e / 2), b.x === L ? i = d : b.x === N ? i = f.width - d : i += Math.floor(d / 2), b.y === K ? j = e : b.y === M ? j = f.height - e : j += Math.floor(e / 2), g = h.length; g-- && !(h.length < 2) ;) k = h[g][0] - f.position.left, l = h[g][1] - f.position.top, (b.x === L && k >= i || b.x === N && i >= k || b.x === O && (i > k || k > f.width - i) || b.y === K && l >= j || b.y === M && j >= l || b.y === O && (j > l || l > f.height - j)) && h.splice(g, 1);
                    f.position = {
                        left: h[0][0],
                        top: h[0][1]
                    }
                }
                return f
            },
            rect: function (a, b, c, d) {
                return {
                    width: Math.abs(c - a),
                    height: Math.abs(d - b),
                    position: {
                        left: Math.min(a, c),
                        top: Math.min(b, d)
                    }
                }
            },
            _angles: {
                tc: 1.5,
                tr: 7 / 4,
                tl: 5 / 4,
                bc: .5,
                br: .25,
                bl: .75,
                rc: 2,
                lc: 1,
                c: 0
            },
            ellipse: function (a, b, c, d, e) {
                var f = R.polys._angles[e.abbrev()],
                    g = 0 === f ? 0 : c * Math.cos(f * Math.PI),
                    h = d * Math.sin(f * Math.PI);
                return {
                    width: 2 * c - Math.abs(g),
                    height: 2 * d - Math.abs(h),
                    position: {
                        left: a + g,
                        top: b + h
                    },
                    adjustable: E
                }
            },
            circle: function (a, b, c, d) {
                return R.polys.ellipse(a, b, c, c, d)
            }
        }, R.svg = function (a, c, e) {
            for (var f, g, h, i, j, k, l, m, n, o = (d(b), c[0]), p = d(o.ownerSVGElement), q = o.ownerDocument, r = (parseInt(c.css("stroke-width"), 10) || 0) / 2; !o.getBBox;) o = o.parentNode;
            if (!o.getBBox || !o.parentNode) return E;
            switch (o.nodeName) {
                case "ellipse":
                case "circle":
                    m = R.polys.ellipse(o.cx.baseVal.value, o.cy.baseVal.value, (o.rx || o.r).baseVal.value + r, (o.ry || o.r).baseVal.value + r, e);
                    break;
                case "line":
                case "polygon":
                case "polyline":
                    for (l = o.points || [{
                        x: o.x1.baseVal.value,
                        y: o.y1.baseVal.value
                    }, {
                        x: o.x2.baseVal.value,
                        y: o.y2.baseVal.value
                    }], m = [], k = -1, i = l.numberOfItems || l.length; ++k < i;) j = l.getItem ? l.getItem(k) : l[k], m.push.apply(m, [j.x, j.y]);
                    m = R.polys.polygon(m, e);
                    break;
                default:
                    m = o.getBBox(), m = {
                        width: m.width,
                        height: m.height,
                        position: {
                            left: m.x,
                            top: m.y
                        }
                    }
            }
            return n = m.position, p = p[0], p.createSVGPoint && (g = o.getScreenCTM(), l = p.createSVGPoint(), l.x = n.left, l.y = n.top, h = l.matrixTransform(g), n.left = h.x, n.top = h.y), q !== b && "mouse" !== a.position.target && (f = d((q.defaultView || q.parentWindow).frameElement).offset(), f && (n.left += f.left, n.top += f.top)), q = d(q), n.left += q.scrollLeft(), n.top += q.scrollTop(), m
        }, R.imagemap = function (a, b, c) {
            b.jquery || (b = d(b));
            var e, f, g, h, i, j = (b.attr("shape") || "rect").toLowerCase().replace("poly", "polygon"),
                k = d('img[usemap="#' + b.parent("map").attr("name") + '"]'),
                l = d.trim(b.attr("coords")),
                m = l.replace(/,$/, "").split(",");
            if (!k.length) return E;
            if ("polygon" === j) h = R.polys.polygon(m, c);
            else {
                if (!R.polys[j]) return E;
                for (g = -1, i = m.length, f = []; ++g < i;) f.push(parseInt(m[g], 10));
                h = R.polys[j].apply(this, f.concat(c))
            }
            return e = k.offset(), e.left += Math.ceil((k.outerWidth(E) - k.width()) / 2), e.top += Math.ceil((k.outerHeight(E) - k.height()) / 2), h.position.left += e.left, h.position.top += e.top, h
        };
        var Ab, Bb = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';
        d.extend(x.prototype, {
            _scroll: function () {
                var b = this.qtip.elements.overlay;
                b && (b[0].style.top = d(a).scrollTop() + "px")
            },
            init: function (c) {
                var e = c.tooltip;
                d("select, object").length < 1 && (this.bgiframe = c.elements.bgiframe = d(Bb).appendTo(e), c._bind(e, "tooltipmove", this.adjustBGIFrame, this._ns, this)), this.redrawContainer = d("<div/>", {
                    id: S + "-rcontainer"
                }).appendTo(b.body), c.elements.overlay && c.elements.overlay.addClass("qtipmodal-ie6fix") && (c._bind(a, ["scroll", "resize"], this._scroll, this._ns, this), c._bind(e, ["tooltipshow"], this._scroll, this._ns, this)), this.redraw()
            },
            adjustBGIFrame: function () {
                var a, b, c = this.qtip.tooltip,
                    d = {
                        height: c.outerHeight(E),
                        width: c.outerWidth(E)
                    },
                    e = this.qtip.plugins.tip,
                    f = this.qtip.elements.tip;
                b = parseInt(c.css("borderLeftWidth"), 10) || 0, b = {
                    left: -b,
                    top: -b
                }, e && f && (a = "x" === e.corner.precedance ? [I, L] : [J, K], b[a[1]] -= f[a[0]]()), this.bgiframe.css(b).css(d)
            },
            redraw: function () {
                if (this.qtip.rendered < 1 || this.drawing) return this;
                var a, b, c, d, e = this.qtip.tooltip,
                    f = this.qtip.options.style,
                    g = this.qtip.options.position.container;
                return this.qtip.drawing = 1, f.height && e.css(J, f.height), f.width ? e.css(I, f.width) : (e.css(I, "").appendTo(this.redrawContainer), b = e.width(), 1 > b % 2 && (b += 1), c = e.css("maxWidth") || "", d = e.css("minWidth") || "", a = (c + d).indexOf("%") > -1 ? g.width() / 100 : 0, c = (c.indexOf("%") > -1 ? a : 1) * parseInt(c, 10) || b, d = (d.indexOf("%") > -1 ? a : 1) * parseInt(d, 10) || 0, b = c + d ? Math.min(Math.max(b, d), c) : b, e.css(I, Math.round(b)).appendTo(g)), this.drawing = 0, this
            },
            destroy: function () {
                this.bgiframe && this.bgiframe.remove(), this.qtip._unbind([a, this.qtip.tooltip], this._ns)
            }
        }), Ab = R.ie6 = function (a) {
            return 6 === db.ie ? new x(a) : E
        }, Ab.initialize = "render", B.ie6 = {
            "^content|style$": function () {
                this.redraw()
            }
        }
    })
}(window, document);
//# sourceMappingURL=jquery.qtip.min.js.map
/* perfect-scrollbar v0.6.16 */ ! function t(e, n, r) {
    function o(i, s) {
        if (!n[i]) {
            if (!e[i]) {
                var a = "function" == typeof require && require;
                if (!s && a) return a(i, !0);
                if (l) return l(i, !0);
                var c = new Error("Cannot find module '" + i + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[i] = {
                exports: {}
            };
            e[i][0].call(u.exports, function(t) {
                var n = e[i][1][t];
                return o(n ? n : t)
            }, u, u.exports, t, e, n, r)
        }
        return n[i].exports
    }
    for (var l = "function" == typeof require && require, i = 0; i < r.length; i++) o(r[i]);
    return o
}({
    1: [function(t, e, n) {
        "use strict";

        function r(t) {
            t.fn.perfectScrollbar = function(t) {
                return this.each(function() {
                    if ("object" == typeof t || "undefined" == typeof t) {
                        var e = t;
                        l.get(this) || o.initialize(this, e)
                    } else {
                        var n = t;
                        "update" === n ? o.update(this) : "destroy" === n && o.destroy(this)
                    }
                })
            }
        }
        var o = t("../main"),
            l = t("../plugin/instances");
        if ("function" == typeof define && define.amd) define(["jquery"], r);
        else {
            var i = window.jQuery ? window.jQuery : window.$;
            "undefined" != typeof i && r(i)
        }
        e.exports = r
    }, {
        "../main": 7,
        "../plugin/instances": 18
    }],
    2: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            var n = t.className.split(" ");
            n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ")
        }

        function o(t, e) {
            var n = t.className.split(" "),
                r = n.indexOf(e);
            r >= 0 && n.splice(r, 1), t.className = n.join(" ")
        }
        n.add = function(t, e) {
            t.classList ? t.classList.add(e) : r(t, e)
        }, n.remove = function(t, e) {
            t.classList ? t.classList.remove(e) : o(t, e)
        }, n.list = function(t) {
            return t.classList ? Array.prototype.slice.apply(t.classList) : t.className.split(" ")
        }
    }, {}],
    3: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            return window.getComputedStyle(t)[e]
        }

        function o(t, e, n) {
            return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t
        }

        function l(t, e) {
            for (var n in e) {
                var r = e[n];
                "number" == typeof r && (r = r.toString() + "px"), t.style[n] = r
            }
            return t
        }
        var i = {};
        i.e = function(t, e) {
            var n = document.createElement(t);
            return n.className = e, n
        }, i.appendTo = function(t, e) {
            return e.appendChild(t), t
        }, i.css = function(t, e, n) {
            return "object" == typeof e ? l(t, e) : "undefined" == typeof n ? r(t, e) : o(t, e, n)
        }, i.matches = function(t, e) {
            return "undefined" != typeof t.matches ? t.matches(e) : "undefined" != typeof t.matchesSelector ? t.matchesSelector(e) : "undefined" != typeof t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : "undefined" != typeof t.mozMatchesSelector ? t.mozMatchesSelector(e) : "undefined" != typeof t.msMatchesSelector ? t.msMatchesSelector(e) : void 0
        }, i.remove = function(t) {
            "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
        }, i.queryChildren = function(t, e) {
            return Array.prototype.filter.call(t.childNodes, function(t) {
                return i.matches(t, e)
            })
        }, e.exports = i
    }, {}],
    4: [function(t, e, n) {
        "use strict";
        var r = function(t) {
            this.element = t, this.events = {}
        };
        r.prototype.bind = function(t, e) {
            "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
        }, r.prototype.unbind = function(t, e) {
            var n = "undefined" != typeof e;
            this.events[t] = this.events[t].filter(function(r) {
                return !(!n || r === e) || (this.element.removeEventListener(t, r, !1), !1)
            }, this)
        }, r.prototype.unbindAll = function() {
            for (var t in this.events) this.unbind(t)
        };
        var o = function() {
            this.eventElements = []
        };
        o.prototype.eventElement = function(t) {
            var e = this.eventElements.filter(function(e) {
                return e.element === t
            })[0];
            return "undefined" == typeof e && (e = new r(t), this.eventElements.push(e)), e
        }, o.prototype.bind = function(t, e, n) {
            this.eventElement(t).bind(e, n)
        }, o.prototype.unbind = function(t, e, n) {
            this.eventElement(t).unbind(e, n)
        }, o.prototype.unbindAll = function() {
            for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll()
        }, o.prototype.once = function(t, e, n) {
            var r = this.eventElement(t),
                o = function(t) {
                    r.unbind(e, o), n(t)
                };
            r.bind(e, o)
        }, e.exports = o
    }, {}],
    5: [function(t, e, n) {
        "use strict";
        e.exports = function() {
            function t() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            return function() {
                return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
            }
        }()
    }, {}],
    6: [function(t, e, n) {
        "use strict";
        var r = t("./class"),
            o = t("./dom"),
            l = n.toInt = function(t) {
                return parseInt(t, 10) || 0
            },
            i = n.clone = function(t) {
                if (t) {
                    if (t.constructor === Array) return t.map(i);
                    if ("object" == typeof t) {
                        var e = {};
                        for (var n in t) e[n] = i(t[n]);
                        return e
                    }
                    return t
                }
                return null
            };
        n.extend = function(t, e) {
            var n = i(t);
            for (var r in e) n[r] = i(e[r]);
            return n
        }, n.isEditable = function(t) {
            return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]")
        }, n.removePsClasses = function(t) {
            for (var e = r.list(t), n = 0; n < e.length; n++) {
                var o = e[n];
                0 === o.indexOf("ps-") && r.remove(t, o)
            }
        }, n.outerWidth = function(t) {
            return l(o.css(t, "width")) + l(o.css(t, "paddingLeft")) + l(o.css(t, "paddingRight")) + l(o.css(t, "borderLeftWidth")) + l(o.css(t, "borderRightWidth"))
        }, n.startScrolling = function(t, e) {
            r.add(t, "ps-in-scrolling"), "undefined" != typeof e ? r.add(t, "ps-" + e) : (r.add(t, "ps-x"), r.add(t, "ps-y"))
        }, n.stopScrolling = function(t, e) {
            r.remove(t, "ps-in-scrolling"), "undefined" != typeof e ? r.remove(t, "ps-" + e) : (r.remove(t, "ps-x"), r.remove(t, "ps-y"))
        }, n.env = {
            isWebKit: "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
            supportsIePointer: null !== window.navigator.msMaxTouchPoints
        }
    }, {
        "./class": 2,
        "./dom": 3
    }],
    7: [function(t, e, n) {
        "use strict";
        var r = t("./plugin/destroy"),
            o = t("./plugin/initialize"),
            l = t("./plugin/update");
        e.exports = {
            initialize: o,
            update: l,
            destroy: r
        }
    }, {
        "./plugin/destroy": 9,
        "./plugin/initialize": 17,
        "./plugin/update": 21
    }],
    8: [function(t, e, n) {
        "use strict";
        e.exports = {
            handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"],
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            swipePropagation: !0,
            useBothWheelAxes: !1,
            wheelPropagation: !1,
            wheelSpeed: 1,
            theme: "default"
        }
    }, {}],
    9: [function(t, e, n) {
        "use strict";
        var r = t("../lib/helper"),
            o = t("../lib/dom"),
            l = t("./instances");
        e.exports = function(t) {
            var e = l.get(t);
            e && (e.event.unbindAll(), o.remove(e.scrollbarX), o.remove(e.scrollbarY), o.remove(e.scrollbarXRail), o.remove(e.scrollbarYRail), r.removePsClasses(t), l.remove(t))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18
    }],
    10: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(t) {
                return t.getBoundingClientRect()
            }
            var r = function(t) {
                t.stopPropagation()
            };
            e.event.bind(e.scrollbarY, "click", r), e.event.bind(e.scrollbarYRail, "click", function(r) {
                var o = r.pageY - window.pageYOffset - n(e.scrollbarYRail).top,
                    s = o > e.scrollbarYTop ? 1 : -1;
                i(t, "top", t.scrollTop + s * e.containerHeight), l(t), r.stopPropagation()
            }), e.event.bind(e.scrollbarX, "click", r), e.event.bind(e.scrollbarXRail, "click", function(r) {
                var o = r.pageX - window.pageXOffset - n(e.scrollbarXRail).left,
                    s = o > e.scrollbarXLeft ? 1 : -1;
                i(t, "left", t.scrollLeft + s * e.containerWidth), l(t), r.stopPropagation()
            })
        }
        var o = t("../instances"),
            l = t("../update-geometry"),
            i = t("../update-scroll");
        e.exports = function(t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    11: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n) {
                var o = r + n * e.railXRatio,
                    i = Math.max(0, e.scrollbarXRail.getBoundingClientRect().left) + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
                o < 0 ? e.scrollbarXLeft = 0 : o > i ? e.scrollbarXLeft = i : e.scrollbarXLeft = o;
                var s = l.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
                c(t, "left", s)
            }
            var r = null,
                o = null,
                s = function(e) {
                    n(e.pageX - o), a(t), e.stopPropagation(), e.preventDefault()
                },
                u = function() {
                    l.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", s)
                };
            e.event.bind(e.scrollbarX, "mousedown", function(n) {
                o = n.pageX, r = l.toInt(i.css(e.scrollbarX, "left")) * e.railXRatio, l.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }

        function o(t, e) {
            function n(n) {
                var o = r + n * e.railYRatio,
                    i = Math.max(0, e.scrollbarYRail.getBoundingClientRect().top) + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
                o < 0 ? e.scrollbarYTop = 0 : o > i ? e.scrollbarYTop = i : e.scrollbarYTop = o;
                var s = l.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
                c(t, "top", s)
            }
            var r = null,
                o = null,
                s = function(e) {
                    n(e.pageY - o), a(t), e.stopPropagation(), e.preventDefault()
                },
                u = function() {
                    l.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", s)
                };
            e.event.bind(e.scrollbarY, "mousedown", function(n) {
                o = n.pageY, r = l.toInt(i.css(e.scrollbarY, "top")) * e.railYRatio, l.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", s), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }
        var l = t("../../lib/helper"),
            i = t("../../lib/dom"),
            s = t("../instances"),
            a = t("../update-geometry"),
            c = t("../update-scroll");
        e.exports = function(t) {
            var e = s.get(t);
            r(t, e), o(t, e)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    12: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation
                }
                var l = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }
            var r = !1;
            e.event.bind(t, "mouseenter", function() {
                r = !0
            }), e.event.bind(t, "mouseleave", function() {
                r = !1
            });
            var i = !1;
            e.event.bind(e.ownerDocument, "keydown", function(c) {
                if (!(c.isDefaultPrevented && c.isDefaultPrevented() || c.defaultPrevented)) {
                    var u = l.matches(e.scrollbarX, ":focus") || l.matches(e.scrollbarY, ":focus");
                    if (r || u) {
                        var d = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                        if (d) {
                            if ("IFRAME" === d.tagName) d = d.contentDocument.activeElement;
                            else
                                for (; d.shadowRoot;) d = d.shadowRoot.activeElement;
                            if (o.isEditable(d)) return
                        }
                        var p = 0,
                            f = 0;
                        switch (c.which) {
                            case 37:
                                p = c.metaKey ? -e.contentWidth : c.altKey ? -e.containerWidth : -30;
                                break;
                            case 38:
                                f = c.metaKey ? e.contentHeight : c.altKey ? e.containerHeight : 30;
                                break;
                            case 39:
                                p = c.metaKey ? e.contentWidth : c.altKey ? e.containerWidth : 30;
                                break;
                            case 40:
                                f = c.metaKey ? -e.contentHeight : c.altKey ? -e.containerHeight : -30;
                                break;
                            case 33:
                                f = 90;
                                break;
                            case 32:
                                f = c.shiftKey ? 90 : -90;
                                break;
                            case 34:
                                f = -90;
                                break;
                            case 35:
                                f = c.ctrlKey ? -e.contentHeight : -e.containerHeight;
                                break;
                            case 36:
                                f = c.ctrlKey ? t.scrollTop : e.containerHeight;
                                break;
                            default:
                                return
                        }
                        a(t, "top", t.scrollTop - f), a(t, "left", t.scrollLeft + p), s(t), i = n(p, f), i && c.preventDefault()
                    }
                }
            })
        }
        var o = t("../../lib/helper"),
            l = t("../../lib/dom"),
            i = t("../instances"),
            s = t("../update-geometry"),
            a = t("../update-scroll");
        e.exports = function(t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    13: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && r < 0) return !e.settings.wheelPropagation
                }
                var l = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === l && n < 0 || l >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }

            function r(t) {
                var e = t.deltaX,
                    n = -1 * t.deltaY;
                return "undefined" != typeof e && "undefined" != typeof n || (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e !== e && n !== n && (e = 0, n = t.wheelDelta), t.shiftKey ? [-n, -e] : [e, n]
            }

            function o(e, n) {
                var r = t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");
                if (r) {
                    if (!window.getComputedStyle(r).overflow.match(/(scroll|auto)/)) return !1;
                    var o = r.scrollHeight - r.clientHeight;
                    if (o > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === o && n < 0)) return !0;
                    var l = r.scrollLeft - r.clientWidth;
                    if (l > 0 && !(0 === r.scrollLeft && e < 0 || r.scrollLeft === l && e > 0)) return !0
                }
                return !1
            }

            function s(s) {
                var c = r(s),
                    u = c[0],
                    d = c[1];
                o(u, d) || (a = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (d ? i(t, "top", t.scrollTop - d * e.settings.wheelSpeed) : i(t, "top", t.scrollTop + u * e.settings.wheelSpeed), a = !0) : e.scrollbarXActive && !e.scrollbarYActive && (u ? i(t, "left", t.scrollLeft + u * e.settings.wheelSpeed) : i(t, "left", t.scrollLeft - d * e.settings.wheelSpeed), a = !0) : (i(t, "top", t.scrollTop - d * e.settings.wheelSpeed), i(t, "left", t.scrollLeft + u * e.settings.wheelSpeed)), l(t), a = a || n(u, d), a && (s.stopPropagation(), s.preventDefault()))
            }
            var a = !1;
            "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", s) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", s)
        }
        var o = t("../instances"),
            l = t("../update-geometry"),
            i = t("../update-scroll");
        e.exports = function(t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    14: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            e.event.bind(t, "scroll", function() {
                l(t)
            })
        }
        var o = t("../instances"),
            l = t("../update-geometry");
        e.exports = function(t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19
    }],
    15: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            function n() {
                var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer
            }

            function r() {
                c || (c = setInterval(function() {
                    return l.get(t) ? (s(t, "top", t.scrollTop + u.top), s(t, "left", t.scrollLeft + u.left), void i(t)) : void clearInterval(c)
                }, 50))
            }

            function a() {
                c && (clearInterval(c), c = null), o.stopScrolling(t)
            }
            var c = null,
                u = {
                    top: 0,
                    left: 0
                },
                d = !1;
            e.event.bind(e.ownerDocument, "selectionchange", function() {
                t.contains(n()) ? d = !0 : (d = !1, a())
            }), e.event.bind(window, "mouseup", function() {
                d && (d = !1, a())
            }), e.event.bind(window, "keyup", function() {
                d && (d = !1, a())
            }), e.event.bind(window, "mousemove", function(e) {
                if (d) {
                    var n = {
                            x: e.pageX,
                            y: e.pageY
                        },
                        l = {
                            left: t.offsetLeft,
                            right: t.offsetLeft + t.offsetWidth,
                            top: t.offsetTop,
                            bottom: t.offsetTop + t.offsetHeight
                        };
                    n.x < l.left + 3 ? (u.left = -5, o.startScrolling(t, "x")) : n.x > l.right - 3 ? (u.left = 5, o.startScrolling(t, "x")) : u.left = 0, n.y < l.top + 3 ? (l.top + 3 - n.y < 5 ? u.top = -5 : u.top = -20, o.startScrolling(t, "y")) : n.y > l.bottom - 3 ? (n.y - l.bottom + 3 < 5 ? u.top = 5 : u.top = 20, o.startScrolling(t, "y")) : u.top = 0, 0 === u.top && 0 === u.left ? a() : r()
                }
            })
        }
        var o = t("../../lib/helper"),
            l = t("../instances"),
            i = t("../update-geometry"),
            s = t("../update-scroll");
        e.exports = function(t) {
            var e = l.get(t);
            r(t, e)
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    16: [function(t, e, n) {
        "use strict";

        function r(t, e, n, r) {
            function o(n, r) {
                var o = t.scrollTop,
                    l = t.scrollLeft,
                    i = Math.abs(n),
                    s = Math.abs(r);
                if (s > i) {
                    if (r < 0 && o === e.contentHeight - e.containerHeight || r > 0 && 0 === o) return !e.settings.swipePropagation
                } else if (i > s && (n < 0 && l === e.contentWidth - e.containerWidth || n > 0 && 0 === l)) return !e.settings.swipePropagation;
                return !0
            }

            function a(e, n) {
                s(t, "top", t.scrollTop - n), s(t, "left", t.scrollLeft - e), i(t)
            }

            function c() {
                w = !0
            }

            function u() {
                w = !1
            }

            function d(t) {
                return t.targetTouches ? t.targetTouches[0] : t
            }

            function p(t) {
                return !(!t.targetTouches || 1 !== t.targetTouches.length) || !(!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE)
            }

            function f(t) {
                if (p(t)) {
                    Y = !0;
                    var e = d(t);
                    g.pageX = e.pageX, g.pageY = e.pageY, v = (new Date).getTime(), null !== y && clearInterval(y), t.stopPropagation()
                }
            }

            function h(t) {
                if (!Y && e.settings.swipePropagation && f(t), !w && Y && p(t)) {
                    var n = d(t),
                        r = {
                            pageX: n.pageX,
                            pageY: n.pageY
                        },
                        l = r.pageX - g.pageX,
                        i = r.pageY - g.pageY;
                    a(l, i), g = r;
                    var s = (new Date).getTime(),
                        c = s - v;
                    c > 0 && (m.x = l / c, m.y = i / c, v = s), o(l, i) && (t.stopPropagation(), t.preventDefault())
                }
            }

            function b() {
                !w && Y && (Y = !1, clearInterval(y), y = setInterval(function() {
                    return l.get(t) && (m.x || m.y) ? Math.abs(m.x) < .01 && Math.abs(m.y) < .01 ? void clearInterval(y) : (a(30 * m.x, 30 * m.y), m.x *= .8, void(m.y *= .8)) : void clearInterval(y)
                }, 10))
            }
            var g = {},
                v = 0,
                m = {},
                y = null,
                w = !1,
                Y = !1;
            n ? (e.event.bind(window, "touchstart", c), e.event.bind(window, "touchend", u), e.event.bind(t, "touchstart", f), e.event.bind(t, "touchmove", h), e.event.bind(t, "touchend", b)) : r && (window.PointerEvent ? (e.event.bind(window, "pointerdown", c), e.event.bind(window, "pointerup", u), e.event.bind(t, "pointerdown", f), e.event.bind(t, "pointermove", h), e.event.bind(t, "pointerup", b)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", c), e.event.bind(window, "MSPointerUp", u), e.event.bind(t, "MSPointerDown", f), e.event.bind(t, "MSPointerMove", h), e.event.bind(t, "MSPointerUp", b)))
        }
        var o = t("../../lib/helper"),
            l = t("../instances"),
            i = t("../update-geometry"),
            s = t("../update-scroll");
        e.exports = function(t) {
            if (o.env.supportsTouch || o.env.supportsIePointer) {
                var e = l.get(t);
                r(t, e, o.env.supportsTouch, o.env.supportsIePointer)
            }
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    17: [function(t, e, n) {
        "use strict";
        var r = t("../lib/helper"),
            o = t("../lib/class"),
            l = t("./instances"),
            i = t("./update-geometry"),
            s = {
                "click-rail": t("./handler/click-rail"),
                "drag-scrollbar": t("./handler/drag-scrollbar"),
                keyboard: t("./handler/keyboard"),
                wheel: t("./handler/mouse-wheel"),
                touch: t("./handler/touch"),
                selection: t("./handler/selection")
            },
            a = t("./handler/native-scroll");
        e.exports = function(t, e) {
            e = "object" == typeof e ? e : {}, o.add(t, "ps-container");
            var n = l.add(t);
            n.settings = r.extend(n.settings, e), o.add(t, "ps-theme-" + n.settings.theme), n.settings.handlers.forEach(function(e) {
                s[e](t)
            }), a(t), i(t)
        }
    }, {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19
    }],
    18: [function(t, e, n) {
        "use strict";

        function r(t) {
            function e() {
                a.add(t, "ps-focus")
            }

            function n() {
                a.remove(t, "ps-focus")
            }
            var r = this;
            r.settings = s.clone(c), r.containerWidth = null, r.containerHeight = null, r.contentWidth = null, r.contentHeight = null, r.isRtl = "rtl" === u.css(t, "direction"), r.isNegativeScroll = function() {
                var e = t.scrollLeft,
                    n = null;
                return t.scrollLeft = -1, n = t.scrollLeft < 0, t.scrollLeft = e, n
            }(), r.negativeScrollAdjustment = r.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, r.event = new d, r.ownerDocument = t.ownerDocument || document, r.scrollbarXRail = u.appendTo(u.e("div", "ps-scrollbar-x-rail"), t), r.scrollbarX = u.appendTo(u.e("div", "ps-scrollbar-x"), r.scrollbarXRail), r.scrollbarX.setAttribute("tabindex", 0), r.event.bind(r.scrollbarX, "focus", e), r.event.bind(r.scrollbarX, "blur", n), r.scrollbarXActive = null, r.scrollbarXWidth = null, r.scrollbarXLeft = null, r.scrollbarXBottom = s.toInt(u.css(r.scrollbarXRail, "bottom")), r.isScrollbarXUsingBottom = r.scrollbarXBottom === r.scrollbarXBottom, r.scrollbarXTop = r.isScrollbarXUsingBottom ? null : s.toInt(u.css(r.scrollbarXRail, "top")), r.railBorderXWidth = s.toInt(u.css(r.scrollbarXRail, "borderLeftWidth")) + s.toInt(u.css(r.scrollbarXRail, "borderRightWidth")), u.css(r.scrollbarXRail, "display", "block"), r.railXMarginWidth = s.toInt(u.css(r.scrollbarXRail, "marginLeft")) + s.toInt(u.css(r.scrollbarXRail, "marginRight")), u.css(r.scrollbarXRail, "display", ""), r.railXWidth = null, r.railXRatio = null, r.scrollbarYRail = u.appendTo(u.e("div", "ps-scrollbar-y-rail"), t), r.scrollbarY = u.appendTo(u.e("div", "ps-scrollbar-y"), r.scrollbarYRail), r.scrollbarY.setAttribute("tabindex", 0), r.event.bind(r.scrollbarY, "focus", e), r.event.bind(r.scrollbarY, "blur", n), r.scrollbarYActive = null, r.scrollbarYHeight = null, r.scrollbarYTop = null, r.scrollbarYRight = s.toInt(u.css(r.scrollbarYRail, "right")), r.isScrollbarYUsingRight = r.scrollbarYRight === r.scrollbarYRight, r.scrollbarYLeft = r.isScrollbarYUsingRight ? null : s.toInt(u.css(r.scrollbarYRail, "left")), r.scrollbarYOuterWidth = r.isRtl ? s.outerWidth(r.scrollbarY) : null, r.railBorderYWidth = s.toInt(u.css(r.scrollbarYRail, "borderTopWidth")) + s.toInt(u.css(r.scrollbarYRail, "borderBottomWidth")), u.css(r.scrollbarYRail, "display", "block"), r.railYMarginHeight = s.toInt(u.css(r.scrollbarYRail, "marginTop")) + s.toInt(u.css(r.scrollbarYRail, "marginBottom")), u.css(r.scrollbarYRail, "display", ""), r.railYHeight = null, r.railYRatio = null
        }

        function o(t) {
            return t.getAttribute("data-ps-id")
        }

        function l(t, e) {
            t.setAttribute("data-ps-id", e)
        }

        function i(t) {
            t.removeAttribute("data-ps-id")
        }
        var s = t("../lib/helper"),
            a = t("../lib/class"),
            c = t("./default-setting"),
            u = t("../lib/dom"),
            d = t("../lib/event-manager"),
            p = t("../lib/guid"),
            f = {};
        n.add = function(t) {
            var e = p();
            return l(t, e), f[e] = new r(t), f[e]
        }, n.remove = function(t) {
            delete f[o(t)], i(t)
        }, n.get = function(t) {
            return f[o(t)]
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/event-manager": 4,
        "../lib/guid": 5,
        "../lib/helper": 6,
        "./default-setting": 8
    }],
    19: [function(t, e, n) {
        "use strict";

        function r(t, e) {
            return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
        }

        function o(t, e) {
            var n = {
                width: e.railXWidth
            };
            e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, s.css(e.scrollbarXRail, n);
            var r = {
                top: t.scrollTop,
                height: e.railYHeight
            };
            e.isScrollbarYUsingRight ? e.isRtl ? r.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : r.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? r.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : r.left = e.scrollbarYLeft + t.scrollLeft, s.css(e.scrollbarYRail, r), s.css(e.scrollbarX, {
                left: e.scrollbarXLeft,
                width: e.scrollbarXWidth - e.railBorderXWidth
            }), s.css(e.scrollbarY, {
                top: e.scrollbarYTop,
                height: e.scrollbarYHeight - e.railBorderYWidth
            })
        }
        var l = t("../lib/helper"),
            i = t("../lib/class"),
            s = t("../lib/dom"),
            a = t("./instances"),
            c = t("./update-scroll");
        e.exports = function(t) {
            var e = a.get(t);
            e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight;
            var n;
            t.contains(e.scrollbarXRail) || (n = s.queryChildren(t, ".ps-scrollbar-x-rail"), n.length > 0 && n.forEach(function(t) {
                s.remove(t)
            }), s.appendTo(e.scrollbarXRail, t)), t.contains(e.scrollbarYRail) || (n = s.queryChildren(t, ".ps-scrollbar-y-rail"), n.length > 0 && n.forEach(function(t) {
                s.remove(t)
            }), s.appendTo(e.scrollbarYRail, t)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = r(e, l.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = l.toInt((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = r(e, l.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = l.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), o(t, e), e.scrollbarXActive ? i.add(t, "ps-active-x") : (i.remove(t, "ps-active-x"), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, c(t, "left", 0)), e.scrollbarYActive ? i.add(t, "ps-active-y") : (i.remove(t, "ps-active-y"), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, c(t, "top", 0))
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-scroll": 20
    }],
    20: [function(t, e, n) {
        "use strict";
        var r, o, l = t("./instances"),
            i = function(t) {
                var e = document.createEvent("Event");
                return e.initEvent(t, !0, !0), e
            };
        e.exports = function(t, e, n) {
            if ("undefined" == typeof t) throw "You must provide an element to the update-scroll function";
            if ("undefined" == typeof e) throw "You must provide an axis to the update-scroll function";
            if ("undefined" == typeof n) throw "You must provide a value to the update-scroll function";
            "top" === e && n <= 0 && (t.scrollTop = n = 0, t.dispatchEvent(i("ps-y-reach-start"))), "left" === e && n <= 0 && (t.scrollLeft = n = 0, t.dispatchEvent(i("ps-x-reach-start")));
            var s = l.get(t);
            "top" === e && n >= s.contentHeight - s.containerHeight && (n = s.contentHeight - s.containerHeight, n - t.scrollTop <= 1 ? n = t.scrollTop : t.scrollTop = n, t.dispatchEvent(i("ps-y-reach-end"))), "left" === e && n >= s.contentWidth - s.containerWidth && (n = s.contentWidth - s.containerWidth, n - t.scrollLeft <= 1 ? n = t.scrollLeft : t.scrollLeft = n, t.dispatchEvent(i("ps-x-reach-end"))), r || (r = t.scrollTop), o || (o = t.scrollLeft), "top" === e && n < r && t.dispatchEvent(i("ps-scroll-up")), "top" === e && n > r && t.dispatchEvent(i("ps-scroll-down")), "left" === e && n < o && t.dispatchEvent(i("ps-scroll-left")), "left" === e && n > o && t.dispatchEvent(i("ps-scroll-right")), "top" === e && (t.scrollTop = r = n, t.dispatchEvent(i("ps-scroll-y"))), "left" === e && (t.scrollLeft = o = n, t.dispatchEvent(i("ps-scroll-x")))
        }
    }, {
        "./instances": 18
    }],
    21: [function(t, e, n) {
        "use strict";
        var r = t("../lib/helper"),
            o = t("../lib/dom"),
            l = t("./instances"),
            i = t("./update-geometry"),
            s = t("./update-scroll");
        e.exports = function(t) {
            var e = l.get(t);
            e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, o.css(e.scrollbarXRail, "display", "block"), o.css(e.scrollbarYRail, "display", "block"), e.railXMarginWidth = r.toInt(o.css(e.scrollbarXRail, "marginLeft")) + r.toInt(o.css(e.scrollbarXRail, "marginRight")), e.railYMarginHeight = r.toInt(o.css(e.scrollbarYRail, "marginTop")) + r.toInt(o.css(e.scrollbarYRail, "marginBottom")), o.css(e.scrollbarXRail, "display", "none"), o.css(e.scrollbarYRail, "display", "none"), i(t), s(t, "top", t.scrollTop), s(t, "left", t.scrollLeft), o.css(e.scrollbarXRail, "display", ""), o.css(e.scrollbarYRail, "display", ""))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-geometry": 19,
        "./update-scroll": 20
    }]
}, {}, [1]);
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
/**
 * Swiper 3.0.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: March 27, 2015
 */
!function(){"use strict";function e(e){e.fn.swiper=function(t){var a;return e(this).each(function(){var e=new Swiper(this,t);a||(a=e)}),a}}window.Swiper=function(e,a){function r(){return"horizontal"===h.params.direction}function s(){h.autoplayTimeoutId=setTimeout(function(){h.params.loop?(h.fixLoop(),h._slideNext()):h.isEnd?a.autoplayStopOnLast?h.stopAutoplay():h._slideTo(0):h._slideNext()},h.params.autoplay)}function i(e,t){var a=g(e.target);if(!a.is(t))if("string"==typeof t)a=a.parents(t);else if(t.nodeType){var r;return a.parents().each(function(e,a){a===t&&(r=t)}),r?t:void 0}return 0===a.length?void 0:a[0]}function n(e,t){t=t||{};var a=window.MutationObserver||window.WebkitMutationObserver,r=new a(function(e){e.forEach(function(e){h.onResize(),h.emit("onObserverUpdate",h,e)})});r.observe(e,{attributes:"undefined"==typeof t.attributes?!0:t.attributes,childList:"undefined"==typeof t.childList?!0:t.childList,characterData:"undefined"==typeof t.characterData?!0:t.characterData}),h.observers.push(r)}function o(e){e.originalEvent&&(e=e.originalEvent);var t=e.keyCode||e.charCode;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===t||39===t||38===t||40===t){var a=!1;if(h.container.parents(".swiper-slide").length>0&&0===h.container.parents(".swiper-slide-active").length)return;for(var s={left:window.pageXOffset,top:window.pageYOffset},i=window.innerWidth,n=window.innerHeight,o=h.container.offset(),l=[[o.left,o.top],[o.left+h.width,o.top],[o.left,o.top+h.height],[o.left+h.width,o.top+h.height]],d=0;d<l.length;d++){var p=l[d];p[0]>=s.left&&p[0]<=s.left+i&&p[1]>=s.top&&p[1]<=s.top+n&&(a=!0)}if(!a)return}r()?((37===t||39===t)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),39===t&&h.slideNext(),37===t&&h.slidePrev()):((38===t||40===t)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),40===t&&h.slideNext(),38===t&&h.slidePrev())}}function l(e){e.originalEvent&&(e=e.originalEvent);var t=h._wheelEvent,a=0;if(e.detail)a=-e.detail;else if("mousewheel"===t)if(h.params.mousewheelForceToAxis)if(r()){if(!(Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)))return;a=e.wheelDeltaX}else{if(!(Math.abs(e.wheelDeltaY)>Math.abs(e.wheelDeltaX)))return;a=e.wheelDeltaY}else a=e.wheelDelta;else if("DOMMouseScroll"===t)a=-e.detail;else if("wheel"===t)if(h.params.mousewheelForceToAxis)if(r()){if(!(Math.abs(e.deltaX)>Math.abs(e.deltaY)))return;a=-e.deltaX}else{if(!(Math.abs(e.deltaY)>Math.abs(e.deltaX)))return;a=-e.deltaY}else a=Math.abs(e.deltaX)>Math.abs(e.deltaY)?-e.deltaX:-e.deltaY;if(h.params.freeMode){var s=h.getWrapperTranslate()+a;if(s>0&&(s=0),s<h.maxTranslate()&&(s=h.maxTranslate()),h.setWrapperTransition(0),h.setWrapperTranslate(s),h.updateProgress(),h.updateActiveIndex(),0===s||s===h.maxTranslate())return}else(new Date).getTime()-h._lastWheelScrollTime>60&&(0>a?h.slideNext():h.slidePrev()),h._lastWheelScrollTime=(new Date).getTime();return h.params.autoplay&&h.stopAutoplay(),e.preventDefault?e.preventDefault():e.returnValue=!1,!1}function d(e,t){e=g(e);var a,s,i;a=e.attr("data-swiper-parallax")||"0",s=e.attr("data-swiper-parallax-x"),i=e.attr("data-swiper-parallax-y"),s||i?(s=s||"0",i=i||"0"):r()?(s=a,i="0"):(i=a,s="0"),s=s.indexOf("%")>=0?parseInt(s,10)*t+"%":s*t+"px",i=i.indexOf("%")>=0?parseInt(i,10)*t+"%":i*t+"px",e.transform("translate3d("+s+", "+i+",0px)")}function p(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof Swiper))return new Swiper(e,a);var u={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,scrollbar:null,scrollbarHide:!0,keyboardControl:!1,mousewheelControl:!1,mousewheelForceToAxis:!1,hashnav:!1,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,pagination:null,paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationHiddenClass:"swiper-pagination-hidden",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",runCallbacksOnInit:!0},c=a&&a.virtualTranslate;a=a||{};for(var m in u)if("undefined"==typeof a[m])a[m]=u[m];else if("object"==typeof a[m])for(var f in u[m])"undefined"==typeof a[m][f]&&(a[m][f]=u[m][f]);var h=this;h.params=a,h.classNames=[];var g;if(g="undefined"==typeof t?window.Dom7||window.Zepto||window.jQuery:t,g&&(h.$=g,h.container=g(e),0!==h.container.length)){if(h.container.length>1)return void h.container.each(function(){new Swiper(this,a)});h.container[0].swiper=h,h.container.data("swiper",h),h.classNames.push("swiper-container-"+h.params.direction),h.params.freeMode&&h.classNames.push("swiper-container-free-mode"),h.support.flexbox||(h.classNames.push("swiper-container-no-flexbox"),h.params.slidesPerColumn=1),(h.params.parallax||h.params.watchSlidesVisibility)&&(h.params.watchSlidesProgress=!0),["cube","coverflow"].indexOf(h.params.effect)>=0&&(h.support.transforms3d?(h.params.watchSlidesProgress=!0,h.classNames.push("swiper-container-3d")):h.params.effect="slide"),"slide"!==h.params.effect&&h.classNames.push("swiper-container-"+h.params.effect),"cube"===h.params.effect&&(h.params.resistanceRatio=0,h.params.slidesPerView=1,h.params.slidesPerColumn=1,h.params.slidesPerGroup=1,h.params.centeredSlides=!1,h.params.spaceBetween=0,h.params.virtualTranslate=!0,h.params.setWrapperSize=!1),"fade"===h.params.effect&&(h.params.slidesPerView=1,h.params.slidesPerColumn=1,h.params.slidesPerGroup=1,h.params.watchSlidesProgress=!0,h.params.spaceBetween=0,"undefined"==typeof c&&(h.params.virtualTranslate=!0)),h.params.grabCursor&&h.support.touch&&(h.params.grabCursor=!1),h.wrapper=h.container.children("."+h.params.wrapperClass),h.params.pagination&&(h.paginationContainer=g(h.params.pagination),h.params.paginationClickable&&h.paginationContainer.addClass("swiper-pagination-clickable")),h.rtl=r()&&("rtl"===h.container[0].dir.toLowerCase()||"rtl"===h.container.css("direction")),h.rtl&&h.classNames.push("swiper-container-rtl"),h.rtl&&(h.wrongRTL="-webkit-box"===h.wrapper.css("display")),h.params.slidesPerColumn>1&&h.classNames.push("swiper-container-multirow"),h.device.android&&h.classNames.push("swiper-container-android"),h.container.addClass(h.classNames.join(" ")),h.translate=0,h.progress=0,h.velocity=0,h.lockSwipeToNext=function(){h.params.allowSwipeToNext=!1},h.lockSwipeToPrev=function(){h.params.allowSwipeToPrev=!1},h.lockSwipes=function(){h.params.allowSwipeToNext=h.params.allowSwipeToPrev=!1},h.unlockSwipeToNext=function(){h.params.allowSwipeToNext=!0},h.unlockSwipeToPrev=function(){h.params.allowSwipeToPrev=!0},h.unlockSwipes=function(){h.params.allowSwipeToNext=h.params.allowSwipeToPrev=!0},h.params.grabCursor&&(h.container[0].style.cursor="move",h.container[0].style.cursor="-webkit-grab",h.container[0].style.cursor="-moz-grab",h.container[0].style.cursor="grab"),h.imagesToLoad=[],h.imagesLoaded=0,h.loadImage=function(e,t,a,r){function s(){r&&r()}var i;e.complete&&a?s():t?(i=new Image,i.onload=s,i.onerror=s,i.src=t):s()},h.preloadImages=function(){function e(){"undefined"!=typeof h&&null!==h&&(void 0!==h.imagesLoaded&&h.imagesLoaded++,h.imagesLoaded===h.imagesToLoad.length&&(h.params.updateOnImagesReady&&h.update(),h.emit("onImagesReady",h)))}h.imagesToLoad=h.container.find("img");for(var t=0;t<h.imagesToLoad.length;t++)h.loadImage(h.imagesToLoad[t],h.imagesToLoad[t].currentSrc||h.imagesToLoad[t].getAttribute("src"),!0,e)},h.autoplayTimeoutId=void 0,h.autoplaying=!1,h.autoplayPaused=!1,h.startAutoplay=function(){return"undefined"!=typeof h.autoplayTimeoutId?!1:h.params.autoplay?h.autoplaying?!1:(h.autoplaying=!0,h.emit("onAutoplayStart",h),void s()):!1},h.stopAutoplay=function(){h.autoplayTimeoutId&&(h.autoplayTimeoutId&&clearTimeout(h.autoplayTimeoutId),h.autoplaying=!1,h.autoplayTimeoutId=void 0,h.emit("onAutoplayStop",h))},h.pauseAutoplay=function(e){h.autoplayPaused||(h.autoplayTimeoutId&&clearTimeout(h.autoplayTimeoutId),h.autoplayPaused=!0,0===e?(h.autoplayPaused=!1,s()):h.wrapper.transitionEnd(function(){h.autoplayPaused=!1,h.autoplaying?s():h.stopAutoplay()}))},h.minTranslate=function(){return-h.snapGrid[0]},h.maxTranslate=function(){return-h.snapGrid[h.snapGrid.length-1]},h.updateContainerSize=function(){h.width=h.container[0].clientWidth,h.height=h.container[0].clientHeight,h.size=r()?h.width:h.height},h.updateSlidesSize=function(){h.slides=h.wrapper.children("."+h.params.slideClass),h.snapGrid=[],h.slidesGrid=[],h.slidesSizesGrid=[];var e,t=h.params.spaceBetween,a=0,s=0,i=0;"string"==typeof t&&t.indexOf("%")>=0&&(t=parseFloat(t.replace("%",""))/100*h.size),h.virtualSize=-t,h.slides.css(h.rtl?{marginLeft:"",marginTop:""}:{marginRight:"",marginBottom:""});var n;h.params.slidesPerColumn>1&&(n=Math.floor(h.slides.length/h.params.slidesPerColumn)===h.slides.length/h.params.slidesPerColumn?h.slides.length:Math.ceil(h.slides.length/h.params.slidesPerColumn)*h.params.slidesPerColumn);var o;for(e=0;e<h.slides.length;e++){o=0;var l=h.slides.eq(e);if(h.params.slidesPerColumn>1){var d,p,u,c,m=h.params.slidesPerColumn;"column"===h.params.slidesPerColumnFill?(p=Math.floor(e/m),u=e-p*m,d=p+u*n/m,l.css({"-webkit-box-ordinal-group":d,"-moz-box-ordinal-group":d,"-ms-flex-order":d,"-webkit-order":d,order:d})):(c=n/m,u=Math.floor(e/c),p=e-u*c),l.css({"margin-top":0!==u&&h.params.spaceBetween&&h.params.spaceBetween+"px"}).attr("data-swiper-column",p).attr("data-swiper-row",u)}"none"!==l.css("display")&&("auto"===h.params.slidesPerView?o=r()?l.outerWidth(!0):l.outerHeight(!0):(o=(h.size-(h.params.slidesPerView-1)*t)/h.params.slidesPerView,r()?h.slides[e].style.width=o+"px":h.slides[e].style.height=o+"px"),h.slides[e].swiperSlideSize=o,h.slidesSizesGrid.push(o),h.params.centeredSlides?(a=a+o/2+s/2+t,0===e&&(a=a-h.size/2-t),Math.abs(a)<.001&&(a=0),i%h.params.slidesPerGroup===0&&h.snapGrid.push(a),h.slidesGrid.push(a)):(i%h.params.slidesPerGroup===0&&h.snapGrid.push(a),h.slidesGrid.push(a),a=a+o+t),h.virtualSize+=o+t,s=o,i++)}h.virtualSize=Math.max(h.virtualSize,h.size);var f;if(h.rtl&&h.wrongRTL&&("slide"===h.params.effect||"coverflow"===h.params.effect)&&h.wrapper.css({width:h.virtualSize+h.params.spaceBetween+"px"}),(!h.support.flexbox||h.params.setWrapperSize)&&h.wrapper.css(r()?{width:h.virtualSize+h.params.spaceBetween+"px"}:{height:h.virtualSize+h.params.spaceBetween+"px"}),h.params.slidesPerColumn>1&&(h.virtualSize=(o+h.params.spaceBetween)*n,h.virtualSize=Math.ceil(h.virtualSize/h.params.slidesPerColumn)-h.params.spaceBetween,h.wrapper.css({width:h.virtualSize+h.params.spaceBetween+"px"}),h.params.centeredSlides)){for(f=[],e=0;e<h.snapGrid.length;e++)h.snapGrid[e]<h.virtualSize+h.snapGrid[0]&&f.push(h.snapGrid[e]);h.snapGrid=f}if(!h.params.centeredSlides){for(f=[],e=0;e<h.snapGrid.length;e++)h.snapGrid[e]<=h.virtualSize-h.size&&f.push(h.snapGrid[e]);h.snapGrid=f,Math.floor(h.virtualSize-h.size)>Math.floor(h.snapGrid[h.snapGrid.length-1])&&h.snapGrid.push(h.virtualSize-h.size)}0===h.snapGrid.length&&(h.snapGrid=[0]),0!==h.params.spaceBetween&&h.slides.css(r()?h.rtl?{marginLeft:t+"px"}:{marginRight:t+"px"}:{marginBottom:t+"px"}),h.params.watchSlidesProgress&&h.updateSlidesOffset()},h.updateSlidesOffset=function(){for(var e=0;e<h.slides.length;e++)h.slides[e].swiperSlideOffset=r()?h.slides[e].offsetLeft:h.slides[e].offsetTop},h.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=h.translate||0),0!==h.slides.length){"undefined"==typeof h.slides[0].swiperSlideOffset&&h.updateSlidesOffset();var t=h.params.centeredSlides?-e+h.size/2:-e;h.rtl&&(t=h.params.centeredSlides?e-h.size/2:e);{h.container[0].getBoundingClientRect(),r()?"left":"top",r()?"right":"bottom"}h.slides.removeClass(h.params.slideVisibleClass);for(var a=0;a<h.slides.length;a++){var s=h.slides[a],i=h.params.centeredSlides===!0?s.swiperSlideSize/2:0,n=(t-s.swiperSlideOffset-i)/(s.swiperSlideSize+h.params.spaceBetween);if(h.params.watchSlidesVisibility){var o=-(t-s.swiperSlideOffset-i),l=o+h.slidesSizesGrid[a],d=o>=0&&o<h.size||l>0&&l<=h.size||0>=o&&l>=h.size;d&&h.slides.eq(a).addClass(h.params.slideVisibleClass)}s.progress=h.rtl?-n:n}}},h.updateProgress=function(e){"undefined"==typeof e&&(e=h.translate||0);var t=h.maxTranslate()-h.minTranslate();0===t?(h.progress=0,h.isBeginning=h.isEnd=!0):(h.progress=(e-h.minTranslate())/t,h.isBeginning=h.progress<=0,h.isEnd=h.progress>=1),h.isBeginning&&h.emit("onReachBeginning",h),h.isEnd&&h.emit("onReachEnd",h),h.params.watchSlidesProgress&&h.updateSlidesProgress(e),h.emit("onProgress",h,h.progress)},h.updateActiveIndex=function(){var e,t,a,r=h.rtl?h.translate:-h.translate;for(t=0;t<h.slidesGrid.length;t++)"undefined"!=typeof h.slidesGrid[t+1]?r>=h.slidesGrid[t]&&r<h.slidesGrid[t+1]-(h.slidesGrid[t+1]-h.slidesGrid[t])/2?e=t:r>=h.slidesGrid[t]&&r<h.slidesGrid[t+1]&&(e=t+1):r>=h.slidesGrid[t]&&(e=t);(0>e||"undefined"==typeof e)&&(e=0),a=Math.floor(e/h.params.slidesPerGroup),a>=h.snapGrid.length&&(a=h.snapGrid.length-1),e!==h.activeIndex&&(h.snapIndex=a,h.previousIndex=h.activeIndex,h.activeIndex=e,h.updateClasses())},h.updateClasses=function(){h.slides.removeClass(h.params.slideActiveClass+" "+h.params.slideNextClass+" "+h.params.slidePrevClass);var e=h.slides.eq(h.activeIndex);if(e.addClass(h.params.slideActiveClass),e.next("."+h.params.slideClass).addClass(h.params.slideNextClass),e.prev("."+h.params.slideClass).addClass(h.params.slidePrevClass),h.bullets&&h.bullets.length>0){h.bullets.removeClass(h.params.bulletActiveClass);var t;h.params.loop?(t=Math.ceil(h.activeIndex-h.loopedSlides)/h.params.slidesPerGroup,t>h.slides.length-1-2*h.loopedSlides&&(t-=h.slides.length-2*h.loopedSlides),t>h.bullets.length-1&&(t-=h.bullets.length)):t="undefined"!=typeof h.snapIndex?h.snapIndex:h.activeIndex||0,h.paginationContainer.length>1?h.bullets.each(function(){g(this).index()===t&&g(this).addClass(h.params.bulletActiveClass)}):h.bullets.eq(t).addClass(h.params.bulletActiveClass)}h.params.loop||(h.params.prevButton&&(h.isBeginning?(g(h.params.prevButton).addClass(h.params.buttonDisabledClass),h.params.a11y&&h.a11y&&h.a11y.disable(g(h.params.prevButton))):(g(h.params.prevButton).removeClass(h.params.buttonDisabledClass),h.params.a11y&&h.a11y&&h.a11y.enable(g(h.params.prevButton)))),h.params.nextButton&&(h.isEnd?(g(h.params.nextButton).addClass(h.params.buttonDisabledClass),h.params.a11y&&h.a11y&&h.a11y.disable(g(h.params.nextButton))):(g(h.params.nextButton).removeClass(h.params.buttonDisabledClass),h.params.a11y&&h.a11y&&h.a11y.enable(g(h.params.nextButton)))))},h.updatePagination=function(){if(h.params.pagination&&h.paginationContainer&&h.paginationContainer.length>0){for(var e="",t=h.params.loop?Math.ceil((h.slides.length-2*h.loopedSlides)/h.params.slidesPerGroup):h.snapGrid.length,a=0;t>a;a++)e+=h.params.paginationBulletRender?h.params.paginationBulletRender(a,h.params.bulletClass):'<span class="'+h.params.bulletClass+'"></span>';h.paginationContainer.html(e),h.bullets=h.paginationContainer.find("."+h.params.bulletClass)}},h.update=function(e){function t(){r=Math.min(Math.max(h.translate,h.maxTranslate()),h.minTranslate()),h.setWrapperTranslate(r),h.updateActiveIndex(),h.updateClasses()}if(h.updateContainerSize(),h.updateSlidesSize(),h.updateProgress(),h.updatePagination(),h.updateClasses(),h.params.scrollbar&&h.scrollbar&&h.scrollbar.set(),e){var a,r;h.params.freeMode?t():(a="auto"===h.params.slidesPerView&&h.isEnd&&!h.params.centeredSlides?h.slideTo(h.slides.length-1,0,!1,!0):h.slideTo(h.activeIndex,0,!1,!0),a||t())}},h.onResize=function(){if(h.updateContainerSize(),h.updateSlidesSize(),h.updateProgress(),("auto"===h.params.slidesPerView||h.params.freeMode)&&h.updatePagination(),h.params.scrollbar&&h.scrollbar&&h.scrollbar.set(),h.params.freeMode){var e=Math.min(Math.max(h.translate,h.maxTranslate()),h.minTranslate());h.setWrapperTranslate(e),h.updateActiveIndex(),h.updateClasses()}else h.updateClasses(),"auto"===h.params.slidesPerView&&h.isEnd&&!h.params.centeredSlides?h.slideTo(h.slides.length-1,0,!1,!0):h.slideTo(h.activeIndex,0,!1,!0)};var v=["mousedown","mousemove","mouseup"];window.navigator.pointerEnabled?v=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(v=["MSPointerDown","MSPointerMove","MSPointerUp"]),h.touchEvents={start:h.support.touch||!h.params.simulateTouch?"touchstart":v[0],move:h.support.touch||!h.params.simulateTouch?"touchmove":v[1],end:h.support.touch||!h.params.simulateTouch?"touchend":v[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===h.params.touchEventsTarget?h.container:h.wrapper).addClass("swiper-wp8-"+h.params.direction),h.initEvents=function(e){var t=e?"off":"on",r=e?"removeEventListener":"addEventListener",s="container"===h.params.touchEventsTarget?h.container[0]:h.wrapper[0],i=h.support.touch?s:document,n=h.params.nested?!0:!1;h.browser.ie?(s[r](h.touchEvents.start,h.onTouchStart,!1),i[r](h.touchEvents.move,h.onTouchMove,n),i[r](h.touchEvents.end,h.onTouchEnd,!1)):(h.support.touch&&(s[r](h.touchEvents.start,h.onTouchStart,!1),s[r](h.touchEvents.move,h.onTouchMove,n),s[r](h.touchEvents.end,h.onTouchEnd,!1)),!a.simulateTouch||h.device.ios||h.device.android||(s[r]("mousedown",h.onTouchStart,!1),i[r]("mousemove",h.onTouchMove,n),i[r]("mouseup",h.onTouchEnd,!1))),window[r]("resize",h.onResize),h.params.nextButton&&(g(h.params.nextButton)[t]("click",h.onClickNext),h.params.a11y&&h.a11y&&g(h.params.nextButton)[t]("keydown",h.a11y.onEnterKey)),h.params.prevButton&&(g(h.params.prevButton)[t]("click",h.onClickPrev),h.params.a11y&&h.a11y&&g(h.params.prevButton)[t]("keydown",h.a11y.onEnterKey)),h.params.pagination&&h.params.paginationClickable&&g(h.paginationContainer)[t]("click","."+h.params.bulletClass,h.onClickIndex),(h.params.preventClicks||h.params.preventClicksPropagation)&&s[r]("click",h.preventClicks,!0)},h.attachEvents=function(){h.initEvents()},h.detachEvents=function(){h.initEvents(!0)},h.allowClick=!0,h.preventClicks=function(e){h.allowClick||(h.params.preventClicks&&e.preventDefault(),h.params.preventClicksPropagation&&(e.stopPropagation(),e.stopImmediatePropagation()))},h.onClickNext=function(e){e.preventDefault(),h.slideNext()},h.onClickPrev=function(e){e.preventDefault(),h.slidePrev()},h.onClickIndex=function(e){e.preventDefault();var t=g(this).index()*h.params.slidesPerGroup;h.params.loop&&(t+=h.loopedSlides),h.slideTo(t)},h.updateClickedSlide=function(e){var t=i(e,"."+h.params.slideClass);if(!t)return h.clickedSlide=void 0,void(h.clickedIndex=void 0);if(h.clickedSlide=t,h.clickedIndex=g(t).index(),h.params.slideToClickedSlide&&void 0!==h.clickedIndex&&h.clickedIndex!==h.activeIndex){var a,r=h.clickedIndex;if(h.params.loop)if(a=g(h.clickedSlide).attr("data-swiper-slide-index"),r>h.slides.length-h.params.slidesPerView)h.fixLoop(),r=h.wrapper.children("."+h.params.slideClass+'[data-swiper-slide-index="'+a+'"]').eq(0).index(),setTimeout(function(){h.slideTo(r)},0);else if(r<h.params.slidesPerView-1){h.fixLoop();var s=h.wrapper.children("."+h.params.slideClass+'[data-swiper-slide-index="'+a+'"]');r=s.eq(s.length-1).index(),setTimeout(function(){h.slideTo(r)},0)}else h.slideTo(r);else h.slideTo(r)}};var w,y,b,x,T,S,C,M,E,z="input, select, textarea, button",P=Date.now(),I=[];h.animating=!1,h.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var k,L;if(h.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),k="touchstart"===e.type,k||!("which"in e)||3!==e.which){if(h.params.noSwiping&&i(e,"."+h.params.noSwipingClass))return void(h.allowClick=!0);if(!h.params.swipeHandler||i(e,h.params.swipeHandler)){if(w=!0,y=!1,x=void 0,L=void 0,h.touches.startX=h.touches.currentX="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,h.touches.startY=h.touches.currentY="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,b=Date.now(),h.allowClick=!0,h.updateContainerSize(),h.swipeDirection=void 0,h.params.threshold>0&&(C=!1),"touchstart"!==e.type){var t=!0;g(e.target).is(z)&&(t=!1),document.activeElement&&g(document.activeElement).is(z)&&document.activeElement.blur(),t&&e.preventDefault()}h.emit("onTouchStart",h,e)}}},h.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!(k&&"mousemove"===e.type||e.preventedByNestedSwiper)){if(h.params.onlyExternal)return y=!0,void(h.allowClick=!1);if(k&&document.activeElement&&e.target===document.activeElement&&g(e.target).is(z))return y=!0,void(h.allowClick=!1);if(h.emit("onTouchMove",h,e),!(e.targetTouches&&e.targetTouches.length>1)){if(h.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,h.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof x){var t=180*Math.atan2(Math.abs(h.touches.currentY-h.touches.startY),Math.abs(h.touches.currentX-h.touches.startX))/Math.PI;x=r()?t>h.params.touchAngle:90-t>h.params.touchAngle}if(x&&h.emit("onTouchMoveOpposite",h,e),"undefined"==typeof L&&h.browser.ieTouch&&(h.touches.currentX!==h.touches.startX||h.touches.currentY!==h.touches.startY)&&(L=!0),w){if(x)return void(w=!1);if(L||!h.browser.ieTouch){h.allowClick=!1,h.emit("onSliderMove",h,e),e.preventDefault(),h.params.touchMoveStopPropagation&&!h.params.nested&&e.stopPropagation(),y||(a.loop&&h.fixLoop(),S=h.getWrapperTranslate(),h.setWrapperTransition(0),h.animating&&h.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),h.params.autoplay&&h.autoplaying&&(h.params.autoplayDisableOnInteraction?h.stopAutoplay():h.pauseAutoplay()),E=!1,h.params.grabCursor&&(h.container[0].style.cursor="move",h.container[0].style.cursor="-webkit-grabbing",h.container[0].style.cursor="-moz-grabbin",h.container[0].style.cursor="grabbing")),y=!0;var s=h.touches.diff=r()?h.touches.currentX-h.touches.startX:h.touches.currentY-h.touches.startY;s*=h.params.touchRatio,h.rtl&&(s=-s),h.swipeDirection=s>0?"prev":"next",T=s+S;var i=!0;if(s>0&&T>h.minTranslate()?(i=!1,h.params.resistance&&(T=h.minTranslate()-1+Math.pow(-h.minTranslate()+S+s,h.params.resistanceRatio))):0>s&&T<h.maxTranslate()&&(i=!1,h.params.resistance&&(T=h.maxTranslate()+1-Math.pow(h.maxTranslate()-S-s,h.params.resistanceRatio))),i&&(e.preventedByNestedSwiper=!0),!h.params.allowSwipeToNext&&"next"===h.swipeDirection&&S>T&&(T=S),!h.params.allowSwipeToPrev&&"prev"===h.swipeDirection&&T>S&&(T=S),h.params.followFinger){if(h.params.threshold>0){if(!(Math.abs(s)>h.params.threshold||C))return void(T=S);if(!C)return C=!0,h.touches.startX=h.touches.currentX,h.touches.startY=h.touches.currentY,T=S,void(h.touches.diff=r()?h.touches.currentX-h.touches.startX:h.touches.currentY-h.touches.startY)}(h.params.freeMode||h.params.watchSlidesProgress)&&h.updateActiveIndex(),h.params.freeMode&&(0===I.length&&I.push({position:h.touches[r()?"startX":"startY"],time:b}),I.push({position:h.touches[r()?"currentX":"currentY"],time:(new Date).getTime()})),h.updateProgress(T),h.setWrapperTranslate(T)}}}}}},h.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),h.emit("onTouchEnd",h,e),w){h.params.grabCursor&&y&&w&&(h.container[0].style.cursor="move",h.container[0].style.cursor="-webkit-grab",h.container[0].style.cursor="-moz-grab",h.container[0].style.cursor="grab");var t=Date.now(),a=t-b;if(h.allowClick&&(h.updateClickedSlide(e),h.emit("onTap",h,e),300>a&&t-P>300&&(M&&clearTimeout(M),M=setTimeout(function(){h&&(h.params.paginationHide&&h.paginationContainer.length>0&&!g(e.target).hasClass(h.params.bulletClass)&&h.paginationContainer.toggleClass(h.params.paginationHiddenClass),h.emit("onClick",h,e))},300)),300>a&&300>t-P&&(M&&clearTimeout(M),h.emit("onDoubleTap",h,e))),P=Date.now(),setTimeout(function(){h&&h.allowClick&&(h.allowClick=!0)},0),!w||!y||!h.swipeDirection||0===h.touches.diff||T===S)return void(w=y=!1);w=y=!1;var r;if(r=h.params.followFinger?h.rtl?h.translate:-h.translate:-T,h.params.freeMode){if(r<-h.minTranslate())return void h.slideTo(h.activeIndex);if(r>-h.maxTranslate())return void h.slideTo(h.slides.length-1);if(h.params.freeModeMomentum){if(I.length>1){var s=I.pop(),i=I.pop(),n=s.position-i.position,o=s.time-i.time;h.velocity=n/o,h.velocity=h.velocity/2,Math.abs(h.velocity)<.02&&(h.velocity=0),(o>150||(new Date).getTime()-s.time>300)&&(h.velocity=0)}else h.velocity=0;I.length=0;var l=1e3*h.params.freeModeMomentumRatio,d=h.velocity*l,p=h.translate+d;h.rtl&&(p=-p);var u,c=!1,m=20*Math.abs(h.velocity)*h.params.freeModeMomentumBounceRatio;p<h.maxTranslate()&&(h.params.freeModeMomentumBounce?(p+h.maxTranslate()<-m&&(p=h.maxTranslate()-m),u=h.maxTranslate(),c=!0,E=!0):p=h.maxTranslate()),p>h.minTranslate()&&(h.params.freeModeMomentumBounce?(p-h.minTranslate()>m&&(p=h.minTranslate()+m),u=h.minTranslate(),c=!0,E=!0):p=h.minTranslate()),0!==h.velocity&&(l=Math.abs(h.rtl?(-p-h.translate)/h.velocity:(p-h.translate)/h.velocity)),h.params.freeModeMomentumBounce&&c?(h.updateProgress(u),h.setWrapperTransition(l),h.setWrapperTranslate(p),h.onTransitionStart(),h.animating=!0,h.wrapper.transitionEnd(function(){E&&(h.emit("onMomentumBounce",h),h.setWrapperTransition(h.params.speed),h.setWrapperTranslate(u),h.wrapper.transitionEnd(function(){h.onTransitionEnd()}))})):h.velocity?(h.updateProgress(p),h.setWrapperTransition(l),h.setWrapperTranslate(p),h.onTransitionStart(),h.animating||(h.animating=!0,h.wrapper.transitionEnd(function(){h.onTransitionEnd()}))):h.updateProgress(p),h.updateActiveIndex()}return void((!h.params.freeModeMomentum||a>=h.params.longSwipesMs)&&(h.updateProgress(),h.updateActiveIndex()))}var f,v=0,x=h.slidesSizesGrid[0];for(f=0;f<h.slidesGrid.length;f+=h.params.slidesPerGroup)"undefined"!=typeof h.slidesGrid[f+h.params.slidesPerGroup]?r>=h.slidesGrid[f]&&r<h.slidesGrid[f+h.params.slidesPerGroup]&&(v=f,x=h.slidesGrid[f+h.params.slidesPerGroup]-h.slidesGrid[f]):r>=h.slidesGrid[f]&&(v=f,x=h.slidesGrid[h.slidesGrid.length-1]-h.slidesGrid[h.slidesGrid.length-2]);var C=(r-h.slidesGrid[v])/x;if(a>h.params.longSwipesMs){if(!h.params.longSwipes)return void h.slideTo(h.activeIndex);"next"===h.swipeDirection&&h.slideTo(C>=h.params.longSwipesRatio?v+h.params.slidesPerGroup:v),"prev"===h.swipeDirection&&h.slideTo(C>1-h.params.longSwipesRatio?v+h.params.slidesPerGroup:v)}else{if(!h.params.shortSwipes)return void h.slideTo(h.activeIndex);"next"===h.swipeDirection&&h.slideTo(v+h.params.slidesPerGroup),"prev"===h.swipeDirection&&h.slideTo(v)}}},h._slideTo=function(e,t){return h.slideTo(e,t,!0,!0)},h.slideTo=function(e,t,a,s){"undefined"==typeof a&&(a=!0),"undefined"==typeof e&&(e=0),0>e&&(e=0),h.snapIndex=Math.floor(e/h.params.slidesPerGroup),h.snapIndex>=h.snapGrid.length&&(h.snapIndex=h.snapGrid.length-1);var i=-h.snapGrid[h.snapIndex];h.params.autoplay&&h.autoplaying&&(s||!h.params.autoplayDisableOnInteraction?h.pauseAutoplay(t):h.stopAutoplay()),h.updateProgress(i);for(var n=0;n<h.slidesGrid.length;n++)-i>=h.slidesGrid[n]&&(e=n);if("undefined"==typeof t&&(t=h.params.speed),h.previousIndex=h.activeIndex||0,h.activeIndex=e,i===h.translate)return h.updateClasses(),!1;h.onTransitionStart(a);r()?i:0,r()?0:i;return 0===t?(h.setWrapperTransition(0),h.setWrapperTranslate(i),h.onTransitionEnd(a)):(h.setWrapperTransition(t),h.setWrapperTranslate(i),h.animating||(h.animating=!0,h.wrapper.transitionEnd(function(){h.onTransitionEnd(a)}))),h.updateClasses(),!0},h.onTransitionStart=function(e){"undefined"==typeof e&&(e=!0),h.lazy&&h.lazy.onTransitionStart(),e&&(h.emit("onTransitionStart",h),h.activeIndex!==h.previousIndex&&h.emit("onSlideChangeStart",h))},h.onTransitionEnd=function(e){h.animating=!1,h.setWrapperTransition(0),"undefined"==typeof e&&(e=!0),h.lazy&&h.lazy.onTransitionEnd(),e&&(h.emit("onTransitionEnd",h),h.activeIndex!==h.previousIndex&&h.emit("onSlideChangeEnd",h)),h.params.hashnav&&h.hashnav&&h.hashnav.setHash()},h.slideNext=function(e,t,a){if(h.params.loop){if(h.animating)return!1;h.fixLoop();{h.container[0].clientLeft}return h.slideTo(h.activeIndex+h.params.slidesPerGroup,t,e,a)}return h.slideTo(h.activeIndex+h.params.slidesPerGroup,t,e,a)},h._slideNext=function(e){return h.slideNext(!0,e,!0)},h.slidePrev=function(e,t,a){if(h.params.loop){if(h.animating)return!1;h.fixLoop();{h.container[0].clientLeft}return h.slideTo(h.activeIndex-1,t,e,a)}return h.slideTo(h.activeIndex-1,t,e,a)},h._slidePrev=function(e){return h.slidePrev(!0,e,!0)},h.slideReset=function(e,t){return h.slideTo(h.activeIndex,t,e)},h.setWrapperTransition=function(e,t){h.wrapper.transition(e),"slide"!==h.params.effect&&h.effects[h.params.effect]&&h.effects[h.params.effect].setTransition(e),h.params.parallax&&h.parallax&&h.parallax.setTransition(e),h.params.scrollbar&&h.scrollbar&&h.scrollbar.setTransition(e),h.params.control&&h.controller&&h.controller.setTransition(e,t),h.emit("onSetTransition",h,e)},h.setWrapperTranslate=function(e,t,a){var s=0,i=0,n=0;r()?s=h.rtl?-e:e:i=e,h.params.virtualTranslate||h.wrapper.transform(h.support.transforms3d?"translate3d("+s+"px, "+i+"px, "+n+"px)":"translate("+s+"px, "+i+"px)"),h.translate=r()?s:i,t&&h.updateActiveIndex(),"slide"!==h.params.effect&&h.effects[h.params.effect]&&h.effects[h.params.effect].setTranslate(h.translate),h.params.parallax&&h.parallax&&h.parallax.setTranslate(h.translate),h.params.scrollbar&&h.scrollbar&&h.scrollbar.setTranslate(h.translate),h.params.control&&h.controller&&h.controller.setTranslate(h.translate,a),h.emit("onSetTranslate",h,h.translate)},h.getTranslate=function(e,t){var a,r,s,i;return"undefined"==typeof t&&(t="x"),h.params.virtualTranslate?h.rtl?-h.translate:h.translate:(s=window.getComputedStyle(e,null),window.WebKitCSSMatrix?i=new WebKitCSSMatrix("none"===s.webkitTransform?"":s.webkitTransform):(i=s.MozTransform||s.OTransform||s.MsTransform||s.msTransform||s.transform||s.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),a=i.toString().split(",")),"x"===t&&(r=window.WebKitCSSMatrix?i.m41:parseFloat(16===a.length?a[12]:a[4])),"y"===t&&(r=window.WebKitCSSMatrix?i.m42:parseFloat(16===a.length?a[13]:a[5])),h.rtl&&r&&(r=-r),r||0)},h.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=r()?"x":"y"),h.getTranslate(h.wrapper[0],e)},h.observers=[],h.initObservers=function(){if(h.params.observeParents)for(var e=h.container.parents(),t=0;t<e.length;t++)n(e[t]);n(h.container[0],{childList:!1}),n(h.wrapper[0],{attributes:!1})},h.disconnectObservers=function(){for(var e=0;e<h.observers.length;e++)h.observers[e].disconnect();h.observers=[]},h.createLoop=function(){h.wrapper.children("."+h.params.slideClass+"."+h.params.slideDuplicateClass).remove();
var e=h.wrapper.children("."+h.params.slideClass);h.loopedSlides=parseInt(h.params.loopedSlides||h.params.slidesPerView,10),h.loopedSlides=h.loopedSlides+h.params.loopAdditionalSlides,h.loopedSlides>e.length&&(h.loopedSlides=e.length);var t,a=[],r=[];for(e.each(function(t,s){var i=g(this);t<h.loopedSlides&&r.push(s),t<e.length&&t>=e.length-h.loopedSlides&&a.push(s),i.attr("data-swiper-slide-index",t)}),t=0;t<r.length;t++)h.wrapper.append(g(r[t].cloneNode(!0)).addClass(h.params.slideDuplicateClass));for(t=a.length-1;t>=0;t--)h.wrapper.prepend(g(a[t].cloneNode(!0)).addClass(h.params.slideDuplicateClass))},h.destroyLoop=function(){h.wrapper.children("."+h.params.slideClass+"."+h.params.slideDuplicateClass).remove(),h.slides.removeAttr("data-swiper-slide-index")},h.fixLoop=function(){var e;h.activeIndex<h.loopedSlides?(e=h.slides.length-3*h.loopedSlides+h.activeIndex,e+=h.loopedSlides,h.slideTo(e,0,!1,!0)):("auto"===h.params.slidesPerView&&h.activeIndex>=2*h.loopedSlides||h.activeIndex>h.slides.length-2*h.params.slidesPerView)&&(e=-h.slides.length+h.activeIndex+h.loopedSlides,e+=h.loopedSlides,h.slideTo(e,0,!1,!0))},h.appendSlide=function(e){if(h.params.loop&&h.destroyLoop(),"object"==typeof e&&e.length)for(var t=0;t<e.length;t++)e[t]&&h.wrapper.append(e[t]);else h.wrapper.append(e);h.params.loop&&h.createLoop(),h.params.observer&&h.support.observer||h.update(!0)},h.prependSlide=function(e){h.params.loop&&h.destroyLoop();var t=h.activeIndex+1;if("object"==typeof e&&e.length){for(var a=0;a<e.length;a++)e[a]&&h.wrapper.prepend(e[a]);t=h.activeIndex+e.length}else h.wrapper.prepend(e);h.params.loop&&h.createLoop(),h.params.observer&&h.support.observer||h.update(!0),h.slideTo(t,0,!1)},h.removeSlide=function(e){h.params.loop&&h.destroyLoop();var t,a=h.activeIndex;if("object"==typeof e&&e.length){for(var r=0;r<e.length;r++)t=e[r],h.slides[t]&&h.slides.eq(t).remove(),a>t&&a--;a=Math.max(a,0)}else t=e,h.slides[t]&&h.slides.eq(t).remove(),a>t&&a--,a=Math.max(a,0);h.params.observer&&h.support.observer||h.update(!0),h.slideTo(a,0,!1)},h.removeAllSlides=function(){for(var e=[],t=0;t<h.slides.length;t++)e.push(t);h.removeSlide(e)},h.effects={fade:{fadeIndex:null,setTranslate:function(){for(var e=0;e<h.slides.length;e++){var t=h.slides.eq(e),a=t[0].swiperSlideOffset,s=-a;h.params.virtualTranslate||(s-=h.translate);var i=0;r()||(i=s,s=0);var n=h.params.fade.crossFade?Math.max(1-Math.abs(t[0].progress),0):1+Math.min(Math.max(t[0].progress,-1),0);n>0&&1>n&&(h.effects.fade.fadeIndex=e),t.css({opacity:n}).transform("translate3d("+s+"px, "+i+"px, 0px)")}},setTransition:function(e){if(h.slides.transition(e),h.params.virtualTranslate&&0!==e){var t=null!==h.effects.fade.fadeIndex?h.effects.fade.fadeIndex:h.activeIndex;h.slides.eq(t).transitionEnd(function(){for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],t=0;t<e.length;t++)h.wrapper.trigger(e[t])})}}},cube:{setTranslate:function(){var e,t=0;h.params.cube.shadow&&(r()?(e=h.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=g('<div class="swiper-cube-shadow"></div>'),h.wrapper.append(e)),e.css({height:h.width+"px"})):(e=h.container.find(".swiper-cube-shadow"),0===e.length&&(e=g('<div class="swiper-cube-shadow"></div>'),h.container.append(e))));for(var a=0;a<h.slides.length;a++){var s=h.slides.eq(a),i=90*a,n=Math.floor(i/360);h.rtl&&(i=-i,n=Math.floor(-i/360));var o=Math.max(Math.min(s[0].progress,1),-1),l=0,d=0,p=0;a%4===0?(l=4*-n*h.size,p=0):(a-1)%4===0?(l=0,p=4*-n*h.size):(a-2)%4===0?(l=h.size+4*n*h.size,p=h.size):(a-3)%4===0&&(l=-h.size,p=3*h.size+4*h.size*n),h.rtl&&(l=-l),r()||(d=l,l=0);var u="rotateX("+(r()?0:-i)+"deg) rotateY("+(r()?i:0)+"deg) translate3d("+l+"px, "+d+"px, "+p+"px)";if(1>=o&&o>-1&&(t=90*a+90*o,h.rtl&&(t=90*-a-90*o)),s.transform(u),h.params.cube.slideShadows){var c=s.find(r()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),m=s.find(r()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===c.length&&(c=g('<div class="swiper-slide-shadow-'+(r()?"left":"top")+'"></div>'),s.append(c)),0===m.length&&(m=g('<div class="swiper-slide-shadow-'+(r()?"right":"bottom")+'"></div>'),s.append(m));{s[0].progress}c.length&&(c[0].style.opacity=-s[0].progress),m.length&&(m[0].style.opacity=s[0].progress)}}if(h.wrapper.css({"-webkit-transform-origin":"50% 50% -"+h.size/2+"px","-moz-transform-origin":"50% 50% -"+h.size/2+"px","-ms-transform-origin":"50% 50% -"+h.size/2+"px","transform-origin":"50% 50% -"+h.size/2+"px"}),h.params.cube.shadow)if(r())e.transform("translate3d(0px, "+(h.width/2+h.params.cube.shadowOffset)+"px, "+-h.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+h.params.cube.shadowScale+")");else{var f=Math.abs(t)-90*Math.floor(Math.abs(t)/90),v=1.5-(Math.sin(2*f*Math.PI/360)/2+Math.cos(2*f*Math.PI/360)/2),w=h.params.cube.shadowScale,y=h.params.cube.shadowScale/v,b=h.params.cube.shadowOffset;e.transform("scale3d("+w+", 1, "+y+") translate3d(0px, "+(h.height/2+b)+"px, "+-h.height/2/y+"px) rotateX(-90deg)")}var x=h.isSafari||h.isUiWebView?-h.size/2:0;h.wrapper.transform("translate3d(0px,0,"+x+"px) rotateX("+(r()?0:t)+"deg) rotateY("+(r()?-t:0)+"deg)")},setTransition:function(e){h.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),h.params.cube.shadow&&!r()&&h.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=h.translate,t=r()?-e+h.width/2:-e+h.height/2,a=r()?h.params.coverflow.rotate:-h.params.coverflow.rotate,s=h.params.coverflow.depth,i=0,n=h.slides.length;n>i;i++){var o=h.slides.eq(i),l=h.slidesSizesGrid[i],d=o[0].swiperSlideOffset,p=(t-d-l/2)/l*h.params.coverflow.modifier,u=r()?a*p:0,c=r()?0:a*p,m=-s*Math.abs(p),f=r()?0:h.params.coverflow.stretch*p,v=r()?h.params.coverflow.stretch*p:0;Math.abs(v)<.001&&(v=0),Math.abs(f)<.001&&(f=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0),Math.abs(c)<.001&&(c=0);var w="translate3d("+v+"px,"+f+"px,"+m+"px)  rotateX("+c+"deg) rotateY("+u+"deg)";if(o.transform(w),o[0].style.zIndex=-Math.abs(Math.round(p))+1,h.params.coverflow.slideShadows){var y=o.find(r()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),b=o.find(r()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===y.length&&(y=g('<div class="swiper-slide-shadow-'+(r()?"left":"top")+'"></div>'),o.append(y)),0===b.length&&(b=g('<div class="swiper-slide-shadow-'+(r()?"right":"bottom")+'"></div>'),o.append(b)),y.length&&(y[0].style.opacity=p>0?p:0),b.length&&(b[0].style.opacity=-p>0?-p:0)}}if(h.browser.ie){var x=h.wrapper[0].style;x.perspectiveOrigin=t+"px 50%"}},setTransition:function(e){h.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},h.lazy={initialImageLoaded:!1,loadImageInSlide:function(e){if("undefined"!=typeof e&&0!==h.slides.length){var t=h.slides.eq(e),a=t.find("img.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");0!==a.length&&a.each(function(){var e=g(this);e.addClass("swiper-lazy-loading");var a=e.attr("data-src");h.loadImage(e[0],a,!1,function(){e.attr("src",a),e.removeAttr("data-src"),e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),t.find(".swiper-lazy-preloader, .preloader").remove(),h.emit("onLazyImageReady",h,t[0],e[0])}),h.emit("onLazyImageLoad",h,t[0],e[0])})}},load:function(){if(h.params.watchSlidesVisibility)h.wrapper.children("."+h.params.slideVisibleClass).each(function(){h.lazy.loadImageInSlide(g(this).index())});else if(h.params.slidesPerView>1)for(var e=h.activeIndex;e<h.activeIndex+h.params.slidesPerView;e++)h.slides[e]&&h.lazy.loadImageInSlide(e);else h.lazy.loadImageInSlide(h.activeIndex);if(h.params.lazyLoadingInPrevNext){var t=h.wrapper.children("."+h.params.slideNextClass);t.length>0&&h.lazy.loadImageInSlide(t.index());var a=h.wrapper.children("."+h.params.slidePrevClass);a.length>0&&h.lazy.loadImageInSlide(a.index())}},onTransitionStart:function(){h.params.lazyLoading&&(h.params.lazyLoadingOnTransitionStart||!h.params.lazyLoadingOnTransitionStart&&!h.lazy.initialImageLoaded)&&(h.lazy.initialImageLoaded=!0,h.lazy.load())},onTransitionEnd:function(){h.params.lazyLoading&&!h.params.lazyLoadingOnTransitionStart&&h.lazy.load()}},h.scrollbar={set:function(){if(h.params.scrollbar){var e=h.scrollbar;e.track=g(h.params.scrollbar),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=g('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=r()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=h.size/h.virtualSize,e.moveDivider=e.divider*(e.trackSize/h.size),e.dragSize=e.trackSize*e.divider,r()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.track[0].style.display=e.divider>=1?"none":"",h.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(h.params.scrollbar){var e,t=h.scrollbar,a=(h.translate||0,t.dragSize);e=(t.trackSize-t.dragSize)*h.progress,h.rtl&&r()?(e=-e,e>0?(a=t.dragSize-e,e=0):-e+t.dragSize>t.trackSize&&(a=t.trackSize+e)):0>e?(a=t.dragSize+e,e=0):e+t.dragSize>t.trackSize&&(a=t.trackSize-e),r()?(t.drag.transform(h.support.transforms3d?"translate3d("+e+"px, 0, 0)":"translateX("+e+"px)"),t.drag[0].style.width=a+"px"):(t.drag.transform(h.support.transforms3d?"translate3d(0px, "+e+"px, 0)":"translateY("+e+"px)"),t.drag[0].style.height=a+"px"),h.params.scrollbarHide&&(clearTimeout(t.timeout),t.track[0].style.opacity=1,t.timeout=setTimeout(function(){t.track[0].style.opacity=0,t.track.transition(400)},1e3))}},setTransition:function(e){h.params.scrollbar&&h.scrollbar.drag.transition(e)}},h.controller={setTranslate:function(e,t){var a,r,s=h.params.control;if(h.isArray(s))for(var i=0;i<s.length;i++)s[i]!==t&&s[i]instanceof Swiper&&(e=s[i].rtl&&"horizontal"===s[i].params.direction?-h.translate:h.translate,a=(s[i].maxTranslate()-s[i].minTranslate())/(h.maxTranslate()-h.minTranslate()),r=(e-h.minTranslate())*a+s[i].minTranslate(),h.params.controlInverse&&(r=s[i].maxTranslate()-r),s[i].updateProgress(r),s[i].setWrapperTranslate(r,!1,h),s[i].updateActiveIndex());else s instanceof Swiper&&t!==s&&(e=s.rtl&&"horizontal"===s.params.direction?-h.translate:h.translate,a=(s.maxTranslate()-s.minTranslate())/(h.maxTranslate()-h.minTranslate()),r=(e-h.minTranslate())*a+s.minTranslate(),h.params.controlInverse&&(r=s.maxTranslate()-r),s.updateProgress(r),s.setWrapperTranslate(r,!1,h),s.updateActiveIndex())},setTransition:function(e,t){var a=h.params.control;if(h.isArray(a))for(var r=0;r<a.length;r++)a[r]!==t&&a[r]instanceof Swiper&&a[r].setWrapperTransition(e,h);else a instanceof Swiper&&t!==a&&a.setWrapperTransition(e,h)}},h.hashnav={init:function(){if(h.params.hashnav){h.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var t=0,a=0,r=h.slides.length;r>a;a++){var s=h.slides.eq(a),i=s.attr("data-hash");if(i===e&&!s.hasClass(h.params.slideDuplicateClass)){var n=s.index();h.slideTo(n,t,h.params.runCallbacksOnInit,!0)}}}},setHash:function(){h.hashnav.initialized&&h.params.hashnav&&(document.location.hash=h.slides.eq(h.activeIndex).attr("data-hash")||"")}},h.disableKeyboardControl=function(){g(document).off("keydown",o)},h.enableKeyboardControl=function(){g(document).on("keydown",o)},h._wheelEvent=!1,h._lastWheelScrollTime=(new Date).getTime(),h.params.mousewheelControl){if(void 0!==document.onmousewheel&&(h._wheelEvent="mousewheel"),!h._wheelEvent)try{new WheelEvent("wheel"),h._wheelEvent="wheel"}catch(D){}h._wheelEvent||(h._wheelEvent="DOMMouseScroll")}h.disableMousewheelControl=function(){return h._wheelEvent?(h.container.off(h._wheelEvent,l),!0):!1},h.enableMousewheelControl=function(){return h._wheelEvent?(h.container.on(h._wheelEvent,l),!0):!1},h.parallax={setTranslate:function(){h.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){d(this,h.progress)}),h.slides.each(function(){var e=g(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var t=Math.min(Math.max(e[0].progress,-1),1);d(this,t)})})},setTransition:function(e){"undefined"==typeof e&&(e=h.params.speed),h.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var t=g(this),a=parseInt(t.attr("data-swiper-parallax-duration"),10)||e;0===e&&(a=0),t.transition(a)})}},h._plugins=[];for(var B in h.plugins){var A=h.plugins[B](h,h.params[B]);A&&h._plugins.push(A)}return h.callPlugins=function(e){for(var t=0;t<h._plugins.length;t++)e in h._plugins[t]&&h._plugins[t][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},h.emitterEventListeners={},h.emit=function(e){h.params[e]&&h.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var t;if(h.emitterEventListeners[e])for(t=0;t<h.emitterEventListeners[e].length;t++)h.emitterEventListeners[e][t](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);h.callPlugins&&h.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},h.on=function(e,t){return e=p(e),h.emitterEventListeners[e]||(h.emitterEventListeners[e]=[]),h.emitterEventListeners[e].push(t),h},h.off=function(e,t){var a;if(e=p(e),"undefined"==typeof t)return h.emitterEventListeners[e]=[],h;if(h.emitterEventListeners[e]&&0!==h.emitterEventListeners[e].length){for(a=0;a<h.emitterEventListeners[e].length;a++)h.emitterEventListeners[e][a]===t&&h.emitterEventListeners[e].splice(a,1);return h}},h.once=function(e,t){e=p(e);var a=function(){t(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),h.off(e,a)};return h.on(e,a),h},h.a11y={makeFocusable:function(e){return e[0].tabIndex="0",e},addRole:function(e,t){return e.attr("role",t),e},addLabel:function(e,t){return e.attr("aria-label",t),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){13===e.keyCode&&(g(e.target).is(h.params.nextButton)?(h.onClickNext(e),h.a11y.notify(h.isEnd?h.params.lastSlideMsg:h.params.nextSlideMsg)):g(e.target).is(h.params.prevButton)&&(h.onClickPrev(e),h.a11y.notify(h.isBeginning?h.params.firstSlideMsg:h.params.prevSlideMsg)))},liveRegion:g('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var t=h.a11y.liveRegion;0!==t.length&&(t.html(""),t.html(e))},init:function(){if(h.params.nextButton){var e=g(h.params.nextButton);h.a11y.makeFocusable(e),h.a11y.addRole(e,"button"),h.a11y.addLabel(e,h.params.nextSlideMsg)}if(h.params.prevButton){var t=g(h.params.prevButton);h.a11y.makeFocusable(t),h.a11y.addRole(t,"button"),h.a11y.addLabel(t,h.params.prevSlideMsg)}g(h.container).append(h.a11y.liveRegion)},destroy:function(){h.a11y.liveRegion&&h.a11y.liveRegion.length>0&&h.a11y.liveRegion.remove()}},h.init=function(){h.params.loop&&h.createLoop(),h.updateContainerSize(),h.updateSlidesSize(),h.updatePagination(),h.params.scrollbar&&h.scrollbar&&h.scrollbar.set(),"slide"!==h.params.effect&&h.effects[h.params.effect]&&(h.params.loop||h.updateProgress(),h.effects[h.params.effect].setTranslate()),h.params.loop?h.slideTo(h.params.initialSlide+h.loopedSlides,0,h.params.runCallbacksOnInit):(h.slideTo(h.params.initialSlide,0,h.params.runCallbacksOnInit),0===h.params.initialSlide&&(h.parallax&&h.params.parallax&&h.parallax.setTranslate(),h.lazy&&h.params.lazyLoading&&h.lazy.load())),h.attachEvents(),h.params.observer&&h.support.observer&&h.initObservers(),h.params.preloadImages&&!h.params.lazyLoading&&h.preloadImages(),h.params.autoplay&&h.startAutoplay(),h.params.keyboardControl&&h.enableKeyboardControl&&h.enableKeyboardControl(),h.params.mousewheelControl&&h.enableMousewheelControl&&h.enableMousewheelControl(),h.params.hashnav&&h.hashnav&&h.hashnav.init(),h.params.a11y&&h.a11y&&h.a11y.init(),h.emit("onInit",h)},h.cleanupStyles=function(){h.container.removeClass(h.classNames.join(" ")).removeAttr("style"),h.wrapper.removeAttr("style"),h.slides&&h.slides.length&&h.slides.removeClass([h.params.slideVisibleClass,h.params.slideActiveClass,h.params.slideNextClass,h.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),h.paginationContainer&&h.paginationContainer.length&&h.paginationContainer.removeClass(h.params.paginationHiddenClass),h.bullets&&h.bullets.length&&h.bullets.removeClass(h.params.bulletActiveClass),h.params.prevButton&&g(h.params.prevButton).removeClass(h.params.buttonDisabledClass),h.params.nextButton&&g(h.params.nextButton).removeClass(h.params.buttonDisabledClass),h.params.scrollbar&&h.scrollbar&&(h.scrollbar.track&&h.scrollbar.track.length&&h.scrollbar.track.removeAttr("style"),h.scrollbar.drag&&h.scrollbar.drag.length&&h.scrollbar.drag.removeAttr("style"))},h.destroy=function(e,t){h.detachEvents(),h.stopAutoplay(),h.params.loop&&h.destroyLoop(),t&&h.cleanupStyles(),h.disconnectObservers(),h.params.keyboardControl&&h.disableKeyboardControl&&h.disableKeyboardControl(),h.params.mousewheelControl&&h.disableMousewheelControl&&h.disableMousewheelControl(),h.params.a11y&&h.a11y&&h.a11y.destroy(),h.emit("onDestroy"),e!==!1&&(h=null)},h.init(),h}},Swiper.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1},device:function(){var e=navigator.userAgent,t=e.match(/(Android);?[\s\/]+([\d.]+)?/),a=e.match(/(iPad).*OS\s([\d_]+)/),r=(e.match(/(iPod)(.*OS\s([\d_]+))?/),!a&&e.match(/(iPhone\sOS)\s([\d_]+)/));return{ios:a||r||a,android:t}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,t="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),a=0;a<t.length;a++)if(t[a]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}()},plugins:{}};for(var t=(function(){var e=function(e){var t=this,a=0;for(a=0;a<e.length;a++)t[a]=e[a];return t.length=e.length,this},t=function(t,a){var r=[],s=0;if(t&&!a&&t instanceof e)return t;if(t)if("string"==typeof t){var i,n,o=t.trim();if(o.indexOf("<")>=0&&o.indexOf(">")>=0){var l="div";for(0===o.indexOf("<li")&&(l="ul"),0===o.indexOf("<tr")&&(l="tbody"),(0===o.indexOf("<td")||0===o.indexOf("<th"))&&(l="tr"),0===o.indexOf("<tbody")&&(l="table"),0===o.indexOf("<option")&&(l="select"),n=document.createElement(l),n.innerHTML=t,s=0;s<n.childNodes.length;s++)r.push(n.childNodes[s])}else for(i=a||"#"!==t[0]||t.match(/[ .<>:~]/)?(a||document).querySelectorAll(t):[document.getElementById(t.split("#")[1])],s=0;s<i.length;s++)i[s]&&r.push(i[s])}else if(t.nodeType||t===window||t===document)r.push(t);else if(t.length>0&&t[0].nodeType)for(s=0;s<t.length;s++)r.push(t[s]);return new e(r)};return e.prototype={addClass:function(e){if("undefined"==typeof e)return this;for(var t=e.split(" "),a=0;a<t.length;a++)for(var r=0;r<this.length;r++)this[r].classList.add(t[a]);return this},removeClass:function(e){for(var t=e.split(" "),a=0;a<t.length;a++)for(var r=0;r<this.length;r++)this[r].classList.remove(t[a]);return this},hasClass:function(e){return this[0]?this[0].classList.contains(e):!1},toggleClass:function(e){for(var t=e.split(" "),a=0;a<t.length;a++)for(var r=0;r<this.length;r++)this[r].classList.toggle(t[a]);return this},attr:function(e,t){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(var a=0;a<this.length;a++)if(2===arguments.length)this[a].setAttribute(e,t);else for(var r in e)this[a][r]=e[r],this[a].setAttribute(r,e[r]);return this},removeAttr:function(e){for(var t=0;t<this.length;t++)this[t].removeAttribute(e);return this},data:function(e,t){if("undefined"==typeof t){if(this[0]){var a=this[0].getAttribute("data-"+e);return a?a:this[0].dom7ElementDataStorage&&e in this[0].dom7ElementDataStorage?this[0].dom7ElementDataStorage[e]:void 0}return void 0}for(var r=0;r<this.length;r++){var s=this[r];s.dom7ElementDataStorage||(s.dom7ElementDataStorage={}),s.dom7ElementDataStorage[e]=t}return this},transform:function(e){for(var t=0;t<this.length;t++){var a=this[t].style;a.webkitTransform=a.MsTransform=a.msTransform=a.MozTransform=a.OTransform=a.transform=e}return this},transition:function(e){"string"!=typeof e&&(e+="ms");for(var t=0;t<this.length;t++){var a=this[t].style;a.webkitTransitionDuration=a.MsTransitionDuration=a.msTransitionDuration=a.MozTransitionDuration=a.OTransitionDuration=a.transitionDuration=e}return this},on:function(e,a,r,s){function i(e){var s=e.target;if(t(s).is(a))r.call(s,e);else for(var i=t(s).parents(),n=0;n<i.length;n++)t(i[n]).is(a)&&r.call(i[n],e)}var n,o,l=e.split(" ");for(n=0;n<this.length;n++)if("function"==typeof a||a===!1)for("function"==typeof a&&(r=arguments[1],s=arguments[2]||!1),o=0;o<l.length;o++)this[n].addEventListener(l[o],r,s);else for(o=0;o<l.length;o++)this[n].dom7LiveListeners||(this[n].dom7LiveListeners=[]),this[n].dom7LiveListeners.push({listener:r,liveListener:i}),this[n].addEventListener(l[o],i,s);return this},off:function(e,t,a,r){for(var s=e.split(" "),i=0;i<s.length;i++)for(var n=0;n<this.length;n++)if("function"==typeof t||t===!1)"function"==typeof t&&(a=arguments[1],r=arguments[2]||!1),this[n].removeEventListener(s[i],a,r);else if(this[n].dom7LiveListeners)for(var o=0;o<this[n].dom7LiveListeners.length;o++)this[n].dom7LiveListeners[o].listener===a&&this[n].removeEventListener(s[i],this[n].dom7LiveListeners[o].liveListener,r);return this},once:function(e,t,a,r){function s(n){a(n),i.off(e,t,s,r)}var i=this;"function"==typeof t&&(t=!1,a=arguments[1],r=arguments[2]),i.on(e,t,s,r)},trigger:function(e,t){for(var a=0;a<this.length;a++){var r;try{r=new CustomEvent(e,{detail:t,bubbles:!0,cancelable:!0})}catch(s){r=document.createEvent("Event"),r.initEvent(e,!0,!0),r.detail=t}this[a].dispatchEvent(r)}return this},transitionEnd:function(e){function t(i){if(i.target===this)for(e.call(this,i),a=0;a<r.length;a++)s.off(r[a],t)}var a,r=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=this;if(e)for(a=0;a<r.length;a++)s.on(r[a],t);return this},width:function(){return this[0]===window?window.innerWidth:this.length>0?parseFloat(this.css("width")):null},outerWidth:function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null},height:function(){return this[0]===window?window.innerHeight:this.length>0?parseFloat(this.css("height")):null},outerHeight:function(e){return this.length>0?e?this[0].offsetHeight+parseFloat(this.css("margin-top"))+parseFloat(this.css("margin-bottom")):this[0].offsetHeight:null},offset:function(){if(this.length>0){var e=this[0],t=e.getBoundingClientRect(),a=document.body,r=e.clientTop||a.clientTop||0,s=e.clientLeft||a.clientLeft||0,i=window.pageYOffset||e.scrollTop,n=window.pageXOffset||e.scrollLeft;return{top:t.top+i-r,left:t.left+n-s}}return null},css:function(e,t){var a;if(1===arguments.length){if("string"!=typeof e){for(a=0;a<this.length;a++)for(var r in e)this[a].style[r]=e[r];return this}if(this[0])return window.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(a=0;a<this.length;a++)this[a].style[e]=t;return this}return this},each:function(e){for(var t=0;t<this.length;t++)e.call(this[t],t,this[t]);return this},html:function(e){if("undefined"==typeof e)return this[0]?this[0].innerHTML:void 0;for(var t=0;t<this.length;t++)this[t].innerHTML=e;return this},is:function(a){if(!this[0])return!1;var r,s;if("string"==typeof a){var i=this[0];if(i===document)return a===document;if(i===window)return a===window;if(i.matches)return i.matches(a);if(i.webkitMatchesSelector)return i.webkitMatchesSelector(a);if(i.mozMatchesSelector)return i.mozMatchesSelector(a);if(i.msMatchesSelector)return i.msMatchesSelector(a);for(r=t(a),s=0;s<r.length;s++)if(r[s]===this[0])return!0;return!1}if(a===document)return this[0]===document;if(a===window)return this[0]===window;if(a.nodeType||a instanceof e){for(r=a.nodeType?[a]:a,s=0;s<r.length;s++)if(r[s]===this[0])return!0;return!1}return!1},index:function(){if(this[0]){for(var e=this[0],t=0;null!==(e=e.previousSibling);)1===e.nodeType&&t++;return t}return void 0},eq:function(t){if("undefined"==typeof t)return this;var a,r=this.length;return t>r-1?new e([]):0>t?(a=r+t,new e(0>a?[]:[this[a]])):new e([this[t]])},append:function(t){var a,r;for(a=0;a<this.length;a++)if("string"==typeof t){var s=document.createElement("div");for(s.innerHTML=t;s.firstChild;)this[a].appendChild(s.firstChild)}else if(t instanceof e)for(r=0;r<t.length;r++)this[a].appendChild(t[r]);else this[a].appendChild(t);return this},prepend:function(t){var a,r;for(a=0;a<this.length;a++)if("string"==typeof t){var s=document.createElement("div");for(s.innerHTML=t,r=s.childNodes.length-1;r>=0;r--)this[a].insertBefore(s.childNodes[r],this[a].childNodes[0])}else if(t instanceof e)for(r=0;r<t.length;r++)this[a].insertBefore(t[r],this[a].childNodes[0]);else this[a].insertBefore(t,this[a].childNodes[0]);return this},insertBefore:function(e){for(var a=t(e),r=0;r<this.length;r++)if(1===a.length)a[0].parentNode.insertBefore(this[r],a[0]);else if(a.length>1)for(var s=0;s<a.length;s++)a[s].parentNode.insertBefore(this[r].cloneNode(!0),a[s])},insertAfter:function(e){for(var a=t(e),r=0;r<this.length;r++)if(1===a.length)a[0].parentNode.insertBefore(this[r],a[0].nextSibling);else if(a.length>1)for(var s=0;s<a.length;s++)a[s].parentNode.insertBefore(this[r].cloneNode(!0),a[s].nextSibling)},next:function(a){return new e(this.length>0?a?this[0].nextElementSibling&&t(this[0].nextElementSibling).is(a)?[this[0].nextElementSibling]:[]:this[0].nextElementSibling?[this[0].nextElementSibling]:[]:[])},nextAll:function(a){var r=[],s=this[0];if(!s)return new e([]);for(;s.nextElementSibling;){var i=s.nextElementSibling;a?t(i).is(a)&&r.push(i):r.push(i),s=i}return new e(r)},prev:function(a){return new e(this.length>0?a?this[0].previousElementSibling&&t(this[0].previousElementSibling).is(a)?[this[0].previousElementSibling]:[]:this[0].previousElementSibling?[this[0].previousElementSibling]:[]:[])},prevAll:function(a){var r=[],s=this[0];if(!s)return new e([]);for(;s.previousElementSibling;){var i=s.previousElementSibling;a?t(i).is(a)&&r.push(i):r.push(i),s=i}return new e(r)},parent:function(e){for(var a=[],r=0;r<this.length;r++)e?t(this[r].parentNode).is(e)&&a.push(this[r].parentNode):a.push(this[r].parentNode);return t(t.unique(a))},parents:function(e){for(var a=[],r=0;r<this.length;r++)for(var s=this[r].parentNode;s;)e?t(s).is(e)&&a.push(s):a.push(s),s=s.parentNode;return t(t.unique(a))},find:function(t){for(var a=[],r=0;r<this.length;r++)for(var s=this[r].querySelectorAll(t),i=0;i<s.length;i++)a.push(s[i]);return new e(a)},children:function(a){for(var r=[],s=0;s<this.length;s++)for(var i=this[s].childNodes,n=0;n<i.length;n++)a?1===i[n].nodeType&&t(i[n]).is(a)&&r.push(i[n]):1===i[n].nodeType&&r.push(i[n]);return new e(t.unique(r))},remove:function(){for(var e=0;e<this.length;e++)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},add:function(){var e,a,r=this;for(e=0;e<arguments.length;e++){var s=t(arguments[e]);for(a=0;a<s.length;a++)r[r.length]=s[a],r.length++}return r}},t.fn=e.prototype,t.unique=function(e){for(var t=[],a=0;a<e.length;a++)-1===t.indexOf(e[a])&&t.push(e[a]);return t},t}()),a=["jQuery","Zepto","Dom7"],r=0;r<a.length;r++)window[a[r]]&&e(window[a[r]]);var s;s="undefined"==typeof t?window.Dom7||window.Zepto||window.jQuery:t,s&&("transitionEnd"in s.fn||(s.fn.transitionEnd=function(e){function t(i){if(i.target===this)for(e.call(this,i),a=0;a<r.length;a++)s.off(r[a],t)}var a,r=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=this;if(e)for(a=0;a<r.length;a++)s.on(r[a],t);return this}),"transform"in s.fn||(s.fn.transform=function(e){for(var t=0;t<this.length;t++){var a=this[t].style;a.webkitTransform=a.MsTransform=a.msTransform=a.MozTransform=a.OTransform=a.transform=e}return this}),"transition"in s.fn||(s.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var t=0;t<this.length;t++){var a=this[t].style;a.webkitTransitionDuration=a.MsTransitionDuration=a.msTransitionDuration=a.MozTransitionDuration=a.OTransitionDuration=a.transitionDuration=e}return this}))}(),"undefined"!=typeof module?module.exports=Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return Swiper});
//# sourceMappingURL=maps/swiper.min.js.map