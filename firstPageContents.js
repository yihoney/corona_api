let sidoNameEngList = ['Total', 'Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju',
    'Daejeon', 'Ulsan', 'Sejong', 'Gyeonggi', 'Gangwon',
    'Chungbuk', 'Chungnam', 'Jeollabuk', 'Jeollanam', 'Gyeongbuk',
    'Gyeongnam', 'Jeju', 'Lazaretto'];

let clickSidoNum = document.getElementById("clickSidoNum");

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
        createTable();
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

function createTable() {
    console.log('createTable');
    let wrapperTable = document.getElementById("wrapperTable");
    let tablebody = document.createElement('tbody');
    wrapperTable.appendChild(tablebody);
    console.log(dataList[0].length);
    for (let i = 0; i < dataList[0].length; i++) {
        var $tr = document.createElement('tr');
        $tr.setAttribute('id', `tr_${sidoNameEngList[i]}`);
        for (let j = 0; j < propertiesList.length; j++) {
            try {
                var $td = document.createElement('td');
                $td.textContent = dataList[i][dataList.length - 1][propertiesList[j]];
                $tr.appendChild($td);
            } catch (e) { }
        }
        $tr.addEventListener('click', function () {
            clickSidoNum.innerText = i;
            console.log(clickSidoNum.innerText);
            window.open("popup.html", "시도별 확진자 현황", "width=600,height=1000");
        })
        tablebody.appendChild($tr);
    }

}