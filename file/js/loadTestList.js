function loadTest(){
    console.log("!");
    var form = document.createElement("form");
    form.setAttribute("charset", "UTF-8");
    form.setAttribute("method", "Post");
    form.setAttribute("action", "https://srobot.sen.hs.kr/dggb/module/board/selectBoardListAjax.do");

    var bbsID = document.createElement("input");
    bbsID.setAttribute("type", "hidden");
    bbsID.setAttribute("name", "bbsId");
    bbsID.setAttribute("id", "bbsId");
    bbsID.setAttribute("value", "BBS_0000000000277456");
    form.appendChild(bbsID);

    var bbsTyCode = document.createElement("input");
    bbsTyCode.setAttribute("type", "hidden");
    bbsTyCode.setAttribute("name", "bbsTyCode");
    bbsTyCode.setAttribute("id", "bbsTyCode");
    bbsTyCode.setAttribute("value", "base");
    form.appendChild(bbsTyCode);

    var customRecordCountPerPage = document.createElement("input");
    customRecordCountPerPage.setAttribute("type", "hidden");
    customRecordCountPerPage.setAttribute("name", "customRecordCountPerPage");
    customRecordCountPerPage.setAttribute("id", "customRecordCountPerPage");
    customRecordCountPerPage.setAttribute("value", "50");
    form.appendChild(customRecordCountPerPage);

    var pageIndex = document.createElement("input");
    pageIndex.setAttribute("type", "hidden");
    pageIndex.setAttribute("name", "pageIndex");
    pageIndex.setAttribute("id", "pageIndex");
    pageIndex.setAttribute("value", "1");
    form.appendChild(pageIndex);

    var searchCondition = document.createElement("input");
    searchCondition.setAttribute("type", "hidden");
    searchCondition.setAttribute("name", "searchCondition");
    searchCondition.setAttribute("id", "searchCondition");
    searchCondition.setAttribute("value", "");
    form.appendChild(searchCondition);

    var searchKeyword = document.createElement("input");
    searchKeyword.setAttribute("type", "hidden");
    searchKeyword.setAttribute("name", "searchKeyword");
    searchKeyword.setAttribute("id", "searchKeyword");
    searchKeyword.setAttribute("value", "");
    form.appendChild(searchKeyword);

    var checkNttId = document.createElement("input");
    checkNttId.setAttribute("type", "hidden");
    checkNttId.setAttribute("name", "checkNttId");
    checkNttId.setAttribute("id", "checkNttId");
    checkNttId.setAttribute("value", "");
    form.appendChild(checkNttId);

    var mvmnReturnUrl = document.createElement("input");
    mvmnReturnUrl.setAttribute("type", "hidden");
    mvmnReturnUrl.setAttribute("name", "mvmnReturnUrl");
    mvmnReturnUrl.setAttribute("id", "mvmnReturnUrl");
    mvmnReturnUrl.setAttribute("value", "");
    form.appendChild(searchKeyword);

    document.body.appendChild(form);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://srobot.sen.hs.kr/dggb/module/board/selectBoardListAjax.do");
    xhr.withCredentials = true;
    xhr.onload = function(event){
        if (event.target.response.includes("로그인후 ")){
            alert("로그인 후 이용해 주세요.");
            //location.href = "/login";
        }
        console.log("Success, server responded with: " + event.target.response); // raw response
    };
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
      }
    }
    var formData = new FormData(form);
    xhr.send(formData);
}