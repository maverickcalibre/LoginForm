"use strict";

document.addEventListener('DOMContentLoaded', function () {

  var AN = AN || (AN = {});
  AN.AuthenticationModule = AN.AuthenticationModule || (AN.AuthenticationModule = {});

  AN.AuthenticationModule = (function () {


    var showSection = function (ev) {
      ev.preventDefault();

      //get the clicked element
      var href = document.getElementById(ev.target.id).getAttribute("href");

      //remove show class on all the elements    
      Array.prototype.forEach.call(document.querySelectorAll(".showSection"), function (el) {
        el.classList.remove("showSection");
        el.classList.add("hideSection");
      });

      //add show class to the section to be shown element
      var sectionToShow = document.querySelector(href.toString());
      sectionToShow.classList.remove("hideSection");
      sectionToShow.classList.add("showSection");
    };    

    return {
      showSection: showSection
    };
  })();

  AN.ValidationModule = (function () {    
    var loginEmail = document.getElementById("login_email");
    var invalidMsgToShowField = document.getElementById('invalidEmail');
    //var isEmailDirty = false;    

    loginEmail.addEventListener('invalid', function (event) {
      event.preventDefault();
      if (!event.target.validity.valid) {
        //console.log(event.target.validity);        
        setValidationMessage(event.target, invalidMsgToShowField);
        loginEmail.classList.add('invalid');
      }
    });

    // loginEmail.addEventListener('focus', function (event) {
    //   isEmailDirty = true;
    // });

    loginEmail.addEventListener('input', function (event) {
      console.log("loginEmail.value: ", loginEmail.value);
      console.log("Validity: ", event.target.validity.valid);
      if (loginEmail.validity.valid) {
        loginEmail.classList.remove('invalid');
        invalidMsgToShowField.style.display = 'none';
      } else {
        //if (isEmailDirty) {
          loginEmail.classList.add('invalid');
          invalidMsgToShowField.style.display = 'block';
          setValidationMessage(event.target, invalidMsgToShowField);
        //}
      }
    });

    var setValidationMessage = function (ctrl, ctrlToShow){
        //console.log('$$$ ctrl, ctrlToShow: ', ctrl, ctrlToShow);
        console.log('$$$ ctrl.validity.patternMismatch: ', ctrl.validity.patternMismatch);
        switch (true) {
          case ctrl.validity.valueMissing:
              //console.log('value is missing');
              ctrlToShow.textContent = ctrl.dataset.error;
              ctrlToShow.classList.add('error');
              ctrlToShow.style.display = 'block';
            break;
          case ctrl.validity.patternMismatch:         
              ctrlToShow.textContent = ctrl.dataset.patternError;
            break;
          
          default:
            break;
        }

        //console.log('$$$ ctrlToShow: ', ctrlToShow);
    };

  }());

});
