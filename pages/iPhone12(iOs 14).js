$(function(){
  //Global Vars
  const globalState = {
    apps: [
      {
        name: 'Calendar',
        icon: '../Icons/Calendar.png',
        type: 'widgetFull',
        dynamic: true
      },
      {
        name: 'Weather',
        icon: '../Icons/Weather.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'FaceTime',
        icon: '../Icons/FaceTime.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Calendar',
        icon: '../Icons/Calendar.png',
        type: 'app',
        dynamic: true
      },
      {
        name: 'Clock',
        icon: '../Icons/Clock.png',
        type: 'app',
        dynamic: true
      },
      {
        name: 'Photos',
        icon: '../Icons/Photos.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Maps',
        icon: '../Icons/GoogleMaps.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Camera',
        icon: '../Icons/Camera.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Reminders',
        icon: '../Icons/Reminders.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Facebook',
        icon: '../Icons/Facebook.png',
        type: 'app',
        notifications: 5,
        dynamic: false
      },
      {
        name: 'Notes',
        icon: '../Icons/Notes.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'App Store',
        icon: '../Icons/AppStore.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Health',
        icon: '../Icons/Health.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Message',
        icon: '../Icons/iOsMessage.png',
        notifications: 123,
        type: 'app',
        dynamic: false
      },
      {
        name: 'Settings',
        icon: '../Icons/Settings.png',
        type: 'app',
        notifications: 3,
        dynamic: false
      },
      {
        name: 'Apple Store',
        icon: '../Icons/AppleStore.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'WhatsApp',
        icon: '../Icons/WhatsApp.png',
        type: 'app',
        notifications: 22,
        dynamic: false
      },
      {
        name: 'Calculator',
        icon: '../Icons/Calculator.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Twitter',
        icon: '../Icons/Twitter.png',
        type: 'app',
        notifications: 2,
        dynamic: false
      },
      {
        name: 'Messenger',
        icon: '../Icons/Messenger.png',
        notifications: 3,
        type: 'app',
        dynamic: false
      },
      {
        name: 'Compass',
        icon: '../Icons/Compass.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Google',
        icon: '../Icons/Google.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Music',
        icon: '../Icons/AppleMusic.png',
        type: 'app',
        dynamic: false
      },
      
      {
        name: 'Voice Memos',
        icon: '../Icons/VoiceMemos.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Wallet',
        icon: '../Icons/Wallet.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Podcasts',
        icon: '../Icons/Podcasts.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Files',
        icon: '../Icons/Files.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'Contacts',
        icon: '../Icons/Contacts.png',
        type: 'app',
        dynamic: false
      },
      {
        name: 'YouTube',
        icon: '../Icons/YouTube.png',
        notifications: 1,
        type: 'app',
        dynamic: false
      },
	  
    ],
    wrapperApps: {
      appsGroup: 24,
      groupActive: 1,
      medida: $('.wrapperApps').outerWidth(true),
      transform: 0
    },
    dateTime: {
      months: ['January ',' February ',' March ',' April ',' May ',' June ',' July ',' August ',' September ',' October ',' November ',' December '],
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    batteryLow: false,
    draggScreen: false
  }
  //Extended Functions
  $.fn.extend({
    touchMov: function(config){
      config = jQuery.extend({
        mov: 'x',
        movLeft: function(){},
        movRight: function(){},
        movUp: function(){},
        movDown: function(){},
        updateMovX: function(){},
        updateMovY: function(){},
        finishMov: function(){}
      }, config);
      let el = this;
      let initCoords = { x: 0, y: 0 };
      let movCoords = { x: 0, y: 0 };
      let downCoords = { x: 0, y: 0 };
      el.mousedown(function (e) {
        initCoords = { x: e.pageX, y: e.pageY };
        downCoords = { x: movCoords.x, y: movCoords.y };
        el.mousemove(function (e2) {
          globalState.draggScreen = true;
          movCoords = { x: e2.pageX, y: e2.pageY };
          if (config.mov === 'x') {
            config.updateMovX(e2, (movCoords.x - initCoords.x))
          } else if (config.mov === 'y') {
            config.updateMovY(e2, (movCoords.y - initCoords.y))
          }
        })
        el.mouseup(function (ex) {
          if (config.mov === 'x') {
            if (movCoords.x - downCoords.x != 0) {
              (movCoords.x - initCoords.x) > 0 ? config.movRight(ex) : config.movLeft(ex);
            }
          } else if (config.mov === 'y') {
            if (movCoords.y - downCoords.y != 0) {
              (movCoords.y - initCoords.y) > 0 ? config.movDown(ex) : config.movUp(ex);
            }
          }
          globalState.draggScreen = false;
          config.finishMov(ex);
          el.off('mousemove');
          el.off('mouseup');
          el.off('mouseleave');
        })
        el.mouseleave(function (a) {
          if (config.mov === 'x') {
            if (movCoords.x - downCoords.x != 0) {
              (movCoords.x - initCoords.x) > 0 ? config.movRight(a) : config.movLeft(a);
            }
          } else if (config.mov === 'y') {
            if (movCoords.y - downCoords.y != 0) {
              (movCoords.y - initCoords.y) > 0 ? config.movDown(a) : config.movUp(a);
            }
          }
          globalState.draggScreen = false;
          config.finishMov(a);
          el.off('mousemove');
          el.off('mouseup');
          el.off('mouseleave');
        })
      })
      return this;
    },
    calendar: function(config){
      config = jQuery.extend({
        date: new Date(),
        fullDay: false
      }, config);
      let month = globalState.dateTime.months[config.date.getMonth()];
      let daysMonth = new Date(config.date.getFullYear(), (config.date.getMonth() + 1), 0).getDate();
      let today = config.date.getDate();
      let firstDay = new Date(config.date.getFullYear(), config.date.getMonth(), 0).getDay();
      this.append(`
<div class="month">
<p class="monthName">${month}</p>
<div class="calendarTable">
<div class="tableHeader"></div>
<div class="tableContent"></div>
</div>
</div>`
                 );
      let header = this.find('.month .tableHeader');
      let content = this.find('.month .tableContent');
      globalState.dateTime.days.map(day => header.append(`<div class="dayName">${config.fullDay ? day : day.charAt(0)}</div>`))
      for (var k = 0; k <= firstDay; k++) {
        content.prepend('<div></div>');
      }
      for (let index = 1; index <= daysMonth; index++) {
        content.append(`<div class="dayNum ${today == index ? 'active':''}">${index}</div>`);
      }
      return this;
    },
    dateIcon: function(config){
      config = jQuery.extend({
        date: new Date(),
        fullDay: false
      }, config);
      let today = config.date.getDate();
      let day = globalState.dateTime.days[config.date.getDay()];
      this.append(`<div class="dateWrapper"><p class="dayNam">${config.fullDay ? day : day.substring(0, 3)}</p><p class="dayNum">${today}</p></div>`);
      return this;
    },
    clock: function(){
      let tym = new Date();
      let numbers = '';
      for (let index = 1; index <= 12; index++) {
        numbers += `<div class="number" data-num="${index}"></div>`;
      }
      let transformHour = `calc(${(360 / 12 - 360) * tym.getHours()}deg + ${(30 / 60) * tym.getMinutes()}deg)`;
      let transformMinutes = `calc(6deg * ${tym.getMinutes()} + ${(6 / 60) * tym.getSeconds()}deg)`;
      let transformSeconds = `calc(6deg * ${tym.getSeconds()})`;
      this.append(
        `<div class="clockWrapper">
<div class="clock">
<div class="numbers">${numbers}</div>
<div class="hands">
<div class="hand hour" style="transform: rotate(${transformHour});"><div class="stick"></div></div>
<div class="hand minutes" style="transform: rotate(${transformMinutes});"><div class="stick"></div></div>
<div class="hand seconds" style="transform: rotate(${transformSeconds});"><div class="stick"></div></div>
</div>
</div>
</div>`
      );
      return this;
    },
    hour: function(config) {
      config = jQuery.extend({
        realtime: true
      }, config);
      var today = new Date();
      var hour = today.getHours();
      if (hour < 10) hour = '0' + hour;
      var minutes = today.getMinutes();
      if (minutes < 10) minutes = '0' + minutes;
      if (config.realtime) {
        setInterval(() => {
          today = new Date();
          hour = today.getHours();
          if (hour < 10) hour = '0' + hour;
          minutes = today.getMinutes();
          if (minutes < 10) minutes = '0' + minutes;
          this.empty();
          this.text(`${hour}:${minutes}`);
        }, 1000);
      }
      this.text(`${hour}:${minutes}`);
      return this;
    },
    date: function (config) {
      config = jQuery.extend({
        date: new Date(),
        fullDay: true
      }, config);
      let today = config.date.getDate();
      let day = globalState.dateTime.days[config.date.getDay()];
      let month = globalState.dateTime.months[config.date.getMonth()];
      this.text(`${config.fullDay ? day : day.substring(0, 3)}, ${today} ${month}`);
      return this;
    },
  })

  //Functions
  function restructureString(string){
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function paintApps(apps, container, containerDots){
    container.empty();
    containerDots.empty();
    globalState.wrapperApps.groups = Math.ceil(apps.length / globalState.wrapperApps.appsGroup);
    let appCount = 1;
    let html = '';
    apps.map((app, idArr) => {
      if (appCount == 1) html += '<div class="group">';
      let clases = 'app';
      if (app.type == 'widgetFull') clases = clases + ' widgetFull';
      if (app.dynamic && app.type == 'app') clases = `${clases} ${restructureString(app.name).toLowerCase()}Dynamic`;
      html += `<div class="${clases}" data-app="${app.type + restructureString(app.name)}" data-id="${idArr}">
${app.notifications ? `<div class="notification">${app.notifications}</div>` : ''}
<div class="icon" style="${!app.dynamic ? `background-image:url(${app.icon});` : 'background-color:#fff;'}"></div>
<p class="name">${app.name}</p>
</div>`;
      if (appCount == globalState.wrapperApps.appsGroup) {
        html += '</div>';
        appCount = 1;
        return false;
      }
      app.type == 'widgetFull' ? appCount = appCount + 8 : appCount++;
    })
    if (globalState.wrapperApps.groups > 1) {
      for (let index = 0; index < globalState.wrapperApps.groups; index++) {
        containerDots.append(`<div class="dot ${index == 0 ? 'active':''}"></div>`);
      }
    }
    container.append(html);
  }
  function alertiOS(config) {
    if ($('#iOSAlert').length || $('.mainScreen').hasClass('locked')) return false;
    config = jQuery.extend({
      wrapper: $('.iphone .blackBorder'),
      actions: [
        {
          text: 'Accept',
          warning: true,
          // callback: function(){console.log('callback accept')}
        },
        {
          text: 'Cancel',
          warning: false,
          // callback: function () { console.log('callback cancel') }
        }
      ],
      closable: false,
      closeOnActions: true,
     
      hide: false
    }, config);
    var actions = '';
    if (config.actions) {
      $.each(config.actions, function (k, action) {
        actions += `<div class="action ${action.warning ? 'warning':''}">${action.text}</div>`;
      })
    }
    if (config.hide) {
      $(document).off('click', '#iOSAlert .action');
      $('#iOSAlert').fadeOut(function () { $(this).remove() });
      return false;
    }
    config.wrapper.append(`
<div id="iOSAlert">
<div class="containers hidAnim">
<p class="headers">${config.headers}</p>
<p class="messages">${config.messages}</p>
<div class="actions">${actions}</div>
</div>
</div>
`);
    if (config.closable) $('#iOSAlert').prepend('<div class="closable"></div>');
    $('#iOSAlert').fadeIn('fast', function () {
      $(this).children('.containers').removeClass('hidAnim');
    }).css('display', 'flex');
    $(document).on('click', '#iOSAlert .action', function (e) {
      let action = config.actions[$(e.currentTarget).index()];
      if (action.callback && (typeof action.callback == 'function')) {
        action.callback(e);
      }
      if (config.closeOnActions) {
        $(document).off('click', '#iOSAlert .action');
        $('#iOSAlert').fadeOut('fast', function () { $(this).remove() });
      }
    })
    if (config.hasOwnProperty('autoclose')) {
      setTimeout(function () {
        $(document).off('click', '#iOSAlert .action');
        $('#iOSAlert').fadeOut('fast', function () { $(this).remove() });
      }, config.autoclose)
    }
    $(document).on('click', '#iOSAlert .closable', function () {
      $(document).off('click', '#iOSAlert .action');
      $('#iOSAlert').fadeOut('fast', function () { $(this).remove() });
    })
  }
  
  //Camera App
  function camera(){
    if (!$('.cameraApp').length) {
      $('.mainScreen').append(`
<div class="cameraApp hidden">
<div class="topBar">
<div class="camIco flash">
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
<path d="M41 6L13 34h14.187L23 58l27.998-29.999H37L41 6z"></path>
</svg>
</div>
<div class="camIco chevronUp">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<path d="M20 40l11.994-14L44 40"></path>
</svg>
</div>
<div class="camIco circles">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<path d="M45 32a17 17 0 0 1-9.8 5.7M22 34.8a17 17 0 1 1 26.2-8.5"></path>
<path d="M15.8 26.3a17 17 0 1 1-5.8 2.3"></path>
<path d="M32 54a17 17 0 0 1-3.3-16m3.3-6a17 17 0 1 1 6 26.5"></path>
</svg>
</div>
</div>
<div class="cameraArea">
<iframe src="../apps/Camera.html" style="width="290px" height="410px" scrolling="no""></iframe>
</div>
<div class="modesCamera">
<div class="mode">SLO-MO</div>
<div class="mode">VIDEO</div>
<div class="mode active">PHOTO</div>
<div class="mode">PORTRAIT</div>
<div class="mode">PANO</div>
</div>
<div class="shutterArea">
<div class="imgPreview" style="background-image: url(https://firebasestorage.googleapis.com/v0/b/fotos-3cba1.appspot.com/o/selfie.jpg?alt=media&token=9b87b717-798c-4f37-88f7-b8442bf6655b);"></div>
<div class="shutter"></div>
<div class="toggleCam">
<div class="camIco">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<path d="M54.741 28.14a23.002 23.002 0 0 1-39.088 19.124"></path>
<path d="M9.065 33.62A23.008 23.008 0 0 1 31.917 8a22.934 22.934 0 0 1 16.262 6.732"></path>
<path d="M2 24l7.065 9.619L18 26"></path>
<path d="M62 38l-7.259-9.86L46 36"></path>
</svg>
</div>
</div>
</div>
</div>`
                             );
      $('.cameraApp').touchMov({
        mov: 'y',
        movUp: function (e) {
          $(e.currentTarget).addClass('hidden');
          $('.statusBar').removeClass('onlyLed camActiv');
        }
      });
    }
	
	//Time out Function for Camera App
    setTimeout(function(){
      $('.statusBar').addClass('onlyLed camActiv');
	  
      $('.cameraApp').removeClass('hidden');
    }, 100)
  }
  // Music App
  function music() {
    if (!$('.musicApp').length) {
      $('.mainScreen').append(`
      <div class="musicApp hidden">
	     <div class="appScreen">
            <div class="contents">
	            <iframe src="../apps/music-app/index.html" style="width="280px" height="540px""></iframe>
			</div>
		 </div>
      </div>
      `
      );
      $('.musicApp').touchMov({
        mov: 'y',
        movUp: function (e) {
          $(e.currentTarget).addClass('hidden');
        }
      });
    }
	
	//Time out Function for Music App
    setTimeout(function () {
      $('.musicApp').removeClass('hidden');
    }, 100)
  }
  
  //Maps App
  function maps() {
    if (!$('.mapsApp').length) {
      $('.mainScreen').append(`
        <div class="mapsApp hidden">
          <div class="appScreen">
                <div class="contents">
                   <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3652151.2747342857!2d73.87389695!3d26.630739750000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1618039457657!5m2!1sen!2sin" width="280px" height="540px" paddingTop="0" allowfullscreen="" loading="eager"></iframe>
                </div> 
          </div>
        </div>`
      );
      $('.mapsApp').touchMov({
        mov: 'y',
        movUp: function (e) {
          $(e.currentTarget).addClass('hidden');
        }
      });
    }
	
	//Time out Function for Maps App
    setTimeout(function () {
      $('.mapsApp').removeClass('hidden');
    }, 100)
  }
  
  //Google App
  function google() {
    if (!$('.googleApp').length) {
      $('.mainScreen').append(`
        <div class="googleApp hidden">
          <div class="appScreen">
                <div class="contents">
                   <iframe src="https://www.google.com/search?igu=1" width="300px" height="570px"></iframe>
                </div> 
          </div>
        </div>`
      );
      $('.googleApp').touchMov({
        mov: 'y',
        movUp: function (e) {
          $(e.currentTarget).addClass('hidden');
        }
      });
    }
	
	//Time out Function for Google App
    setTimeout(function () {
      $('.googleApp').removeClass('hidden');
    }, 100)
  }
  
  //Calculator App
  function calculator() {
    if (!$('.calculatorApp').length) {
      $('.mainScreen').append(`
        <div class="calculatorApp hidden">
	     <div class="appScreen">
            <div class="contents">
	            <iframe src="../apps/Calculator.html" style="width="280px" height="640px""></iframe>
			</div>
		 </div>
        </div>`
      );
      $('.calculatorApp').touchMov({
        mov: 'y',
        movUp: function (e) {
          $(e.currentTarget).addClass('hidden');
        }
      });
    }
	
	//Time out Function for Calculator App
    setTimeout(function () {
      $('.calculatorApp').removeClass('hidden');
    }, 100)
  }
  
  //Weather App
  function weather() {
    if (!$('.weatherApp').length) {
      $('.mainScreen').append(`
        <div class="weatherApp hidden">
	     <div class="appScreen">
            <div class="contents">
               <iframe src="../apps/weather-app-final/index.html" style="width="400px" height="600px" background-color="white""></iframe>
			</div>
		 </div>
        </div>`
      );
      $('.weatherApp').touchMov({
        mov: 'y',
        movUp: function (e) {
          $(e.currentTarget).addClass('hidden');
        }
      });
    }
	
	//Time out Function for Weather App
    setTimeout(function () {
      $('.weatherApp').removeClass('hidden');
    }, 100)
  }
  
  //Message App
  function message() {
    if (!$('.messageApp').length) {
      $('.mainScreen').append(`
        <div class="messageApp hidden">
	     <div class="appScreen">
            <div class="contents">
	            <iframe src="../apps/iMessage/imessage.html" style="width="400px" height="580px""></iframe>
			</div>
		 </div>
        </div>`
      );
      $('.messageApp').touchMov({
        mov: 'y',
        movUp: function (e) {
          $(e.currentTarget).addClass('hidden');
        }
      });
    }
	
	//Time out Function for Message App
    setTimeout(function () {
      $('.messageApp').removeClass('hidden');
    }, 100)
  }
  
  //Contacts App
  function contacts() {
    if (!$('.contactsApp').length) {
      $('.mainScreen').append(`
        <div class="contactsApp hidden">
	     <div class="appScreen">
            <div class="contents">
	            <iframe src="../apps/Contacts/Contacts.html" style="width="300px" height="600px""></iframe>
			</div>
		 </div>
        </div>`
      );
      $('.contactsApp').touchMov({
        mov: 'y',
        movUp: function (e) {
          $(e.currentTarget).addClass('hidden');
        }
      });
    }
	
	//Time out Function for Contacts App
    setTimeout(function () {
      $('.contactsApp').removeClass('hidden');
    }, 100)
  }
  
 
  //youTube App
  function youTube() {
    if (!$('.youTubeApp').length) {
      $('.mainScreen').append(`
        <div class="youTubeApp hidden">
	     <div class="appScreen">
            <div class="contents">
	            <iframe width="290" height="550" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=0&mute=0&playlist=tgbNymZ7vqY&loop=1">
</iframe>
			</div>
		 </div>
        </div>`
      );
      $('.youTubeApp').touchMov({
        mov: 'y',
        movUp: function (e) {
          $(e.currentTarget).addClass('hidden');
        }
      });
    }
	
	//Time out Function for youTube App
    setTimeout(function () {
      $('.youTubeApp').removeClass('hidden');
    }, 100)
  }

  // Music App
  function music_deck() {
      $('.mainScreen').append(`
      <div class="musicApp hidden">
	     <div class="appScreen">
            <div class="contents">
	            <iframe src="../apps/music-app/index.html" style="width="280px" height="540px""></iframe>
			</div>
		 </div>
      </div>
      `
      );
      $('.musicApp').touchMov({
        mov: 'y',
        movUp: function (e) {
          $(e.currentTarget).addClass('hidden');
        }
      });
	
	//Time out Function for Music App
    setTimeout(function () {
      $('.musicApp').removeClass('hidden');
    }, 100)
  }
 
  // Message App
  function message_deck() {
      $('.mainScreen').append(`
        <div class="messageApp hidden">
	     <div class="appScreen">
            <div class="contents">
	            <iframe src="../apps/iMessage/imessage.html" style="width="400px" height="580px""></iframe>
			</div>
		 </div>
        </div>`
      );
      $('.messageApp').touchMov({
        mov: 'y',
        movUp: function (e) {
          $(e.currentTarget).addClass('hidden');
        }
      });
	
	//Time out Function for Message App
    setTimeout(function () {
      $('.messageApp').removeClass('hidden');
    }, 100)
  }
  
  function renderUI(){
    paintApps(globalState.apps, $('.wrapperApps'), $('.wrapperDots'));
    if ($('.wrapperApps .app[data-app="widgetFullCalendar"]').length) {
      $('.wrapperApps .app[data-app="widgetFullCalendar"] .icon').append('<div class="events"><p>No more events for today</p></div><div class="calendarWrapper"></div>');
      $('.wrapperApps .app[data-app="widgetFullCalendar"] .icon .calendarWrapper').calendar();
    }
	
    if ($('.wrapperApps .app.calendarDynamic').length) {
      $('.wrapperApps .app.calendarDynamic .icon ').dateIcon();
    }
    
    if ($('.wrapperApps .app.clockDynamic').length) {
      $('.wrapperApps .app.clockDynamic .icon').clock();
    }
  }
  function switchedOn(){
    renderUI();
    setTimeout(() => {
      $('.interactionInfo').removeClass('hidden');
      $('.iphone').removeClass('initAnimation').addClass('powerOn');
      setTimeout(() => {
        $('.iphone').removeClass('powerOn').addClass('arrhe');
        $('.mainScreen').removeClass('locked');
      }, 2000);
    }, 1000);
  }

  switchedOn();
  $('.statusBar .hour').hour();
  $('.lockScreen .hour').hour();
  $('.lockScreen .date').date();
  $('.widgetCenter .block.events').dateIcon({fullDay: true});

  //Touch actions
  $('.lockScreen').touchMov({
    mov: 'y',
    movUp: function(e){
      $(e.currentTarget).siblings('.statusBar').addClass('mov');
      $(e.currentTarget).addClass('hidden');
      $(e.currentTarget).siblings('.appScreen.hidden').removeClass('hidden');
      setTimeout(() => {
        $(e.currentTarget).siblings('.statusBar').removeClass('mov');
        $(e.currentTarget).siblings('.statusBar').find('.operator').addClass('hidden');
        $(e.currentTarget).siblings('.statusBar').find('.hour').removeClass('hidden');
      }, 300)
    }
  });
  $('.wrapperApps').touchMov({
    updateMovX: function(e, mov){
      $(e.currentTarget).css({
        transform: `translateX(${globalState.wrapperApps.transform + mov}px)`,
        transition: 'none'
      });
    },
    movLeft: function (e) {
      if (globalState.wrapperApps.groupActive != globalState.wrapperApps.groups) {
        globalState.wrapperApps.groupActive++;
      }
      $(e.currentTarget).css({
        transform: `translateX(-${globalState.wrapperApps.medida * (globalState.wrapperApps.groupActive - 1)}px)`,
        transition: 'ease all 0.2s'
      });
      $('.wrapperDots .dot').removeClass('active');
      $('.wrapperDots .dot').eq(globalState.wrapperApps.groupActive - 1).addClass('active');
    },
    movRight: function (e) {
      if (globalState.wrapperApps.groupActive != 1) {
        globalState.wrapperApps.groupActive--;
        $(e.currentTarget).css({
          transform: `translateX(${globalState.wrapperApps.transform + globalState.wrapperApps.medida}px)`,
          transition: 'ease all 0.2s'
        });
      } else {
        $(e.currentTarget).parents('.mainScreen').addClass('blur');
        $(e.currentTarget).parents('.appScreen').addClass('moveOut');
        $(e.currentTarget).parents('.appScreen').siblings('.widgetCenter').removeClass('hidden');
        $(e.currentTarget).css({
          transform: `translateX(${globalState.wrapperApps.medida * (globalState.wrapperApps.groupActive - 1)}px)`,
          transition: 'ease all 0.2s'
        });
      }
      $('.wrapperDots .dot').removeClass('active');
      $('.wrapperDots .dot').eq(globalState.wrapperApps.groupActive - 1).addClass('active');
    },
    finishMov: function(e){
      transform = e.currentTarget.style.transform;
      if (transform.length) {
        transform = transform.split('(');
        transform = transform[1].split('px');
        transform = parseInt(transform[0]);
      } else {
        transform = 0;
      }
      globalState.wrapperApps.transform = transform;
    }
  });
  $('.widgetCenter .contents').touchMov({
    mov: 'x',
    movLeft: function (e) {
      $(e.currentTarget).parents('.mainScreen').removeClass('blur');
      $(e.currentTarget).parent().addClass('hidden').removeAttr('style');
      $(e.currentTarget).parent().siblings('.appScreen.moveOut').removeClass('moveOut');
    },
    updateMovX: function (e, mov) {
      if (Math.sign(mov) == 1) {
        $(e.currentTarget).parent().css({
          transform: `translateX(${mov}px)`,
          transition: 'none'
        });
      }
    },
    movRight: function(e){
      $(e.currentTarget).parent().css({
        transform: 'none',
        transition: 'ease all .2s'
      });
      setTimeout(() => {
        $(e.currentTarget).parent().removeAttr('style');
      }, 200)
    }
  });
  $('.statusBar').touchMov({
    mov: 'y',
    movDown: function (e) {
      $(e.currentTarget).parent().addClass('blur');
      $(e.currentTarget).siblings('.controlCenter.hidden').removeClass('hidden');
    }
  });
  $('.controlCenter').touchMov({
    mov: 'y',
    movUp: function (e) {
      $(e.currentTarget).addClass('hidden');
      $(e.currentTarget).parent().removeClass('blur');
    }
  });

  //Floating menu when pressing app for 1 second
  $('.mainScreen .appScreen').mousedown(function(e){
    if ($(this).parent().hasClass('shakingApps')) return false;
    let timeout = setTimeout(() => {
      console.log('a');
      if (!globalState.draggScreen) {
        if ($(e.target).hasClass('app') || $(e.target).parents('.app').length) {
          //Dio click en una app. Ok, le mostraremos el menu flotante
          $(this).parent().addClass('filterBlur');
          let app;
          if ($(e.target).hasClass('app')) {
            app = $(e.target);
          } else {
            app = $(e.target).parents('.app');
          }
          let appClon = app.clone();
          appClon.attr('id', 'fixedApp');
          appClon.css({
            top: app[0].getBoundingClientRect().top,
            left: app[0].getBoundingClientRect().left,
            width: app[0].getBoundingClientRect().width
          })
          $('body').append(appClon);
          let rectsIphone = $('.iphone .blackBorder')[0].getBoundingClientRect();
          let rectsApp = appClon.children('.icon')[0].getBoundingClientRect();
          let cssMenu = `left: ${((rectsIphone.x + rectsIphone.width) - rectsApp.x) >= 190 ? rectsApp.x : (rectsApp.x + rectsApp.width) - 190}px;`;
          if ((rectsIphone.top + (65 * 2)) >= rectsApp.top) {
            cssMenu += `top : ${rectsApp.y + rectsApp.height}px; transform: translateY(10px)`;
          } else {
            cssMenu += `top: ${rectsApp.y}px; transform: translateY(calc(-100% - 10px));`;
          }
          $('body').append(`
<div class="fixedMenuFixedApp" style="${cssMenu}">
<div class="menuOption remove">Remove App
<div class="icon">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<circle cx="32" cy="32" r="30"></circle>
<path d="M48 32H16"></path>
</svg>
</div>
</div>
<div class="menuOption shaking">Edit Home Screen
<div class="icon">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<path d="M14 59a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-9H14zM50 5a3 3 0 0 0-3-3H17a3 3 0 0 0-3 3v5h36zm0 45V10m-36 0v40"></path>
<circle cx="32" cy="56" r="2"></circle>
</svg>
</div>
</div>
</div>
`);
        } else {
          $(this).parent().addClass('shakingApps');
          $('.appScreen .app').append('<div class="removeApp"></div>');
        }
      }
    }, 1000);
    $(this).mouseup(function(){
      clearTimeout(timeout);
    })
    $(this).mouseleave(function () {
      clearTimeout(timeout);
    })
  })
  //Shaking apps from the floating app menu
  $('body').on('click', '.fixedMenuFixedApp .menuOption.shaking', function(){
    $(this).parent().remove();
    $('#fixedApp').remove();
    $('.mainScreen').removeClass('filterBlur').addClass('shakingApps');
    $('.appScreen .app').append('<div class="removeApp"></div>');
  })
  //Exit app remover (shaking apps)
  $('.exitShake').click(function(){
    $('.mainScreen').removeClass('shakingApps');
    $('.appScreen .app .removeApp').remove();
  })
  
  //Remove app
  $('body').on('click', '.fixedMenuFixedApp .menuOption.remove', function () {
    let idApp = $('#fixedApp').data('id');
    if (idApp == undefined) {
      var idDeck = $('#fixedApp').data('indeck');
    }
    $(this).parent().remove();
    $('#fixedApp').remove();
    $('.mainScreen').removeClass('filterBlur');
    alertiOS({
      headers: `Move " ${idApp !== undefined ? globalState.apps[idApp].name : 'app'} " to App Library or delete the app?`,
      messages: 'Moving the app will remove it from the Home screen and keep all its data',
      actions: [
        {
          text: 'Delete app',
          warning: true,
          callback: function(){
            if (idApp !== undefined) {
              globalState.apps.splice(idApp, 1);
              renderUI();
            } else if (idDeck) {
              $('.deckApps .app[data-indeck="'+ idDeck +'"]').remove();
            }
          }
        },
        {
          text: 'Move to App Library',
          callback: function () { console.log('Pending Apps Library') }
        },
        {
          text: 'Cancel'
        },
      ]
    });
  })
  $('.appScreen').on('click', '.app .removeApp', function () {
    let idApp = $(this).parent('.app').data('id');
    if (idApp == 'undefined') {
      var idDeck = $(this).parent('.app').data('indeck');
    }
    $('.appScreen .app .removeApp').remove();
    $('.mainScreen').removeClass('shakingApps');
    alertiOS({
      headers: `Move " ${idApp !== undefined ? globalState.apps[idApp].name : 'app'} " to App Library or delete the app?`,
      messages: 'Moving the app will remove it from the Home screen and keep all its data',
      actions: [
        {
          text: 'Delete app',
          warning: true,
          callback: function () {
            if (idApp !== undefined) {
              globalState.apps.splice(idApp, 1);
              renderUI();
            } else if (idDeck) {
              $('.deckApps .app[data-indeck="' + idDeck + '"]').remove();
            }
          }
        },
        {
          text: 'Move to App Library',
          callback: function () { console.log('Pending Apps Library') }
        },
        {
          text: 'Cancel'
        },
      ]
    });
  })
  //Toggles ControlCenter Icons 
  $('.controlCenter .actionIcon').click(function(){
    $(this).toggleClass('active');
    if ($(this).hasClass('airplaneMode')) {
      $(this).siblings('.cellularData, .wifi').removeClass('active');
    } else if ($(this).hasClass('cellularData') || $(this).hasClass('wifi')) {
      $(this).siblings('.airplaneMode').removeClass('active');
    }
  })
  
  $('body').on('click', '.app[data-app="appCamera"]', function () {
    camera();
  })

  $('body').on('click', '.app[data-app="appMusic"]', function () {
    music();
  })
  
  $('body').on('click', '.app[data-app="appMaps"]', function () {
    maps();
  })
  
  $('body').on('click', '.app[data-app="appGoogle"]', function () {
    google();
  })
  
  $('body').on('click', '.app[data-app="appCalculator"]', function () {
   calculator();
  })

  $('body').on('click', '.app[data-app="appWeather"]', function () {
   weather();
  })
  
  $('body').on('click', '.app[data-app="appContacts"]', function () {
   contacts();
  })
  
  $('body').on('click', '.app[data-app="appMessage"]', function () {
   message();
  })
  
  $('body').on('click', '.app[data-app="appYouTube"]', function () {
   youTube();
  })
  
  $('body').on('click', '.app[data-indeck="3"]', function () {
   message_deck();
  }) 
  
  $('body').on('click', '.app[data-indeck="4"]', function () {
   music_deck();
  })
  
  $('.buttonTurn').click(function(){
    $(this).toggleClass('active');
    $('.iphone').toggleClass('showBackSide');
  })
  $('.touchID').click(function () {
    if (!$(this).hasClass('active')) {
      let sound = new Audio('../assets/Sound.mp3');
      sound.play();
    }
    $('#iOSAlert').remove();
    $(this).toggleClass('active');
    $('.mainScreen').toggleClass('locked');
  })
})

//Battery
const updateBattery = () => {
  navigator.getBattery().then((battery) => {
    $('.percent-value').text(`${Math.round(battery.level * 100)}%`);
    $('.shell .percent').css('width', `${battery.level * 100}%`);
  });
}
setInterval(updateBattery, 60000);
updateBattery();



function myfunc(){
	 window.open("logoutPage.html");
	}