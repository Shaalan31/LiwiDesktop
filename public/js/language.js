/**
 * redirect from index.html to predict with the chosen language
 * @param language
 */
function redirect(language) {
    $.redirect("views/predict.html",
        {
            lang: language
        },
        "GET");
}

/**
 * redirect from any view to predict.html with the chosen language
 * @param language
 */
function redirect_view(language) {
    $.redirect("predict.html",
        {
            lang: language
        },
        "GET");
}