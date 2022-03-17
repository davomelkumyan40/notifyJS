/*It is important to use this library only with JQuery otherwise nothing will work*/

'use strict';

(() => {
    $("body").css("overflow", "hidden");
})();

class Notify {
    static array = [];
    static queue = $("<div>").css({
        "position": "absolute",
        "bottom": "10px",
        "right": "10px",
        "width": "fit-content",
        "height": "fit-content",
    }).appendTo("body");

    static alert(options = { disapear: false, timeout: 0 }, icon) {
        const { title, message, disapear, timeout } = options;

        const closeAnim = {
            right: '-500px',
            opacity: '0',
        }
        const closeRemove = {
            complete: function () { $(this).remove() }
        };
        const notification = $("<div>")
            .append($("<div>")
                .append($("<div>").css({
                    "transition": "0.3s ease background",
                    "position": "absolute",
                    "left": "50%",
                    "transform": "translateX(-50%)",
                    "width": "3px",
                    "height": "30px",
                    "background-color": "rgb(228, 225, 225)"
                }))
                .append($("<div>").css({
                    "transition": "0.3s ease background",
                    "position": "absolute",
                    "left": "50%",
                    "transform": "rotateZ(90deg) translateX(-150%)",
                    "width": "3px",
                    "height": "30px",
                    "background-color": "rgb(228, 225, 225)"
                }))
                .css({
                    "height": "20px",
                    "width": "20px",
                    "position": "absolute",
                    "right": "5px",
                    "top": "5px",
                    "overflow": "hidden",
                    "transform": "rotateZ(45deg)",
                    "border-radius": "50%",
                    "cursor": "pointer",
                })
                .hover(function () { $(this).children().css("background-color", "#fff") },
                    function () { $(this).children().css("background-color", "rgb(228, 225, 225)") })
                .on("click", function () {
                    $(notification).animate(closeAnim, closeRemove);
                }))
            .append($("<div>").css({
                "width": "50px",
                "margin-left": "10px",
                "margin-top": "10px",
                "margin-bottom": "10px",
                "display": "flex",
                "justify-content": "center",
                "align-items": "center",
            }).append($(icon)))
            .append($("<div>").append($("<div>")
                .append($("<strong style='font-size: 1.2rem'>").text(title)))
                .append($("<div style='margin-top:5px; min-width: 35rem; max-width: 35rem; min-width: 20rem;'>")
                    .append($("<span style='font-size:1.1rem;'>").text(message)))
                .css({
                    "width": "100%",
                    "height": "calc(100% - 20px)",
                    "color": "white",
                    "margin": "10px",
                }))
            .css({
                "position": "relative",
                "right": "0",
                "margin-top": "10px",
                "margin-left": "10px",
                "opacity": "0",
                "min-height": "7rem",
                "height": "fit-content",
                "width": "fit-content",
                "border-radius": "10px",
                "z-index": "1000",
                "display": "flex",
                "flex-direction": "row",
                "flex-wrap": "nowrap",
                "overflow": "hidden",
                "font-family": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            })
            .animate({
                right: '-500px',
                opacity: '0'
            }, 0)
            .animate({
                right: '10px',
                opacity: '1'
            }, "slow");
        disapear && setTimeout(() => {
            $(notification).animate(closeAnim, closeRemove);
        }, timeout);
        return notification;
    }

    static warning(options) {
        const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#fff"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
        const warning = Notify.alert(options, icon)
            .css("background-color", "#F49B13");
        Notify.queue.append(warning);

    }

    static success(options) {
        const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px"><path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M10,17.414l-4.707-4.707 l1.414-1.414L10,14.586l7.293-7.293l1.414,1.414L10,17.414z" fill="#FFFFFF" /></svg>`;
        const success = Notify.alert(options, icon)
            .css("background-color", "#4BA155");
        Notify.queue.append(success);
    }

    static info(options) {
        const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>`;
        const info = Notify.alert(options, icon)
            .css("background-color", "#4286F5");
        Notify.queue.append(info);
    }

    static error(options) {
        const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#fff"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
        const error = Notify.alert(options, icon)
            .css("background-color", "#e23f30");
        Notify.queue.append(error);
    }
}

Notify.success({
    title: "Nice!",
    message: "whifd fwafkbj fawf awf aw fawfwafwaf fwafgre hgr"
})
