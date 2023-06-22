const adressBox = document.querySelector('.adress_box')

ymaps.ready(init);

let myMap;
let myPlaceMark;
let myPlaceMarkMobile;

function init() {
   myMap = new ymaps.Map("map", {
      center: [53.909440, 27.557797],
      zoom: 11,
      controls: ["smallMapDefaultSet"],
   });

   myMap.controls.add("routeEditor");
   myMap.controls.remove("typeSelector");
   myMap.controls.remove("fullscreenControl");
   myMap.controls.add('routeButtonControl', {
    size: "large",
    float: "left",
    floatIndex: 1000,
    });
    myMap.controls.get('routeButtonControl').routePanel.state.set({
        // fromEnabled: false,
        from: "",
        to: "",
        type: "auto"
    });
    myMap.behaviors.disable([
        /* 'drag',
        'scrollZoom' */
        "",
     ]);


    myMapMobile = new ymaps.Map("map-mobile", {
        center: [53.909440, 27.557797],
        zoom: 11,
        controls: ["smallMapDefaultSet"],
    });
    myMapMobile.controls.add("routeEditor");
    myMapMobile.controls.remove("typeSelector");
    myMapMobile.controls.remove("fullscreenControl");
    myMapMobile.controls.add('routeButtonControl', {
        size: "large",
        float: "left",
        floatIndex: 1000,
    });
    myMapMobile.controls.get('routeButtonControl').routePanel.state.set({
        // fromEnabled: false,
        from: "",
        to: "",
        type: "auto"
    });

   

   let myCollection = new ymaps.GeoObjectCollection(
      {},
      {
         iconLayout: "default#image",
         iconImageHref: "https://voyah.by/wp-content/uploads/2023/06/Location-4.png",
         iconImageSize: [18, 27],
         draggable: false, 
      }
   );
   let myCollectionMobile = new ymaps.GeoObjectCollection(
    {},
    {
       iconLayout: "default#image",
       iconImageHref: "https://voyah.by/wp-content/uploads/2023/06/Location-4.png",
       iconImageSize: [18, 27],
       draggable: false, 
    }
 );
   function addPlaceMark({...obj}) {
        let data = {...obj};
        myPlacemark = new ymaps.Placemark([data.lat, data.long], {
            balloonContentHeader: data.adress,
        });
    
        myCollection.add(myPlacemark);
   }
   function addPlaceMarkMobile({...obj}) {
    let data = {...obj};
    myPlaceMarkMobile = new ymaps.Placemark([data.lat, data.long], {
        balloonContentHeader: data.adress,
    });

    myCollection.add(myPlacemark);
    myCollectionMobile.add(myPlaceMarkMobile)
}
    dealersCenters.forEach(el => {
        addPlaceMark({...el})
        addPlaceMarkMobile({...el})
    })

   myMap.geoObjects.add(myCollection);
   myMapMobile.geoObjects.add(myCollectionMobile);
   let input = document.getElementById("inputSearch");

function search() {

    let filter = input.value.toUpperCase();
    if (filter) {
        let newArr = dealersCenters.filter(el => el.adress.toUpperCase().includes(filter));
        myCollection.removeAll();
        adressBox.innerHTML='';
        newArr.forEach(el => {
            renderHtmlElem({...el})
            addPlaceMark({...el})

        if(newArr.length === 1 ) {
            myMap.setCenter([newArr[0].lat, newArr[0].long], 15, {
                checkZoomRange: true
            });
        }
    }) 
    } else {
        renderDefaultDealers();
        dealersCenters.forEach(el => {
            addPlaceMark({...el})
        })
        myMap.setCenter([53.909440, 27.557797], 11, {
            checkZoomRange: true
        });
    }
    
    
}
input.addEventListener('input', search);
}


const dealersCenters = [
    {
        title: 'VOYAH на Каменногорской, 11',
        adress : 'Минск, Каменногорская, 11',
        time: '09:00-20:00 Пн-Сб, Вс: выходной',
        contacts: '+375 (44) 7500600',
        lat: 53.918572 ,
        long: 27.415641,

    },
    {
        title: 'VOYAH на пр-т Дзержинского, 134',
        adress : 'г. Минск, пр-т Дзержинского, 134',
        time: '09:00-20:00 Пн-Сб, Вс: выходной',
        contacts: '+375 (44) 7500600',
        lat: 53.843489 ,
        long: 27.466093,
    } ,
    {
        title: 'VOYAH на свислочской',
        adress : 'г. Минск, свислочская 9',
        time: '09:00-20:00 Пн-Сб, Вс: выходной',
        contacts: '+375 (44) 7500600',
        lat: 53.843489 ,
        long: 27.636093,
    } ,

]
function renderHtmlElem ({title , adress , time , contacts , lat , long }) {
    const adressInner = document.createElement('li');
    adressInner.dataset.lat=lat;
    adressInner.dataset.long=long;
    adressInner.classList.add('adress');

    const dealerTitle = document.createElement('h3');
    dealerTitle.innerHTML = title;

    const adressInfo = document.createElement('div')
    adressInfo.classList.add('adress_info');
    const adressInfoImg = document.createElement('img');
    adressInfoImg.src = 'https://voyah.by/wp-content/uploads/2023/06/icons8-маркер-16.png';
    const adressText = document.createElement('p');
    adressText.innerHTML = adress;
    adressInfo.append(adressInfoImg , adressText);

    const adressContacts = document.createElement('div')
    adressContacts.classList.add('adress_info');
    const adressContactsImg = document.createElement('img');
    adressContactsImg.src = 'https://voyah.by/wp-content/uploads/2023/06/icons8-телефон-50.png';
    const contactText = document.createElement('p');
    contactText.innerHTML = contacts;
    adressContacts.append(adressContactsImg , contactText)

    const adressTime = document.createElement('div')
    adressTime.classList.add('adress_info');
    const timeImg = document.createElement('img');
    timeImg.src = 'https://voyah.by/wp-content/uploads/2023/06/icons8-часы-24.png';
    const timeText = document.createElement('p');
    timeText.innerHTML = time;
    adressTime.append(timeImg , timeText)


    adressInner.append(dealerTitle , adressInfo , adressContacts , adressTime);

    adressBox.appendChild(adressInner)
}

function renderDefaultDealers() {
    adressBox.innerHTML='';
    dealersCenters.forEach((elem) => {
        renderHtmlElem({...elem })
    })
}

document.addEventListener('DOMContentLoaded', renderDefaultDealers);


// tab

const tab1 = document.querySelector('.tab1');
const tab2 = document.querySelector('.tab2');
const tab1Content = document.querySelector('.tab1-content');
const tab2Content = document.querySelector('.tab2-content')

tab1.addEventListener('click' , () => {
    tab1.classList.add('active-tab');
    tab1Content.classList.add('active')
    if (tab2.classList.contains('active-tab')) {
        tab2.classList.remove('active-tab');
        tab2Content.classList.remove('active')
    }
})
tab2.addEventListener('click' , () => {
    tab2.classList.add('active-tab');
    tab2Content.classList.add('active')
    if (tab1.classList.contains('active-tab')) {
        tab1.classList.remove('active-tab');
        tab1Content.classList.remove('active')
    }
})