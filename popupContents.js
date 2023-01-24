let sidoNameKorListLong = ['합계', '서울특별시', '부산광역시', '대구광역시', '인천광역시',
    '광주광역시', '대전광역시', '울산광역시', '세종시', '경기도', '강원도', '충청북도',
    '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주도', '검역'];

var clickSidoNum = window.opener.document.getElementById("clickSidoNum").innerText;
console.log(clickSidoNum);

let dataKorea = [];
let sidoNameKorList = ['합계', '서울', '부산', '대구', '인천',
    '광주', '대전', '울산', '세종', '경기', '강원', '충북',
    '충남', '전북', '전남', '경북', '경남', '제주', '검역'];
let dataList = [];

let key = 'OUnJZ24M4ltp1JhbUCoc8Dd0OE3dde1ZmUcLxINR%2FChu%2Bw2CvSfbI9spS4%2F10viYCE2oWgwyRytJxZUCj38Hdw%3D%3D';
let url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson'; /*URL*/
let startDate = '20220901'; // yyyymmdd
let endDate = '20220930';
let propertiesList = ['sidoNameKor', 'decideCNT', 'deathCNT'];

var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + key;
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent(startDate);
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent(endDate);

fetch(url + queryParams)

    .then(response => response.text())
    .then(data => new window.DOMParser().parseFromString(data, "text/xml"))
    .then(data => data.getElementsByTagName("item"))
    .then(function (items) {

        for (let i = 0; i < items.length; i++) {
            let date = items[i].getElementsByTagName("stdDay")[0].innerHTML;
            let sidoNameKor = items[i].getElementsByTagName("gubun")[0].innerHTML;
            let incdecCNT = items[i].getElementsByTagName("incDec")[0].innerHTML;
            let decideCNT = items[i].getElementsByTagName("defCnt")[0].innerHTML;
            let deathCNT = items[i].getElementsByTagName("deathCnt")[0].innerHTML;

            let item = {
                date,
                sidoNameKor,
                decideCNT,
                deathCNT,
                incdecCNT,
            }
            dataKorea.push(item);
        }
        dataKorea = dataKorea.reverse();
        console.log("dataKorea length: " + dataKorea.length);
        for (let i = 0; i < sidoNameKorList.length; i++) {
            dataList[i] = [];
        }

        classifyData();
        initPopupPage();

    }
    ).catch((error) => { console.log(error) });

function classifyData() {

    for (let i = 0; i < dataKorea.length; i++) {
        for (let j = 0; j < sidoNameKorList.length; j++) {
            if (dataKorea[i].sidoNameKor == sidoNameKorList[j]) {
                dataList[j].push(dataKorea[i]);
            }
        }
    }
}


function initPopupPage() {
    let propertiesList = ['sidoNameKor', 'date', 'decideCNT', 'deathCNT', 'incdecCNT'];

    console.log("initPopupPage()");
    document.getElementById("tableTitle").innerHTML =
        `2022년 9월 ${sidoNameKorListLong[clickSidoNum]} 코로나 발생 현황`;
    document.title = sidoNameKorListLong[clickSidoNum];
    let wrapTable = document.getElementById("wrapTable");
    var tablebody = document.createElement('tbody');
    tablebody.setAttribute('class', 'tablebody');
    wrapTable.appendChild(tablebody);
    for (let i = 0; i < dataList[clickSidoNum].length; i++) {
        var $tr = document.createElement('tr');
        for (let j = 0; j < propertiesList.length; j++) {
            var $td = document.createElement('td');
            $td.textContent = dataList[clickSidoNum][i][propertiesList[j]];
            $tr.appendChild($td);
        }
        tablebody.appendChild($tr);
    }
}
