/*
var vidGallery = $("#vidGallery");

=> 전역변수로 DOM을 담으면 기능이 많아질 경우 엉키며 오염될 가능성이 있으므로 this를 활용한 객체지향을 통해 상수값을 고정함 .

매개변수(parameter) : 함수로 값이 전달되기 위한 통로 이름
인수(argument) : 매개변수에 실제로 전달되는 값

*/

function Youtube(){
    this.frame = $("#vidGallery")
    this.key = "AIzaSyA7eddsOCe0xWAQtHGn1_yN8pmmMYH53ok";
    this.playList = "PLKRZTF1Q1uwaYnfiljaWGD05ByfknsfE5";
    this.count = 20;

    this.bindingEvent();
}



Youtube.prototype.bindingEvent = function(){
    this.callData();
}

//데이터 호출 함수
Youtube.prototype.callData = function(){
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/playlistItems",
        dataType: "jsonp",
        data: {
            part: "snippet",
            key: this.key,
            playlistId : this.playList,
            maxResults: this.count
        }
    })
    .success(function(data){
        var items = data.items;
        this.createList(items);
    }.bind(this))
    .error(function(err){
        console.log(err);
    })
}

//동적 리스트 생성 함수
Youtube.prototype.createList = function(items){
    $(items).each(function(index, data){
        var tit = data.snippet.title;
        if(tit.length>26) {
            tit = tit.substr(0,26)+"...";
        }
        var txt = data.snippet.description;
        var date = data.snippet.publishedAt.split("T")[0];
        var imgSrc = data.snippet.thumbnails.high.url;
        var vidId = data.snippet.resourceId.videoId;
        if(txt.length>50) {
            txt = txt.substr(0,50)+"...";
        }

        this.frame
            .append(
                $("<article>")
                    .append(
                        $("<a class='pic'>")
                            .attr({ href :vidId })
                            .css({ backgroundImage: "url("+imgSrc+")" }),
                        $("<div class='con'>")
                            .append(
                                $("<h2>").text(tit),
                                $("<p>").text(txt),
                                $("<span>").text(date)
                            )
                    )
            )
    }.bind(this))
}

/*
.bind(this) : 생성자 함수에서 인스턴스 this값을 적용해야 될 때, this값이 다른 값을 참조하는 경우 강제로 인스턴스 this로 값을 고정하기 위함

1. 이벤트문에 연결
2. each문에 연결
3. setTimeout() 연결
4. success() 연결
*/