/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

let cl = console.log;document.addEventListener('deviceready', onDeviceReady, false);

var baseUrl = "http://localhost:5557/articles/";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    if (device.platform == "Android") {
        baseUrl = "http://10.0.2.2:5557/articles/";
    }
    cl("baseUrl=" + baseUrl);
}

$(function () {
    manager.displayArticles();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 20) {
            $("#btnBack").fadeIn();
        } else {
            $("#btnBack").fadeOut();
        }
    });
});

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function backFunction() {
    $("#detail").hide();
    $("#btnBlog").hide();
    $("#start-element").show();
}

var manager = {
    displayArticles: function () {
        $.ajax({
            url: baseUrl,
            type: "GET",
            cache: false,
            dataType: "json",
            success: function (articles) {
                let startElement = $("#start-element"); // main container
                $.each(articles, function (index, article) {
                    var html = '<div class="row" id="article">';
                    html += '<div class="col">';
                    html += '<div class="row bg-white g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">';
                    html += '<div class="col p-4 d-flex flex-column position-static">';
                    html += '<h3 class="mb-0">' + article.libelle + '</h3>';
                    html += '<p></p>';
                    html += '<p class="card-text mb-auto">' + article.description1 + '</p>';
                    html += '<p></p>';
                    html += '<div><button class="btn btn-outline-primary btn-sm" type="button" id="' + article.id + '" onclick="manager.showArticle(' + article.id + ');">Lire la suite...</button></div>'; // TODO link
                    html += '</div>';
                    html += '<div class="col-auto d-none d-lg-block" style="border-left: thin solid lightgray;">';
                    html += '<img class="align-middle"  src="' + article.urlPhotoPr + '"/>';
                    html += '</div></div></div></div>';
                    startElement.append(html);
                });
            }
        });
    },
    showArticle: function (id) {
        $("#start-element").hide();
        $.ajax({
            url: baseUrl + id,
            type: "GET",
            cache: false,
            dataType: "json",
            success: function (article) {
                $("#img1").attr("src", article.urlPhotoDetail1);
                $("#img2").attr("src", article.urlPhotoDetail2);
                $("#img3").attr("src", article.urlPhotoDetail3);
                $('#libelle').text(article.libelle);
                $('#description1').text(article.description1);
                $('#description2').text(article.description2);
            }
        });
        $("#detail").show();
        $("#btnBlog").show();
    }
};
