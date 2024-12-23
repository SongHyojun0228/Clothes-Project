var _heathrow_v2 = function () {
    try {
        var _data_length = arguments.length;
        if (/Googlebot/gi.exec(window.navigator.userAgent) == null) {
            if (_data_length > 0) {

                var _data_hit_time = parseInt(Date.now().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }).replace(/\,/gi, ""));
                var _data_hit_date = _heathrow_getToday();
                var _data_type = arguments[0];
                var _data_cid = function (e) {
                    if( e.split(".").length > 3 ) {
                        return e.split(".")[e.split(".").length-2] + "." + e.split(".")[e.split(".").length-1];
                    } else {
                        return e.split(".")[e.split(".").length-1];
                    }
                };

                var _data_session_id = function (e) {
                    var splitVal = e.split(".");
                    return splitVal[2];
                }

                var _data_visit_number = function (e) {
                    var splitVal = e.split(".");
                    return splitVal[3];
                }

                var _data_default = {
                    "appName": "",
                    "appVersion": "",
                    "client_id": _data_cid(_heathrow_getCookie("_ga")),
                    "page_title": document.title,
                    "page_location": document.location.href,
                    "page_path": document.location.pathname,
                    "page_host": document.location.hostname,
                    "page_hash": document.location.hash,
                    "page_referrer": document.referrer,
                    "event_timestamp": _data_hit_time,
                    "event_date": _data_hit_date
                };

                var session = {
                    "ga_session_id": _data_session_id(_heathrow_getCookie("_ga_8PEGV51YTJ")),
                    "ga_session_number": _data_visit_number(_heathrow_getCookie("_ga_8PEGV51YTJ")),
                    "source": _heathrow_getAcquisitionSource(),
                    "medium": _heathrow_getAcquisitionMedium(),
                    "campaign": _heathrow_getAcquisitionCampaign(),
                    "content": _heathrow_getAcquisitionContent(),
                    "term": _heathrow_getAcquisitionKeyword(),
                    "first_visit": _data_visit_number(_heathrow_getCookie("_ga_8PEGV51YTJ")) == 1 ? true : false
                };

                var userProperty = {
                    "user_id": "",
                    "ga_cookie_id": "",
                    "gender": "",
                    "year_of_birth": "",
                    "member_level": "",
                    "signup_date": "",
                    "total_order_count": "",
                    "total_order_amount": "",
                    "adid": "",
                    "user_status_of_login": ""
                };

                var eventParameter = {};
                var eventName = _data_type.eventName;

                var data_object = {
                    "default": Object.assign( _data_default, _data_type.default),
                    "session": Object.assign( session, _data_type.session),
                    "userProperty": Object.assign( userProperty, _data_type.userProperty),
                    "eventParameter": Object.assign( eventParameter, _data_type.eventParameter),
                    "ecommerce": _data_type.ecommerce ? _data_type.ecommerce : null,
                    "event_name": eventName,
                    "moloco": _data_type.moloco
                };

                //이벤트 별 endpoint 할당
                var heathrowEventHttp = new XMLHttpRequest();
                
                function heathrowApiName(en) {
                    // 이벤트 이름에 따라 동적으로 API 이름을 반환
                    if (en && (en.startsWith("impression") || en.startsWith("click") || en == "share_brand" || en == "select_item" || en == "view_item_list")) {
                        return "v2_imp_clk";
                    } else if (en && (en.startsWith("like") || en.startsWith("add") || en.startsWith("remove") || en == "add_to_cart" || en == "remove_from_cart" || en == "begin_checkout" || en == "add_payment_info" || en == "purchase" || en == "refund")) {
                        return "v2_cart_purchase_like";
                    } else if (en == "view_item" || en == "view_search_results" || /^\/brand\/.*/gi.exec(document.location.pathname) != null || /^\/search\/musinsa\/integration/gi.exec(document.location.pathname) != null) {
                        return "v2_detail";
                    } else {
                        return "v2_component_view";
                    }
                }


                
                var heathrowSubHost = "";
                var mimeType = "application/json";

                if (/\.dev\.|\.alpha\./gi.exec(document.location.hostname) != null) {
                    heathrowSubHost = "dev.log";
                } else {
                    heathrowSubHost = "log";
                }
                

                var heathrow_url = "https://" + heathrowSubHost + ".data.musinsa.com/log/user-event/" + heathrowApiName(eventName);

                heathrowEventHttp.open('POST', heathrow_url, false);

                heathrowEventHttp.onreadystatechange = () => {
                    if (heathrowEventHttp.status == 500) {
                        throw Error("500 Internal Server Error For event:83", "heathrow.js:83");
                    }
                }

                heathrowEventHttp.setRequestHeader('Content-Type', mimeType);
                heathrowEventHttp.send(JSON.stringify({ "Data": data_object, "PartitionKey": _data_hit_time }));


            } else {
                var event = {
                    "name": "Missing Arguments",
                    "message": "Please Check _heathrow Arguments",
                    "text": ""
                };

                _heathrow_errorCollect(event);
            }
        } else {
            var event = {
                "name": "Robots.txt",
                "message": "Google Bot Contect",
                "text": ""
            };

            _heathrow_errorCollect(event);
        }
    } catch (e) {
        _heathrow_errorCollect(e);
    }
}

//에러 핸들링
function _heathrow_errorCollect(e) {
    var _data_hit_time = parseInt(Date.now().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }).replace(/\,/gi, ""));

    var errorOBj = {
        "hitTime": new Date(_data_hit_time),
        "type": "error_for_web_script",
        "product": "heathrow",
        "name": e.name,
        "message": e.message,
        "at": e.at,
        "text": e.text,
        "currentURL": document.location.href,
        "beforeURL": document.referrer,
        "os": "",
        "device": window.navigator.userAgent
    }

    if (/\.dev\.|\.alpha\./gi.exec(document.location.hostname) != null) {
        heathrowSubHost = "dev.log";
    } else {
        heathrowSubHost = "log";
    }

    var heathrow_error_url = "https://" + heathrowSubHost + ".data.musinsa.com/log/client-errors";

    var errorHttpRq = new XMLHttpRequest();
    errorHttpRq.open("POST", heathrow_error_url);
    errorHttpRq.setRequestHeader('Content-Type', 'application/json');
    errorHttpRq.send(JSON.stringify({ "Data": errorOBj, "PartitionKey": _data_hit_time }));
};

var _heathrow_getCookie = function (cookieName) {
    var cookieValue = null;

    if (document.cookie) {
        var array = document.cookie.split((escape(cookieName) + '='));

        if (array.length >= 2) {
            var arraySub = array[1].split(';');

            cookieValue = unescape(arraySub[0]);
        }
    }
    return cookieValue;

};

var _heathrow_getUrlParams = function () {
    var params = {};

    if (arguments.length == 0) {
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function (str, key, value) {
                params[key] = value;
            }
        );
    } else if (arguments.length == 1) {
        arguments[0].replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function (str, key, value) {
                params[key] = value;
            }
        );
    }


    return params;
};

function _heathrow_getAcquisitionSource() {

    var _data_search = _heathrow_getUrlParams();

    if (/gclid\=/.exec(document.location.search) != null) {
        return "google";
    } else if (/utm_source\=/.exec(document.location.search) != null) {
        return _data_search.utm_source;
    } else if (/fbclid\=/.exec(document.referrer) != null) {
        return "facebook";
    } else if (/naver\.com/.exec(document.referrer) != null) {
        return "naver";
    } else if (/google\.com/.exec(document.referrer) != null) {
        return "google";
    } else if (/facebook\.com/.exec(document.referrer) != null) {
        return "facebook";
    } else if (/daum\.net/.exec(document.referrer) != null) {
        return "kakao";
    } else if (/kakao\.com/.exec(document.referrer) != null) {
        return "kakao";
    } else if (/musinsa\.com/.exec(document.referrer) != null) {
        return null;
    } else if (document.referrer != "") {
        return document.referrer.split("?")[0].split(".")[document.referrer.split("?")[0].split(".").length - 2] + "." + document.referrer.split("?")[0].split(".")[document.referrer.split("?")[0].split(".").length - 1];
    } else if (document.referrer == "") {
        return "(direct)";
    } else {
        return undefined;
    }
};

var _heathrow_getAcquisitionMedium = function () {

    var _data_search = _heathrow_getUrlParams();

    if (/gclid\=/.exec(document.location.search) != null) {
        return "cpc";
    } else if (/utm_medium\=/.exec(document.location.search) != null) {
        return _data_search.utm_medium;
    } else if (/fbclid\=/.exec(document.referrer) != null) {
        return "social";
    } else if (/naver\.com/.exec(document.referrer) != null) {
        if (/search\.naver\.com/.exec(document.referrer) != null) {
            return "organic";
        } else if (/shopping\.naver\.com/.exec(document.referrer) != null) {
            return "shopping";
        } else {
            return "referral";
        }
    } else if (/google\.com/.exec(document.referrer) != null) {
        return "organic";
    } else if (/facebook\.com/.exec(document.referrer) != null) {
        return "social";
    } else if (/daum\.net/.exec(document.referrer) != null) {
        if (/search\.daum\.net/.exec(document.referrer) != null) {
            return "organic";
        } else {
            return "referral";
        }
    } else if (/kakao\.com/.exec(document.referrer) != null) {
        if (/shoppinghow\,kakao\.com/.exec(document.referrer) != null) {
            return "shopping";
        } else {
            return "referral";
        }
    } else if (/musinsa\.com/.exec(document.referrer) != null) {
        return null;
    } else if (document.referrer != "") {
        return "referral";
    } else if (document.referrer == "") {
        return "(none)";
    } else {
        return undefined;
    }
};

var _heathrow_getAcquisitionCampaign = function () {

    var _data_search = _heathrow_getUrlParams();

    if (/gclid\=/.exec(document.location.search) != null) {
        return _data_search.gclid;
    } else if (/utm_campaign\=/.exec(document.location.search) != null) {
        return _data_search.utm_campaign;
    } else if (/fbclid\=/.exec(document.location.search) != null) {
        return _data_search.fbclid;
    } else if (/n_ad_group\=/.exec(document.location.search) != null) {
        return _data_search.n_ad_group;
    } else {
        return "(not set)";
    }
};

var _heathrow_getAcquisitionContent = function () {

    var _data_search = _heathrow_getUrlParams();

    if (/gclid\=/.exec(document.location.search) != null) {
        return _data_search.gclid;
    } else if (/utm_content\=/.exec(document.location.search) != null) {
        return _data_search.utm_content;
    } else if (/fbclid\=/.exec(document.location.search) != null) {
        return _data_search.fbclid;
    } else if (/n_ad\=/.exec(document.location.search) != null) {
        return _data_search.n_ad;
    } else {
        return "(not set)";
    }
};

var _heathrow_getAcquisitionKeyword = function () {

    var _data_search = _heathrow_getUrlParams();
    var _data_referrer_search = _heathrow_getUrlParams(document.referrer);

    if (/gclid\=/.exec(document.location.search) != null) {
        return _data_search.gclid;
    } else if (/utm_term\=/.exec(document.location.search) != null) {
        return _data_search.utm_term;
    } else if (/fbclid\=/.exec(document.location.search) != null) {
        return _data_search.fbclid;
    } else if (/n_keyword\=/.exec(document.location.search) != null) {
        return _data_search.n_keyword;
    } else if (/naver\.com/.exec(document.referrer) != null) {
        if (/search\.naver\.com/.exec(document.referrer) != null) {
            return _data_referrer_search.query;
        }
    } else if (/daum\.net/.exec(document.referrer) != null) {
        if (/search\.daum\.net/.exec(document.referrer) != null) {
            return _data_referrer_search.q;
        }
    } else {
        return "(not set)";
    }
};

var _heathrow_getToday = function () {
    var _ds_getToday_date = new Date();
    var _ds_getToday_year = _ds_getToday_date.getFullYear();
    var _ds_getToday_month = ("0" + (1 + _ds_getToday_date.getMonth())).slice(-2);
    var _ds_getToday_day = ("0" + _ds_getToday_date.getDate()).slice(-2);

    return _ds_getToday_year + _ds_getToday_month + _ds_getToday_day;
}

var _heathrow_getToday_yyyyMMddHHmmss = function () {
    var _ds_getToday_date = new Date();
    var _ds_getToday_year = _ds_getToday_date.getFullYear();
    var _ds_getToday_month = ("0" + (1 + _ds_getToday_date.getMonth())).slice(-2);
    var _ds_getToday_day = ("0" + _ds_getToday_date.getDate()).slice(-2);
    var _ds_getToday_hour = ("0" + _ds_getToday_date.getHours()).slice(-2);
    var _ds_getToday_min = ("0" + _ds_getToday_date.getMinutes()).slice(-2);
    var _ds_getToday_sec = ("0" + _ds_getToday_date.getSeconds()).slice(-2);

    return _ds_getToday_year + _ds_getToday_month + _ds_getToday_day + _ds_getToday_hour + _ds_getToday_min + _ds_getToday_sec;
}