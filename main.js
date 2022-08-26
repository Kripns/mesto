(()=>{"use strict";const e=document.forms["edit-profile"],t=document.querySelector(".popup__input_type_name"),s=document.querySelector(".popup__input_type_job"),r=document.forms["add-card"],i=document.forms["update-avatar"],n={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};class o{constructor(e,t,s){this._data=e,this._templateSelector=t,this._handlers=s,this._link=this._data.link,this._name=this._data.name,this._cardId=this._data._id,this._ownerId=this._data.owner._id,this._currentUserId=this._data.currentUser._id,this._likes=this._data.likes,this._handleCardClick=this._handlers.handleCardClick,this._handleLike=this._handlers.handleLike,this._handleDislike=this._handlers.handleDislike,this._handleCardDelete=this._handlers.handleCardDelete,this._removeElement=this._removeElement.bind(this)}_getTemplate(){return document.querySelector(this._templateSelector).content.querySelector(".place-card").cloneNode(!0)}generateCard(){return this._element=this._getTemplate(),this._cardHeading=this._element.querySelector(".place-card__heading"),this._cardImage=this._element.querySelector(".place-card__image"),this._likeIcon=this._element.querySelector(".place-card__like"),this._likesCounter=this._element.querySelector(".place-card__like-counter"),this._removeIcon=this._element.querySelector(".place-card__remove-icon"),this._cardHeading.textContent=this._name,this._cardImage.src=this._link,this._cardImage.alt=this._name,this._likesCounter.textContent=this._likes.length,this._setEventListeners(),this._setInitialLikes(),this._hideRemoveButtons(),this._element}_setEventListeners(){this._likeIcon.addEventListener("click",(()=>{this._toggleLike()})),this._removeIcon.addEventListener("click",(()=>{this._handleCardDelete(this._cardId,this._removeElement)})),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._data)}))}_setInitialLikes(){this.isLiked()&&this._likeIcon.classList.add("place-card__like_active")}isLiked(){return this._likes.some((e=>this._currentUserId===e._id))}_hideRemoveButtons(){this.isOwner()||this._removeIcon.classList.add("place-card__remove-icon_hidden")}isOwner(){return this._currentUserId===this._ownerId}_toggleLike(){this.isLiked()?this._handleDislike(this._data,(e=>{this._likeIcon.classList.remove("place-card__like_active"),this._updateLikesCounter(e)})):this._handleLike(this._data,(e=>{this._likeIcon.classList.add("place-card__like_active"),this._updateLikesCounter(e)}))}_updateLikesCounter(e){this._likes=e.likes,this._likesCounter.textContent=this._likes.length}_removeElement(){this._element.remove(),this._element=null}}class a{constructor(e,t){this._config=e,this._formElement=t,this._submitButton=this._formElement.querySelector(this._config.submitButtonSelector),this._inputs=Array.from(this._formElement.querySelectorAll(this._config.inputSelector))}enableValidation(){this._setFormListener()}_setFormListener(){this._inputs.forEach((e=>{e.addEventListener("input",(()=>{this._handleInputValidation(e),this._toggleButtonState()}))})),this._toggleButtonState()}_toggleButtonState(){this._formElement.checkValidity()?(this._submitButton.disabled=!1,this._submitButton.classList.remove(this._config.inactiveButtonClass)):(this._submitButton.disabled=!0,this._submitButton.classList.add(this._config.inactiveButtonClass))}_handleInputValidation(e){e.validity.valid?this._hideError(e):this._showError(e)}_showError(e){this._errorElement=this._formElement.querySelector(`.${e.id}-error`),this._errorElement.classList.add(this._config.errorClass),e.classList.add(this._config.inputErrorClass),this._errorElement.textContent=e.validationMessage}_hideError(e){this._errorElement=this._formElement.querySelector(`.${e.id}-error`),this._errorElement.classList.remove(this._config.errorClass),e.classList.remove(this._config.inputErrorClass),this._errorElement.textContent=""}resetInputError(){this._inputs.forEach((e=>this._hideError(e))),this._toggleButtonState()}}class l{constructor(e){this._popup=document.querySelector(e),this._closeIcon=this._popup.querySelector(".popup__close-icon"),this._handleEscapeClose=this._handleEscapeClose.bind(this)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscapeClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscapeClose)}setEventListeners(){this._closeIcon.addEventListener("click",(()=>this.close())),this._popup.addEventListener("mousedown",(e=>this._handleClickByOverlay(e)))}_handleEscapeClose(e){"Escape"===e.key&&this.close()}_handleClickByOverlay(e){e.target===this._popup&&this.close()}}class h extends l{constructor({popupSelector:e,formSubmitHandler:t,defaultButtonText:s}){super(e),this._formSubmitHandler=t,this._inputs=this._popup.querySelectorAll(".popup__input"),this._form=this._popup.querySelector(".popup__form"),this._submitButton=this._popup.querySelector(".popup__button"),this._defaultButtonText=s}_getInputValues(){return this._inputValues={},this._inputs.forEach((e=>this._inputValues[e.name]=e.value)),this._inputValues}setEventListeners(){this._form.addEventListener("submit",(e=>{e.preventDefault(),this._formSubmitHandler(this._getInputValues())})),super.setEventListeners()}handleLoading(e){this._submitButton.textContent=e?"Сохранение...":this._defaultButtonText}close(){super.close(),this._form.reset()}}const _=new a(n,e),d=new a(n,r),u=new a(n,i),c=new class{constructor(e){this._url=e.url,this._headers=e.headers}_handleResponse(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}getCards(){return fetch(`${this._url}/cards`,{headers:this._headers}).then((e=>this._handleResponse(e)))}editProfile(e){return fetch(`${this._url}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then((e=>this._handleResponse(e)))}getUser(){return fetch(`${this._url}/users/me`,{headers:this._headers}).then((e=>this._handleResponse(e)))}saveCard(e){return fetch(`${this._url}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify(e)}).then((e=>this._handleResponse(e)))}setLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"PUT",headers:this._headers}).then((e=>this._handleResponse(e)))}deleteLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"DELETE",headers:this._headers}).then((e=>this._handleResponse(e)))}deleteCard(e){return fetch(`${this._url}/cards/${e}`,{method:"DELETE",headers:this._headers}).then((e=>this._handleResponse(e)))}updateAvatar(e){return fetch(`${this._url}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then((e=>this._handleResponse(e)))}}({url:"https://mesto.nomoreparties.co/v1/cohort-48",headers:{"content-type":"application/json",authorization:"01c52263-f47d-437b-bf84-2f0bcf871f17"}}),p=new class{constructor(e,t){this._renderer=e,this._container=document.querySelector(t)}addItem(e){this._container.prepend(e)}renderItems(e){e.forEach((e=>this._renderer(e)))}}((e=>p.addItem(S(e))),".places"),m=new class extends l{constructor({popupSelector:e}){super(e),this._popupImage=this._popup.querySelector(".popup__fullsize-image"),this._popupCaption=this._popup.querySelector(".popup__subheading")}open({link:e,name:t}){this._popupImage.src=e,this._popupImage.alt=t,this._popupCaption.textContent=t,super.open()}}({popupSelector:".popup_type_image"}),f=new h({popupSelector:".popup_type_profile",formSubmitHandler:function(e){f.handleLoading(!0),c.editProfile(e).then((e=>{E.setUserInfo(e),f.close()})).catch((e=>console.log(e))).finally((()=>f.handleLoading(!1)))},defaultButtonText:"Сохранить"}),v=new h({popupSelector:".popup_type_card-adding",formSubmitHandler:function(e){v.handleLoading(!0),c.saveCard(e).then((e=>{p.addItem(S(e)),v.close()})).catch((e=>console.log(e))).finally((()=>v.handleLoading(!1)))},defaultButtonText:"Создать"}),g=new h({popupSelector:".popup_type_update-avatar",formSubmitHandler:function(e){g.handleLoading(!0),c.updateAvatar(e).then((e=>{E.setUserInfo(e),g.close()})).catch((e=>console.log(e))).finally((()=>g.handleLoading(!1)))},defaultButtonText:"Сохранить"}),k=new class extends l{constructor({popupSelector:e,popupButtonHandler:t}){super(e),this._popupButtonHandler=t,this._popupButton=this._popup.querySelector(".popup__button")}setEventListeners(){super.setEventListeners(),this._popupButton.addEventListener("click",(()=>this._popupButtonHandler(this._cardId,this._removeCallback)))}open(e,t){super.open(),this._cardId=e,this._removeCallback=t}}({popupSelector:".popup_type_delete",popupButtonHandler:function(e,t){return c.deleteCard(e).then((()=>{t(),k.close()})).catch((e=>console.log(e)))}}),E=new class{constructor({userNameSelector:e,userJobSelector:t,userAvatarSelector:s}){this._userNameSelector=e,this._userJobSelector=t,this._avatarSelector=s,this._name=document.querySelector(this._userNameSelector),this._job=document.querySelector(this._userJobSelector),this._avatar=document.querySelector(this._avatarSelector)}getUserInfo(){return this._userData={},this._userData.name=this._name.textContent,this._userData.job=this._job.textContent,this._userData._id=this._id,this._userData}setUserInfo({name:e,about:t,avatar:s,_id:r}){this._name.textContent=e,this._job.textContent=t,this._avatar.style.backgroundImage=`url(${s})`,this._id=r}}({userNameSelector:".profile__heading",userJobSelector:".profile__subheading",userAvatarSelector:".profile__avatar"});function S(e){return e.currentUser=E.getUserInfo(),new o(e,".place-card-template",{handleCardClick:L,handleCardDelete:C,handleLike:y,handleDislike:b}).generateCard()}function L({link:e,name:t}){m.open({link:e,name:t})}function C(e,t){k.open(e,t)}function y(e,t){c.setLike(e._id).then((e=>{t(e)})).catch((e=>console.log(e)))}function b(e,t){c.deleteLike(e._id).then((e=>{t(e)})).catch((e=>console.log(e)))}Promise.all([c.getUser(),c.getCards()]).then((e=>{E.setUserInfo(e[0]),p.renderItems(e[1].reverse())})).catch((e=>console.log(e))),m.setEventListeners(),f.setEventListeners(),v.setEventListeners(),g.setEventListeners(),k.setEventListeners(),_.enableValidation(),d.enableValidation(),u.enableValidation(),document.querySelector(".edit-button").addEventListener("click",(()=>{const e=E.getUserInfo();t.value=e.name,s.value=e.job,_.resetInputError(),f.open()})),document.querySelector(".add-card-button").addEventListener("click",(()=>{d.resetInputError(),v.open()})),document.querySelector(".profile__avatar").addEventListener("click",(()=>{u.resetInputError(),g.open()}))})();